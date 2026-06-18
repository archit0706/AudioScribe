import React, { useRef } from "react";
import VoiceControl from "./VoiceControl";

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  if (!audioUrl) {
    return null;
  }

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "30px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "30px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
        Generated Audio
      </h2>

      <audio
        ref={audioRef}
        src={audioUrl}
        controls
        style={{
          width: "100%",
          marginBottom: "20px",
          borderRadius: "4px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handlePlay}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50";
          }}
        >
          Play
        </button>

        <button
          onClick={handlePause}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f57c00";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ff9800";
          }}
        >
          Pause
        </button>

        <button
          onClick={handleRestart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0b7dda";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#2196F3";
          }}
        >
          Restart
        </button>
      </div>

      <VoiceControl audioRef={audioRef} />

      <a
        href={audioUrl}
        download
        style={{
          display: "inline-block",
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          marginTop: "20px",
          fontWeight: "500",
          fontSize: "14px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#45a049";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#4CAF50";
        }}
      >
        ⬇ Download Audio
      </a>
    </div>
  );
};

export default AudioPlayer;
