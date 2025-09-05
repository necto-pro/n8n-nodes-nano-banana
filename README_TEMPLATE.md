# n8n-nodes-nano-banana

This is an n8n community node. It lets you use **Nano Banana** (powered by Google Gemini AI) in your n8n workflows.

**Nano Banana** is an AI-powered node that provides advanced text and image generation capabilities using Google's Gemini AI models. It enables seamless integration of multimodal AI features into your automation workflows, including image creation, visual analysis, and intelligent text generation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version History](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Install via Community Nodes

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@nectopro/n8n-nodes-nano-banana`
4. Agree to the risks of using community nodes
5. Select **Install**

After installation restart n8n to use the new nodes.

### Install via npm

```bash
npm install @nectopro/n8n-nodes-nano-banana
```

## Operations

The Nano Banana node supports the following operations:

### Generate Content
- **Text Generation**: Create written content, stories, articles, and code
- **Image Generation**: Generate high-quality images from text descriptions
- **Image Analysis**: Analyze and describe uploaded images or image URLs
- **Multimodal Conversations**: Interactive dialogues combining text and images
- **Creative Design**: Logo creation, artwork, technical diagrams

### Supported Content Types
- Text input and output
- Image URLs (JPEG, PNG, GIF, WebP)
- Base64 encoded images
- Mixed content conversations with history
- Streaming responses for real-time processing

## Credentials

You need a Google AI Studio API key to use this node.

### Getting Your Google AI Studio API Key

1. **Create Google Account** (if you don't have one)
   - Visit [accounts.google.com](https://accounts.google.com)
   - Create or sign in to your Google account

2. **Access Google AI Studio**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - You may need to accept terms and conditions

3. **Generate API Key**
   - Click "Create API Key" button
   - Choose "Create API key in new project" (recommended) or select existing project
   - Copy the generated API key (format: `AIza...`)
   - **Important**: Keep this key secure and never share it publicly

4. **Configure in n8n**
   - Add a Nano Banana node to your workflow
   - Click on the credential dropdown
   - Select "Create New"
   - Choose "AI Studio Credentials API"
   - Enter your API key in the "API Key" field
   - Save the credential with a descriptive name

### API Key Management Tips

- **Security**: Store your API key securely and never commit it to version control
- **Usage Limits**: Google AI Studio has usage quotas - monitor your usage
- **Billing**: Some advanced features may require enabling billing in Google Cloud
- **Regeneration**: You can regenerate your API key anytime in Google AI Studio

### Troubleshooting Credentials

- **Invalid API Key**: Ensure you copied the complete key starting with `AIza`
- **Access Denied**: Check if your Google account has access to AI Studio
- **Quota Exceeded**: Monitor usage in Google AI Studio dashboard
- **Connection Error**: Verify your internet connection and API key validity

## Compatibility

**Minimum Requirements:**
- n8n version: 0.227.0 or higher
- Node.js: 20.15 or higher

**Tested Versions:**
- n8n 1.0+
- Node.js 20.15, 21.x

**Known Compatibility Issues:**
- Image generation requires sufficient API quotas
- Large image processing may timeout on slower connections
- Some advanced features require Google Cloud billing enabled

## Usage

### Basic Text Generation

1. Add **Nano Banana** node to your workflow
2. Configure **AI Studio Credentials API**
3. Set **Operation** to "Generate Content"
4. Choose **Model**: "Nano Banana Image"
5. Enter your prompt in **Current Message**
6. Set **Response Modalities** to "TEXT"
7. Execute the node

### Image Generation

1. Follow basic setup steps above
2. Enter descriptive prompt (e.g., "A sunset over mountains")
3. Set **Response Modalities** to "IMAGE" or "TEXT, IMAGE"
4. Execute to generate image
5. Access generated image from node's binary output

### Image Analysis

1. Configure node with credentials
2. Add **Message History** entry:
   - **Content Type**: "Image (URL)" or "Image (Base64)"
   - **Image URL**: Your image URL
   - **Role**: "User"
3. Set **Current Message**: "What do you see in this image?"
4. Set **Response Modalities** to "TEXT"
5. Execute for analysis results

### Advanced Conversations

1. Use **Message History** to build conversation context
2. Mix text and image messages
3. Include previous model responses
4. Enable **Stream Response** for real-time updates
5. Adjust temperature and token limits as needed

### Common Use Cases

- **Content Creation**: Blog posts, marketing copy, social media content
- **Design Workflows**: Logo generation, product mockups, illustrations
- **Data Analysis**: Image classification, OCR, visual inspection
- **Customer Support**: Automated responses with visual context
- **Creative Projects**: Art generation, story illustration, concept design

### Best Practices

- **Prompt Engineering**: Be specific and descriptive in your prompts
- **Error Handling**: Always include error handling in your workflows
- **Rate Limiting**: Implement delays for batch processing
- **Image Optimization**: Compress images before sending for better performance
- **Context Management**: Use message history effectively for conversations

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Google AI Studio](https://makersuite.google.com/)
* [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
* [Google AI Studio API Key Management](https://makersuite.google.com/app/apikey)
* [Node GitHub Repository](https://github.com/necto-pro/n8n-nodes-nano-banana)
* [Necto Pro Website](https://necto.pro)

## Version History

### Version 0.1.8 (Current)
- Enhanced image generation capabilities
- Improved error handling and validation
- Added support for multiple image formats
- Performance optimizations
- Better documentation and examples

### Version 0.1.x (Previous)
- Initial implementation with Gemini AI integration
- Basic text and image generation features
- Core credential management
- Foundation node structure

### Upcoming Features
- Additional Gemini model support
- Batch processing capabilities
- Enhanced conversation management
- Performance improvements
- Extended image format support

---

**Need Help?** [Open an issue](https://github.com/necto-pro/n8n-nodes-nano-banana/issues) or visit our [documentation](https://github.com/necto-pro/n8n-nodes-nano-banana#readme).


