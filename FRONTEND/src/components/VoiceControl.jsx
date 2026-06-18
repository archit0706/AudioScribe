import React, { useState, useRef } from "react";

const VoiceControl = ({ audioRef }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);

  // Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition not supported in this browser");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      listeningRef.current = true;
      setError("");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      processCommand(transcript);
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
  if (listeningRef.current) {
    try {
      recognition.start();
    } catch (err) {
      console.log("Recognition restart:", err);
    }
  } else {
    setIsListening(false);
  }
};

    return recognition;
  };

  const processCommand = (command) => {
    if (!audioRef || !audioRef.current) return;

    command = command.toLowerCase().trim();
    console.log("Voice Command:", command);

    if (command.includes("play")) {
      audioRef.current.play();
      setLastCommand("play");
    } else if (command.includes("pause")) {
      audioRef.current.pause();
      setLastCommand("pause");
    } else if (command.includes("resume")) {
      audioRef.current.play();
      setLastCommand("resume");
    } else if (command.includes("restart")) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setLastCommand("restart");
    } else {
      setError(`Command not recognized: "${command}"`);
    }
  };

  const handleVoiceControl = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeSpeechRecognition();
    }

    if (!recognitionRef.current) {
      setError("Speech Recognition not available");
      return;
    }

    if (isListening) {
      listeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      listeningRef.current = true;
      recognitionRef.current.start();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
      }}
    >
      <button
        onClick={handleVoiceControl}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: isListening ? "#ff6b6b" : "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginBottom: "15px",
        }}
        onMouseEnter={(e) => {
          if (!isListening) {
            e.currentTarget.style.backgroundColor = "#0b7dda";
          }
        }}
        onMouseLeave={(e) => {
          if (!isListening) {
            e.currentTarget.style.backgroundColor = "#2196F3";
          }
        }}
      >
        🎤 {isListening ? "Listening..." : "Voice Control"}
      </button>

      {isListening && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
            color: "#1976d2",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          🔴 Listening for commands...
        </div>
      )}

      {lastCommand && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            color: "#333",
            fontSize: "14px",
          }}
        >
          <strong>Last Command:</strong> {lastCommand}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fee",
            color: "#c33",
            borderRadius: "4px",
            border: "1px solid #fcc",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          marginTop: "15px",
          padding: "12px",
          backgroundColor: "#f9f9f9",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#666",
          lineHeight: "1.5",
        }}
      >
        <strong>Available Commands:</strong>
        <br />
        • "play" - Play audio
        <br />
        • "pause" - Pause audio
        <br />
        • "resume" - Resume audio
        <br />
        • "restart" - Restart audio from beginning
      </div>
    </div>
  );
};

export default VoiceControl;
