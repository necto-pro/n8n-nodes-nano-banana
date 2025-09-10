# Gemini Node

This node allows you to interact with Google's Gemini AI models for text and image generation.

## Features

- Support for multiple Gemini models including the latest 2.5 Flash Image Preview
- Message history with conversation context
- Image input support (both URL and base64)
- Automatic URL to base64 conversion
- Configurable response modalities (text and/or image generation)
- Advanced generation parameters (temperature, max tokens, etc.)
- JSON input format for programmatic message definition

## Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new Gemini API credential in n8n with your API key
3. Add the Gemini node to your workflow

## Usage

### Input Format Options

The node supports two input formats that can be selected using the "Input Format" dropdown:

1. **Manual Mapping**: Use the UI fields to define message history and current message
2. **JSON Format**: Provide all input data as a JSON object in the "JSON Input" field

### JSON Input Format

When using JSON format, provide a JSON object with the following structure:

```json
{
  "messageHistory": [
    {
      "contentType": "text",
      "text": "What's in this image?",
      "role": "user"
    },
    {
      "contentType": "imageUrl",
      "imageUrl": "https://example.com/image.jpg",
      "mimeType": "image/jpeg",
      "role": "user"
    },
    {
      "contentType": "text",
      "text": "This is a beautiful landscape with mountains and a lake.",
      "role": "model"
    }
  ],
  "currentMessage": "Can you describe the colors in more detail?"
}
```

### Basic Text Generation
1. Set the operation to "Generate Content"
2. Choose your preferred model
3. Select input format (Manual Mapping or JSON Format)
4. Enter your message in "Current Message" (Manual) or "JSON Input" (JSON)
5. Configure response modalities as needed

### With Message History
1. Add previous conversation messages in "Message History" (Manual) or include in JSON
2. Specify roles (user/model) for each message
3. Include text or images in the conversation context
4. Add your current message

### Image Input
- **URL**: Provide an image URL - the node will automatically download and convert it to base64
- **Base64**: Provide base64 encoded image data directly
- Specify the correct MIME type for your images

### Response Configuration
- **Text**: Generate text responses
- **Image**: Generate image responses (requires compatible model like 2.5 Flash Image Preview)
- **Both**: Generate both text and images

## Models

- **Gemini 2.5 Flash Image Preview**: Latest model with image generation capabilities
- **Gemini 1.5 Flash**: Fast and efficient for text generation
- **Gemini 1.5 Pro**: Most capable for complex tasks

## Advanced Options

- **Temperature**: Controls randomness (0-2)
- **Max Output Tokens**: Limits response length
- **Top P**: Nucleus sampling parameter
- **Top K**: Top-k sampling parameter