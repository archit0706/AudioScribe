import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

const extractTextFromImage = async (imagePath) => {
  try {
    const [result] = await client.documentTextDetection(imagePath);
    
    const text = result.fullTextAnnotation?.text;
    
    if (!text) {
      throw new Error('No text detected in image');
    }
    
    return text.trim();
  } catch (error) {
    console.error('OCR Error:', error.message);
    throw error;
  }
};

export { extractTextFromImage };

export default {
  extractTextFromImage
};
