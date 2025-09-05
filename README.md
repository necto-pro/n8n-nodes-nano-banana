# n8n-nodes-nano-banana

This is an n8n community node that integrates Google's Gemini AI models for advanced text and image generation capabilities. It lets you use Nano Banana (powered by Gemini AI) in your n8n workflows for creating images, analyzing visual content, and generating text responses.

Google Gemini AI is a powerful multimodal AI platform that can understand and generate both text and images, making it perfect for creative workflows, content generation, and AI-powered automation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Getting Started](#getting-started)  
[Usage Examples](#usage-examples)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Contributing](#contributing)  
[License](#license)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Install via npm

```bash
npm install @nectopro/n8n-nodes-nano-banana
```

### Install in n8n

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@nectopro/n8n-nodes-nano-banana`
4. Agree to the risks of using community nodes
5. Select **Install**

After installation restart n8n to use the new nodes.

## Operations

The Nano Banana node supports the following operations:

### Generate Content
- **Text Generation**: Create written content, stories, code, and more
- **Image Generation**: Generate images from text descriptions
- **Image Analysis**: Analyze and describe uploaded images
- **Multimodal Conversations**: Combine text and images in interactive dialogues
- **Creative Tasks**: Logo design, artwork, technical diagrams, and illustrations

### Key Features
- Support for multiple content types (text, images via URL or base64)
- Conversation history management
- Streaming responses for real-time processing
- Multiple response modalities (text, images, or both)
- Advanced configuration options (temperature, tokens, etc.)
- Comprehensive error handling

## Credentials

To use this node, you need a Google AI Studio API key.

### Getting Your API Key

1. **Visit Google AI Studio**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Choose "Create API key in new project" or select an existing project
   - Copy the generated API key (starts with `AIza...`)

3. **Configure in n8n**
   - In your n8n workflow, add the Nano Banana node
   - Click on the credential field
   - Select "Create New"
   - Choose "AI Studio Credentials API"
   - Paste your API key
   - Save the credential

### Important Notes
- Keep your API key secure and never share it publicly
- Google AI Studio has usage limits and quotas
- Some features may require billing to be enabled in Google Cloud
- The API key provides access to Gemini models including image generation capabilities

## Getting Started

### Basic Text Generation

1. Add a **Nano Banana** node to your workflow
2. Set up your **AI Studio Credentials**
3. Select **Generate Image** operation
4. Choose **Nano Banana Image** model
5. Enter your prompt in **Current Message**
6. Set **Response Modalities** to **TEXT**
7. Execute the node

### Basic Image Generation

1. Follow steps 1-4 from above
2. Enter an image description prompt
3. Set **Response Modalities** to **IMAGE**
4. Execute to generate an image

### Image Analysis

1. Add the node and configure credentials
2. In **Message History**, add a message with:
   - **Content Type**: Image (URL) or Image (Base64)
   - **Image URL** or **Image Base64** data
   - **Role**: User
3. Set **Current Message** to your question about the image
4. Set **Response Modalities** to **TEXT**
5. Execute to get image analysis

## Usage Examples

### Example 1: Creative Writing
```json
{
  "operation": "generateContent",
  "model": "gemini-2.5-flash-image-preview",
  "currentMessage": "Write a short story about a robot learning to paint",
  "responseModalities": ["TEXT"]
}
```

### Example 2: Logo Design
```json
{
  "operation": "generateContent", 
  "model": "gemini-2.5-flash-image-preview",
  "currentMessage": "Create a modern, minimalist logo for a coffee shop called 'Morning Brew'",
  "responseModalities": ["IMAGE", "TEXT"]
}
```

### Example 3: Image Analysis
```json
{
  "operation": "generateContent",
  "model": "gemini-2.5-flash-image-preview",
  "messageHistory": {
    "messages": [{
      "role": "user",
      "contentType": "imageUrl",
      "imageUrl": "https://example.com/photo.jpg",
      "mimeType": "image/jpeg"
    }]
  },
  "currentMessage": "What objects do you see in this image?",
  "responseModalities": ["TEXT"]
}
```

### Example 4: Conversation with Context
```json
{
  "operation": "generateContent",
  "model": "gemini-2.5-flash-image-preview", 
  "messageHistory": {
    "messages": [
      {
        "role": "user",
        "contentType": "text",
        "text": "I need help designing a website"
      },
      {
        "role": "model", 
        "contentType": "text",
        "text": "I'd be happy to help! What type of website are you looking to create?"
      }
    ]
  },
  "currentMessage": "It's for a photography portfolio",
  "responseModalities": ["TEXT"]
}
```

## Advanced Configuration

The node supports advanced parameters for fine-tuning:

- **Temperature**: Controls creativity (0.0-1.0)
- **Max Output Tokens**: Limits response length
- **Top P**: Nucleus sampling parameter
- **Top K**: Top-k sampling parameter
- **Stream Response**: Enable real-time streaming

## Compatibility

- **Minimum n8n version**: 0.227.0
- **Node.js**: 20.15 or higher
- **Tested with**: n8n 1.0+

### Known Limitations
- Image generation requires sufficient API quotas
- Large images may take longer to process
- Rate limits apply based on your Google AI Studio plan

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio API Key Management](https://makersuite.google.com/app/apikey)
- [Node GitHub Repository](https://github.com/necto-pro/n8n-nodes-nano-banana)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/necto-pro/n8n-nodes-nano-banana.git
   cd n8n-nodes-nano-banana
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Lint the code:
   ```bash
   npm run lint
   npm run lintfix  # To auto-fix issues
   ```

5. Test locally:
   ```bash
   npm run dev
   ```

## License

[MIT](LICENSE.md)

---

**Created by [Necto Pro](https://necto.pro)** | **Questions?** [Open an issue](https://github.com/necto-pro/n8n-nodes-nano-banana/issues)
