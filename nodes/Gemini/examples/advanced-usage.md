# Advanced Nano Banana Node Usage

## Photoshoot Generation Example (Based on Your Script)

This example recreates the functionality from your original script:

### Node Configuration:
```json
{
  "operation": "generateImage",
  "model": "gemini-2.5-flash-image-preview",
  "messageHistory": {
    "messages": [
      {
        "role": "user",
        "contentType": "imageBase64",
        "imageBase64": "iVBORw0KGgoAAAANSUhE...", // Your base64 image data
        "mimeType": "image/png"
      },
      {
        "role": "user", 
        "contentType": "text",
        "text": "Create a consistent photoshoot of the woman wearing a 2 piece Indian Kurti set in a front three-quarter side view with woman looking to her right with right leg stepped forward and weight shifted onto the back leg. Ensure facial consistency and body proportion."
      },
      {
        "role": "model",
        "contentType": "imageBase64", 
        "imageBase64": "iVBORw0KGgoAAAA....", // Previous model response
        "mimeType": "image/png"
      }
    ]
  },
  "currentMessage": "INSERT_INPUT_HERE",
  "responseModalities": ["IMAGE", "TEXT"],
  "streamResponse": true
}
```

### Key Features:

1. **Message History Support**: Full conversation context with mixed content types
2. **Image Generation**: Automatic handling of generated images as binary data
3. **Streaming Response**: Real-time processing like your original script
4. **File Management**: Generated images are automatically saved with proper extensions

### Output Structure:

```json
{
  "text": "Generated text response...",
  "images": [
    {
      "fileName": "generated_image_0.png",
      "data": "Buffer data",
      "mimeType": "image/png"
    }
  ],
  "model": "gemini-2.5-flash-image-preview",
  "responseModalities": ["IMAGE", "TEXT"]
}
```

### Binary Data:

Generated images are automatically available in the node's binary data output:
- `image_0`: First generated image
- `image_1`: Second generated image (if multiple)
- etc.

## Workflow Integration

### 1. Image Processing Chain:
```
Webhook → Nano Banana (Generate) → HTTP Response (Send Image)
```

### 2. Batch Processing:
```
Schedule → Nano Banana (Multiple Prompts) → File Storage → Email
```

### 3. Interactive Chat:
```
Webhook → Nano Banana (Conversation) → Database (Store) → Webhook Response
```

## Error Handling

The node provides comprehensive error handling:
- Invalid API keys
- Malformed images
- Network timeouts
- Model limitations
- Rate limiting

All errors include detailed messages for debugging.

## Performance Tips

1. **Use Streaming**: Enable `streamResponse` for better performance
2. **Optimize Images**: Compress images before sending
3. **Batch Requests**: Process multiple items in single workflow execution
4. **Cache Results**: Store frequently used responses

## Model Comparison

| Model | Best For | Image Generation | Speed |
|-------|----------|------------------|-------|
| gemini-2.5-flash-image-preview | Image generation | ✅ | Fast |
| gemini-1.5-flash | Text generation | ❌ | Fastest |
| gemini-1.5-pro | Complex reasoning | ❌ | Slower |