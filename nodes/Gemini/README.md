# Gemini Node

This node allows you to interact with Google's Gemini AI models for text and image generation.

## Features

- Support for multiple Gemini models including the latest 2.5 Flash Image Preview
- Message history with conversation context
- Image input support (both URL and base64)
- Automatic URL to base64 conversion
- Configurable response modalities (text and/or image generation)
- Advanced generation parameters (temperature, max tokens, etc.)

## Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new Gemini API credential in n8n with your API key
3. Add the Gemini node to your workflow

## Usage

### Basic Text Generation
1. Set the operation to "Generate Content"
2. Choose your preferred model
3. Enter your message in "Current Message"
4. Configure response modalities as needed

### With Message History
1. Add previous conversation messages in "Message History"
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