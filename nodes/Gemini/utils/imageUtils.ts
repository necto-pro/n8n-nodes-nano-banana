import { IExecuteFunctions } from 'n8n-workflow';
import mime from 'mime';

export interface ImageData {
	mimeType: string;
	data: string;
}

export interface GeminiPart {
	text?: string;
	inlineData?: {
		mimeType: string;
		data: string;
	};
}

export class ImageUtils {
	/**
	 * Convert image URL to base64 data
	 */
	static async urlToBase64(executeFunctions: IExecuteFunctions, imageUrl: string): Promise<string> {
		try {
			const response = await executeFunctions.helpers.httpRequest({
				method: 'GET',
				url: imageUrl,
				returnFullResponse: true,
				encoding: 'arraybuffer', // Important: This ensures binary data is handled properly
				headers: {
					'User-Agent': 'n8n-gemini-node/1.0',
				},
			});

			// Ensure we have a Buffer
			let buffer: Buffer;
			if (Buffer.isBuffer(response.body)) {
				buffer = response.body;
			} else if (typeof response.body === 'string') {
				buffer = Buffer.from(response.body, 'binary');
			} else {
				buffer = Buffer.from(response.body);
			}

			return buffer.toString('base64');
		} catch (error) {
			throw new Error(`Failed to fetch image from URL: ${imageUrl}. Error: ${error.message}`);
		}
	}

	/**
	 * Validate and clean base64 data
	 */
	static validateBase64(base64Data: string): string {
		try {
			// Remove data URL prefix if present (e.g., "data:image/png;base64,")
			const cleanBase64 = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');

			// Validate base64 format
			const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
			if (!base64Regex.test(cleanBase64)) {
				throw new Error('Invalid base64 format - contains invalid characters');
			}

			// Test if it can be decoded (this will throw if invalid)
			Buffer.from(cleanBase64, 'base64');

			return cleanBase64;
		} catch (error) {
			throw new Error(`Base64 validation failed: ${error.message}`);
		}
	}

	/**
	 * Get MIME type from file extension using mime library
	 */
	static getMimeTypeFromUrl(url: string): string {
		const mimeType = mime.getType(url);
		return mimeType && mimeType.startsWith('image/') ? mimeType : 'image/png';
	}

	/**
	 * Detect MIME type from base64 data
	 */
	static detectMimeType(base64Data: string): string {
		const buffer = Buffer.from(base64Data, 'base64');

		// Check magic numbers for common image formats
		if (buffer.length >= 8) {
			// PNG
			if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
				return 'image/png';
			}
			// JPEG
			if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
				return 'image/jpeg';
			}
			// WebP
			if (buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
				return 'image/webp';
			}
			// GIF
			if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
				return 'image/gif';
			}
		}

		// Default to PNG if detection fails
		return 'image/png';
	}

	/**
	 * Process image data for Gemini API
	 */
	static async processImageForGemini(
		executeFunctions: IExecuteFunctions,
		contentType: string,
		imageUrl?: string,
		imageBase64?: string,
		mimeType?: string,
	): Promise<ImageData> {
		try {
			let processedData: string;
			let detectedMimeType: string;

			if (contentType === 'imageUrl' && imageUrl) {
				if (!imageUrl.trim()) {
					throw new Error('Image URL cannot be empty');
				}
				processedData = await this.urlToBase64(executeFunctions, imageUrl);
				detectedMimeType = mimeType || this.getMimeTypeFromUrl(imageUrl);
			} else if (contentType === 'imageBase64' && imageBase64) {
				if (!imageBase64.trim()) {
					throw new Error('Image Base64 data cannot be empty');
				}
				processedData = this.validateBase64(imageBase64);
				detectedMimeType = mimeType || this.detectMimeType(processedData);
			} else {
				throw new Error(`Invalid image content type "${contentType}" or missing image data`);
			}

			// Final validation - ensure the data is valid base64
			if (!processedData || processedData.length === 0) {
				throw new Error('Processed image data is empty');
			}

			return {
				mimeType: detectedMimeType,
				data: processedData,
			};
		} catch (error) {
			// Sanitize error message to prevent binary data leakage
			const sanitizedMessage = error.message.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
			throw new Error(`Image processing failed: ${sanitizedMessage}`);
		}
	}

	/**
	 * Create a Gemini part from message data
	 */
	static async createGeminiPart(
		executeFunctions: IExecuteFunctions,
		message: any,
	): Promise<GeminiPart> {
		if (message.contentType === 'text') {
			return { text: message.text };
		} else if (message.contentType === 'imageUrl' || message.contentType === 'imageBase64') {
			const imageData = await this.processImageForGemini(
				executeFunctions,
				message.contentType,
				message.imageUrl,
				message.imageBase64,
				message.mimeType,
			);

			return {
				inlineData: {
					mimeType: imageData.mimeType,
					data: imageData.data,
				},
			};
		}

		throw new Error(`Unsupported content type: ${message.contentType}`);
	}

	/**
	 * Save binary file from base64 data (for handling generated images)
	 */
	static saveBinaryToNodeData(base64Data: string, mimeType: string, fileName: string) {
		const buffer = Buffer.from(base64Data, 'base64');
		const fileExtension = mime.getExtension(mimeType) || 'bin';

		return {
			fileName: `${fileName}.${fileExtension}`,
			data: buffer,
			mimeType,
		};
	}
}
