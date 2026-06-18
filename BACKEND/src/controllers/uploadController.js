import path from 'path';
import pdfService from '../services/pdfService.js';
import visionService from '../services/visionService.js';
import ttsService from '../services/ttsService.js';

const uploadFile = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Get file extension
    const fileExtension = path.extname(req.file.originalname).toLowerCase().slice(1);
    
    // Validate file type
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({
        success: false,
        message: 'Only JPG, JPEG, PNG and PDF files are allowed'
      });
    }

    let extractedText = '';

    // Handle PDF files
    if (fileExtension === 'pdf') {
      const imagePaths = await pdfService.convertPdfToImages(req.file.path);
      
      for (const imagePath of imagePaths) {
        const text = await visionService.extractTextFromImage(imagePath);
        extractedText += text + "\n\n";
      }
    } 
    // Handle image files
    else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      extractedText = await visionService.extractTextFromImage(req.file.path);
    }

    // Get language from request body
    const language = req.body.language || 'en-US';

    // Generate audio from extracted text
    const audioFilename = await ttsService.generateAudio(extractedText, language);

    // Return success response
    return res.status(200).json({
      success: true,
      filename: req.file.filename,
      text: extractedText,
      audioUrl: `/audio/${audioFilename}`
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default {
  uploadFile
};
