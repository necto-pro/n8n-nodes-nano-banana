import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import { GoogleGenAI } from '@google/genai';
import { ImageUtils } from './utils/imageUtils';

export class Gemini implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Nano Banana',
		name: 'gemini',
		icon: 'file:gemini.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Google Gemini AI models for text and image generation',
		defaults: {
			name: 'Nano Banana',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'geminiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Generate Image',
						value: 'generateContent',
						description: 'Generate text and images using Gemini models',
						action: 'Generate image with nano banana',
					},
				],
				default: 'generateContent',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['generateContent'],
					},
				},
				options: [
					{
						name: 'Gemini 2.5 Flash Image Preview',
						value: 'gemini-2.5-flash-image-preview',
						description: 'Latest model with image generation capabilities',
					},
					{
						name: 'Gemini 1.5 Flash',
						value: 'gemini-1.5-flash',
						description: 'Fast and efficient model for text generation',
					},
					{
						name: 'Gemini 1.5 Pro',
						value: 'gemini-1.5-pro',
						description: 'Most capable model for complex tasks',
					},
				],
				default: 'gemini-2.5-flash-image-preview',
			},
			{
				displayName: 'Message History',
				name: 'messageHistory',
				type: 'fixedCollection',
				displayOptions: {
					show: {
						operation: ['generateContent'],
					},
				},
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'messages',
						displayName: 'Messages',
						values: [
							{
								displayName: 'Content Type',
								name: 'contentType',
								type: 'options',
								options: [
									{
										name: 'Text',
										value: 'text',
									},
									{
										name: 'Image (URL)',
										value: 'imageUrl',
									},
									{
										name: 'Image (Base64)',
										value: 'imageBase64',
									},
								],
								default: 'text',
							},
							{
								displayName: 'Image Base64',
								name: 'imageBase64',
								type: 'string',
								displayOptions: {
									show: {
										contentType: ['imageBase64'],
									},
								},
								default: '',
								description: 'Base64 encoded image data (without data:image prefix)',
							},
							{
								displayName: 'Image URL',
								name: 'imageUrl',
								type: 'string',
								displayOptions: {
									show: {
										contentType: ['imageUrl'],
									},
								},
								default: '',
								description: 'URL of the image to include in the message',
							},
							{
								displayName: 'MIME Type',
								name: 'mimeType',
								type: 'options',
								displayOptions: {
									show: {
										contentType: ['imageUrl', 'imageBase64'],
									},
								},
								options: [
									{
										name: 'PNG',
										value: 'image/png',
									},
									{
										name: 'JPEG',
										value: 'image/jpeg',
									},
									{
										name: 'WebP',
										value: 'image/webp',
									},
									{
										name: 'GIF',
										value: 'image/gif',
									},
								],
								default: 'image/png',
								description: 'MIME type of the image (auto-detected if not specified)',
							},
							{
								displayName: 'Role',
								name: 'role',
								type: 'options',
								options: [
									{
										name: 'User',
										value: 'user',
									},
									{
										name: 'Model',
										value: 'model',
									},
								],
								default: 'user',
							},
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								displayOptions: {
									show: {
										contentType: ['text'],
									},
								},
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Current Message',
				name: 'currentMessage',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['generateContent'],
					},
				},
				default: '',
				description: 'The current user message to send to the model',
				typeOptions: {
					rows: 3,
				},
			},
			{
				displayName: 'Response Modalities',
				name: 'responseModalities',
				type: 'multiOptions',
				displayOptions: {
					show: {
						operation: ['generateContent'],
					},
				},
				options: [
					{
						name: 'Text',
						value: 'TEXT',
					},
					{
						name: 'Image',
						value: 'IMAGE',
					},
				],
				default: ['TEXT', 'IMAGE'],
				description: 'Types of content the model should generate',
			},
			{
				displayName: 'Stream Response',
				name: 'streamResponse',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['generateContent'],
					},
				},
				default: true,
				description: 'Whether to use streaming response (recommended for better performance)',
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				displayOptions: {
					show: {
						operation: ['generateContent'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Temperature',
						name: 'temperature',
						type: 'number',
						default: 1,
						typeOptions: {
							minValue: 0,
							maxValue: 2,
							numberPrecision: 2,
						},
						description:
							'Controls randomness in the output. Higher values make output more random.',
					},
					{
						displayName: 'Max Output Tokens',
						name: 'maxOutputTokens',
						type: 'number',
						default: 8192,
						description: 'Maximum number of tokens to generate',
					},
					{
						displayName: 'Top P',
						name: 'topP',
						type: 'number',
						default: 0.95,
						typeOptions: {
							minValue: 0,
							maxValue: 1,
							numberPrecision: 2,
						},
						description: 'Nucleus sampling parameter',
					},
					{
						displayName: 'Top K',
						name: 'topK',
						type: 'number',
						default: 40,
						description: 'Top-k sampling parameter',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const model = this.getNodeParameter('model', i) as string;

				if (operation === 'generateContent') {
					const credentials = await this.getCredentials('geminiApi', i);
					const messageHistory = this.getNodeParameter('messageHistory.messages', i, []) as any[];
					const currentMessage = this.getNodeParameter('currentMessage', i) as string;
					const responseModalities = this.getNodeParameter('responseModalities', i) as string[];
					const streamResponse = this.getNodeParameter('streamResponse', i) as boolean;
					const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as any;

					// Initialize Google GenAI
					const ai = new GoogleGenAI({
						apiKey: credentials.apiKey as string,
					});

					// Build contents array
					const contents: any[] = [];

					// Add message history
					for (const message of messageHistory) {
						const parts: any[] = [];

						if (message.contentType === 'text' && message.text) {
							parts.push({ text: message.text });
						} else if (
							message.contentType === 'imageUrl' ||
							message.contentType === 'imageBase64'
						) {
							try {
								const geminiPart = await ImageUtils.createGeminiPart(this, message);
								parts.push(geminiPart);
							} catch (error) {
								throw new NodeOperationError(
									this.getNode(),
									`Error processing image in message history: ${error.message}`,
									{ itemIndex: i },
								);
							}
						}

						// Only add message if it has parts
						if (parts.length > 0) {
							contents.push({
								role: message.role,
								parts,
							});
						}
					}

					// Add current message
					if (currentMessage) {
						contents.push({
							role: 'user',
							parts: [{ text: currentMessage }],
						});
					}

					// Build generation config
					const config: any = {
						responseModalities,
					};

					if (additionalOptions.temperature !== undefined) {
						config.temperature = additionalOptions.temperature;
					}
					if (additionalOptions.maxOutputTokens !== undefined) {
						config.maxOutputTokens = additionalOptions.maxOutputTokens;
					}
					if (additionalOptions.topP !== undefined) {
						config.topP = additionalOptions.topP;
					}
					if (additionalOptions.topK !== undefined) {
						config.topK = additionalOptions.topK;
					}

					// Generate content
					let result: any = {};
					let textResponse = '';
					const generatedImages: any[] = [];

					if (streamResponse) {
						// Use streaming response
						const response = await ai.models.generateContentStream({
							model,
							config,
							contents,
						});

						let fileIndex = 0;
						for await (const chunk of response) {
							if (
								!chunk.candidates ||
								!chunk.candidates[0].content ||
								!chunk.candidates[0].content.parts
							) {
								continue;
							}

							const parts = chunk.candidates[0].content.parts;
							for (const part of parts) {
								if (part.inlineData) {
									// Handle generated image
									const fileName = `generated_image_${fileIndex++}`;
									const imageData = ImageUtils.saveBinaryToNodeData(
										part.inlineData.data || '',
										part.inlineData.mimeType || 'image/png',
										fileName,
									);
									generatedImages.push(imageData);
								} else if (part.text) {
									// Handle text response
									textResponse += part.text;
								}
							}
						}
					} else {
						// Use non-streaming response
						const response = await ai.models.generateContent({
							model,
							config,
							contents,
						});

						if (response.candidates && response.candidates[0].content) {
							const parts = response.candidates[0].content.parts ?? [];
							let fileIndex = 0;

							if (parts && Array.isArray(parts)) {
								for (const part of parts) {
									if (part.inlineData) {
										// Handle generated image
										const fileName = `generated_image_${fileIndex++}`;
										const imageData = ImageUtils.saveBinaryToNodeData(
											part.inlineData.data || '',
											part.inlineData.mimeType || 'image/png',
											fileName,
										);
										generatedImages.push(imageData);
									} else if (part.text) {
										// Handle text response
										textResponse += part.text;
									}
								}
							}
						}

						// Prepare result
						result = {
							text: textResponse,
							images: generatedImages,
							model,
							responseModalities,
							usage: {
								totalTokens: textResponse.length, // Approximate
							},
						};

						returnData.push({
							json: result,
							binary:
								generatedImages.length > 0
									? generatedImages.reduce((acc, img, idx) => {
											acc[`image_${idx}`] = {
												data: img.data.toString('base64'),
												mimeType: img.mimeType,
												fileName: img.fileName,
											};
											return acc;
										}, {} as any)
									: undefined,
							pairedItem: { item: i },
						});
					}
				}
			} catch (error) {
				// Sanitize error message to prevent binary data leakage
				const sanitizedMessage = error.message ? error.message.replace(/[\x00-\x1F\x7F-\x9F]/g, '') : 'Unknown error occurred';
				
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: sanitizedMessage },
						pairedItem: { item: i },
					});
					continue;
				}
				
				const sanitizedError = new Error(sanitizedMessage);
				sanitizedError.stack = error.stack;
				throw new NodeOperationError(this.getNode(), sanitizedError, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
