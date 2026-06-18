import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import uploadController from '../controllers/uploadController.js';

const router = express.Router();

// POST route to handle file upload
router.post('/', upload.single('file'), uploadController.uploadFile);

export default router;
