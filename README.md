# 🎧 AudioScribe

AudioScribe is a full-stack AI-powered web application that converts handwritten notes and PDF documents into natural speech.
The application extracts text using Optical Character Recognition (OCR) and generates audio using Text-to-Speech (TTS) technology,
enabling users to listen to their notes conveniently.

---

## Features

* Upload handwritten notes as JPG, JPEG, and PNG images
* Upload PDF documents
* Extract text using Google Vision API (OCR)
* Convert extracted text into speech using Google Text-to-Speech
* Generate MP3 audio files
* Built-in audio player with:

  * Play
  * Pause
  * Restart
* Voice-controlled audio playback:

  * Play
  * Pause
  * Resume
  * Restart
* Copy extracted text to clipboard
* Download generated audio files
* Responsive and user-friendly interface

---

## Tech Stack

### Frontend

* React.js
* Vite
* Axios

### Backend

* Node.js
* Express.js
* Multer

### AI Services

* Google Vision API
* Google Text-to-Speech API

### Additional Libraries

* pdf2pic
* ImageMagick
* dotenv

---

## Project Structure

```text
Student_Helper/

├── BACKEND/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── uploads/
│   ├── audio/
│   └── .env

├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── vite.config.js
```

---

## Installation

### Clone the Repository

```bash
git clone <your-github-repository-url>
cd Student_Helper
```

---

### Backend Setup

```bash
cd BACKEND

npm install

npm run dev
```

Create a `.env` file:

```env
PORT=5000

GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
```

---

### Frontend Setup

```bash
cd FRONTEND

npm install

npm run dev
```

---

## Usage

1. Upload a handwritten image or PDF document.
2. OCR extracts the text from the uploaded file.
3. The extracted text is displayed on the screen.
4. Convert the extracted text into speech.
5. Listen to the generated audio using the built-in audio player.
6. Use voice commands to control audio playback.
7. Copy extracted text or download the generated MP3 file.

---

## Supported Voice Commands

* play
* pause
* resume
* restart

Examples:

* "please play"
* "pause the audio"
* "restart audio"

---

## Screenshots

Add screenshots of:

* Home Page
* Upload Section
* OCR Output
* Audio Player
* Voice Control Interface

---

## Future Enhancements

* User Authentication
* Multiple Voice Options
* Additional Language Support
* Cloud Storage Integration
* Application Deployment

---

## Author

**Archit Kumar Singh**
Bachelor of Technology in Computer Science and Engineering
Birla Institute of Technology, Mesra

AudioScribe is an AI-powered application developed to convert handwritten notes and PDF documents into speech using Optical
Character Recognition (OCR) and Text-to-Speech (TTS) technologies.
