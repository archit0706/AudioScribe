import React from "react";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    { name: "English", code: "en-US" },
    { name: "Hindi", code: "hi-IN" },
    { name: "Bengali", code: "bn-IN" },
    { name: "Tamil", code: "ta-IN" },
    { name: "Telugu", code: "te-IN" },
    { name: "Marathi", code: "mr-IN" },
    { name: "Gujarati", code: "gu-IN" },
  ];

  const handleChange = (e) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor="languageSelect"
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "500",
          color: "#333",
          fontSize: "14px",
        }}
      >
        Choose Language
      </label>
      <select
        id="languageSelect"
        value={selectedLanguage}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          fontSize: "14px",
          color: "#333",
          backgroundColor: "white",
          cursor: "pointer",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#4CAF50";
          e.currentTarget.style.boxShadow = "0 0 4px rgba(76, 175, 80, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#ddd";
          e.currentTarget.style.boxShadow = "none";
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#4CAF50";
          e.currentTarget.style.boxShadow = "0 0 6px rgba(76, 175, 80, 0.3)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#ddd";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
