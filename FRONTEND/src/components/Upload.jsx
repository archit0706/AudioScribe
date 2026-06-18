import React, { useState } from "react";

const Upload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG and PDF files are allowed");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const getFileSizeInKB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging ? "#f0f0f0" : "white",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = isDragging ? "#f0f0f0" : "white")
        }
      >
        <div style={{ marginBottom: "20px" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ margin: "0 auto", display: "block", color: "#999" }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <p style={{ margin: "10px 0", fontWeight: "500", color: "#333" }}>
          Drag & Drop your notes here
        </p>
        <p style={{ margin: "5px 0", color: "#999", fontSize: "14px" }}>
          or click to browse
        </p>
      </div>

      <input
        id="fileInput"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />

      {error && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#fee",
            color: "#c33",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {selectedFile && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            border: "1px solid #eee",
          }}
        >
          <p style={{ margin: "0 0 5px 0", fontWeight: "500", color: "#333" }}>
            Selected File
          </p>
          <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
            <strong>Name:</strong> {selectedFile.name}
          </p>
          <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
            <strong>Size:</strong> {getFileSizeInKB(selectedFile.size)} KB
          </p>
        </div>
      )}

      <button
        onClick={() => {
          if (selectedFile) {
            console.log("Uploading:", selectedFile);
          }
        }}
        disabled={!selectedFile}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          backgroundColor: selectedFile ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: selectedFile ? "pointer" : "not-allowed",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (selectedFile) {
            e.currentTarget.style.backgroundColor = "#45a049";
          }
        }}
        onMouseLeave={(e) => {
          if (selectedFile) {
            e.currentTarget.style.backgroundColor = "#4CAF50";
          }
        }}
      >
        Upload and Convert
      </button>
    </div>
  );
};

export default Upload;
