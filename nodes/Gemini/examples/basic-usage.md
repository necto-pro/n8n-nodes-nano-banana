# Nano Banana Node Usage Examples

## Basic Text Generation

```json
{
	"operation": "generateImage",
	"model": "gemini-2.5-flash-image-preview",
	"currentMessage": "Write a short poem about artificial intelligence",
	"responseModalities": ["TEXT"]
}
```

## Image Analysis with URL

```json
{
	"operation": "generateImage",
	"model": "gemini-2.5-flash-image-preview",
	"messageHistory": {
		"messages": [
			{
				"role": "user",
				"contentType": "imageUrl",
				"imageUrl": "https://example.com/image.jpg",
				"mimeType": "image/jpeg"
			}
		]
	},
	"currentMessage": "What do you see in this image?",
	"responseModalities": ["TEXT"]
}
```

## Conversation with Image Generation

```json
{
	"operation": "generateImage",
	"model": "gemini-2.5-flash-image-preview",
	"messageHistory": {
		"messages": [
			{
				"role": "user",
				"contentType": "text",
				"text": "I need a logo for my coffee shop"
			},
			{
				"role": "model",
				"contentType": "text",
				"text": "I'd be happy to help you create a logo concept. What's the name of your coffee shop and what style are you looking for?"
			}
		]
	},
	"currentMessage": "The shop is called 'Morning Brew' and I want something modern and minimalist",
	"responseModalities": ["TEXT", "IMAGE"]
}
```

## JSON Input Format

```json
{
	"operation": "generateImage",
	"model": "gemini-2.5-flash-image-preview",
	"inputFormat": "json",
	"jsonInput": "{\n  \"messageHistory\": [\n    {\n      \"contentType\": \"text\",\n      \"text\": \"What's in this image?\",\n      \"role\": \"user\"\n    },\n    {\n      \"contentType\": \"imageUrl\",\n      \"imageUrl\": \"https://example.com/image.jpg\",\n      \"mimeType\": \"image/jpeg\",\n      \"role\": \"user\"\n    }\n  ],\n  \"currentMessage\": \"Can you describe the colors in more detail?\"\n}",
	"responseModalities": ["TEXT"]
}
```

## Advanced Configuration

```json
{
	"operation": "generateImage",
	"model": "gemini-2.5-flash-image-preview",
	"currentMessage": "Create a detailed technical diagram",
	"responseModalities": ["IMAGE"],
	"additionalOptions": {
		"temperature": 0.7,
		"maxOutputTokens": 4096,
		"topP": 0.9,
		"topK": 30
	}
}
```

## Error Handling

The node includes comprehensive error handling for:

- Invalid image URLs
- Malformed base64 data
- Network timeouts
- API rate limits
- Invalid MIME types

All errors are properly caught and returned in the output for debugging.