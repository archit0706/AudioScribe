import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/uploadRoutes.js';

// Configure dotenv
dotenv.config();

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/audio', express.static(path.join(__dirname, '../audio')));

// Register routes
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AudioScribe Backend Running'
  });
});

// Global error middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AudioScribe server running on port ${PORT}`);
});
