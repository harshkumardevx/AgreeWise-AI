import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    // Cloudinary secure_url — the file is no longer stored on local disk.
    filePath: {
      type: String,
      required: true,
    },

    // Cloudinary public_id, needed to delete the file later.
    cloudinaryId: {
      type: String,
      required: true,
    },

    // Cloudinary's resource_type for this asset (usually "image" for a
    // PDF). Needed so we can pass the matching resource_type when
    // deleting — Cloudinary requires it to match or the delete silently
    // fails to find the asset.
    cloudinaryResourceType: {
      type: String,
      default: "image",
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    // Text extracted from the PDF via pdf-parse, reused for (re)analysis
    // so we don't have to re-download + re-parse the file every time.
    // Truncated to keep documents small.
    extractedText: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;