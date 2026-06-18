import { fromPath } from "pdf2pic";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertPdfToImages(pdfPath) {
  try {
    const outputPath = path.join(__dirname, "../../uploads");

    const options = {
      density: 330,
      saveFilename: "page",
      savePath: outputPath,
      format: "jpg",
      width: 768,
      height: 1024
    };

    const converter = fromPath(pdfPath, options);
    const results = await converter.bulk(-1);

    // Extract file paths from results
    const imagePaths = results.map(result => result.path);

    return imagePaths;
  } catch (error) {
    console.error("PDF Conversion Error:", error.message);
    throw error;
  }
}

export default {
  convertPdfToImages
};
