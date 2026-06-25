import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

import pdfService from '../services/pdfService.js';
import visionService from '../services/visionService.js';
import ttsService from '../services/ttsService.js';

import Conversion from '../models/Conversion.js';

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
    const fileExtension = path
      .extname(req.file.originalname)
      .toLowerCase()
      .slice(1);

    // Validate file type
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({
        success: false,
        message: 'Only JPG, JPEG, PNG and PDF files are allowed'
      });
    }

    // Read uploaded file from disk
    const fileBuffer = fs.readFileSync(req.file.path);

    // Generate SHA-256 hash
    const fileHash = crypto
      .createHash('sha256')
      .update(fileBuffer)
      .digest('hex');

    console.log("File Hash:", fileHash);

    // Get language from request body
    const language = req.body.language || 'en-US';

    // Check if this file has already been processed
    const cachedConversion = await Conversion.findOne({
      fileHash,
      language,
    });

    if (cachedConversion) {
      console.log("✅ Cache Hit");

      return res.status(200).json({
        success: true,
        cached: true,
        filename: cachedConversion.originalFileName,
        text: cachedConversion.extractedText,
        audioUrl: cachedConversion.audioUrl,
      });
    }

    console.log("❌ Cache Miss");

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
    else {
      extractedText = await visionService.extractTextFromImage(req.file.path);
    }

    // Generate audio
    const audioFilename = await ttsService.generateAudio(
      extractedText,
      language
    );

    // Save conversion to MongoDB
    await Conversion.create({
      fileHash,
      originalFileName: req.file.originalname,
      language,
      extractedText,
      audioUrl: `/audio/${audioFilename}`,
    });

    console.log("✅ Conversion saved to database.");

    return res.status(200).json({
      success: true,
      cached: false,
      filename: req.file.originalname,
      text: extractedText,
      audioUrl: `/audio/${audioFilename}`,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  } finally {

    // Delete uploaded file after processing
    if (req.file?.path) {

      fs.unlink(req.file.path, (err) => {

        if (err) {
          console.error("Failed to delete uploaded file:", err.message);
        } else {
          console.log("Temporary uploaded file deleted.");
        }

      });

    }

  }
};

export default {
  uploadFile
};