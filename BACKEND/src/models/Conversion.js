import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
  {
    fileHash: {
      type: String,
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

conversionSchema.index(
  { fileHash: 1, language: 1 },
  { unique: true }
);

const Conversion = mongoose.model("Conversion", conversionSchema);

export default Conversion;