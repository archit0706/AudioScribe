import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

async function uploadFile(file, language) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export { uploadFile };

export default {
  uploadFile,
};
