import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const client = new textToSpeech.TextToSpeechClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateAudio = async (text, languageCode) => {
  try {
    // Validate language code
    const supportedLanguages = ['en-US', 'hi-IN', 'bn-IN', 'ta-IN', 'te-IN', 'mr-IN', 'gu-IN'];
    if (!supportedLanguages.includes(languageCode)) {
      throw new Error(`Unsupported language code: ${languageCode}`);
    }

    // Prepare request for synthesis
    const request = {
      input: { text: text },
      voice: {
        languageCode: languageCode,
        ssmlGender: 'FEMALE'
      },
      audioConfig: { audioEncoding: 'MP3' }
    };

    // Synthesize speech
    const [response] = await client.synthesizeSpeech(request);

    // Generate filename
    const filename = `speech_${Date.now()}.mp3`;
    const filePath = path.join(__dirname, '../../audio', filename);

    // Write audio file
    await fs.promises.writeFile(filePath, response.audioContent, 'binary');

    // Return filename
    return filename;

  } catch (error) {
    console.error('TTS Error:', error.message);
    throw error;
  }
};

export { generateAudio };

export default {
  generateAudio
};
