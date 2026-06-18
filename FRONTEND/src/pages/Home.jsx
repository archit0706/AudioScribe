import React, { useState } from "react";
import Upload from "../components/Upload";
import LanguageSelector from "../components/LanguageSelector";
import { uploadFile } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError("");
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await uploadFile(selectedFile, selectedLanguage);

      setExtractedText(response.text || "");
      setAudioUrl(
  response.audioUrl
    ? `http://localhost:5000${response.audioUrl}`
    : ""
);
    } catch (err) {
      setError(err?.message || "An error occurred while processing your notes");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", margin: "0 0 10px 0", color: "#333" }}>
            AudioScribe
          </h1>
          <p style={{ fontSize: "18px", color: "#666", margin: "0" }}>
            Turn Your Ink Into Insights
          </p>
        </div>

        {/* Main Content */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "30px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Error Message */}
          {error && (
            <div
              style={{
                marginBottom: "20px",
                padding: "12px",
                backgroundColor: "#fee",
                color: "#c33",
                borderRadius: "4px",
                border: "1px solid #fcc",
              }}
            >
              {error}
            </div>
          )}

          {/* Upload Component */}
          <div style={{ marginBottom: "30px" }}>
            <Upload onFileSelect={handleFileSelect} />
          </div>

          {/* Language Selector */}
          <div style={{ marginBottom: "30px" }}>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          {/* Convert Button */}
          <button
            onClick={handleUpload}
            disabled={loading || !selectedFile}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "30px",
              backgroundColor:
                loading || !selectedFile ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: loading || !selectedFile ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading && selectedFile) {
                e.currentTarget.style.backgroundColor = "#45a049";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && selectedFile) {
                e.currentTarget.style.backgroundColor = "#4CAF50";
              }
            }}
          >
            {loading ? "Processing..." : "Upload and Convert"}
          </button>

          {/* Loading Spinner */}
          {loading && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #4CAF50",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "10px",
                }}
              ></div>
              <p style={{ color: "#666", marginTop: "10px" }}>
                Processing your notes...
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && !loading && (
            <div style={{ marginBottom: "30px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#333",
                  fontSize: "14px",
                }}
              >
                Extracted Text
              </label>
              <textarea
                value={extractedText}
                readOnly
                style={{
                  width: "100%",
                  minHeight: "200px",
                  padding: "15px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                  color: "#000000",
                  fontFamily: "monospace",
                  resize: "vertical",
                  boxSizing: "border-box",
                  backgroundColor: "#ffffff",
                  lineHeight: "1.6",
                  outline: "none",
                }}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(extractedText);
                  setCopySuccess(true);
                  setTimeout(() => {
                    setCopySuccess(false);
                  }, 2000);
                }}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0b7dda";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2196F3";
                }}
              >
                📋 Copy Text
              </button>
              {copySuccess && (
                <div
                  style={{
                    marginTop: "10px",
                    color: "#4CAF50",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  ✓ Text copied successfully
                </div>
              )}
            </div>
          )}

          {/* Audio Success Message */}
          {audioUrl && !loading && (
            <>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#efe",
                  color: "#3c3",
                  borderRadius: "4px",
                  border: "1px solid #cfc",
                  textAlign: "center",
                  fontWeight: "500",
                  marginBottom: "20px",
                }}
              >
                Audio generated successfully
              </div>
              <AudioPlayer audioUrl={audioUrl} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
