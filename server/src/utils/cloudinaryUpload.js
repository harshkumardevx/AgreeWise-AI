import cloudinary from "../config/cloudinary.js";

// Uploads a Buffer (from multer memoryStorage) to Cloudinary.
//
// NOTE: we intentionally do NOT force resource_type: "raw" here.
// Cloudinary categorizes PDFs under the "image" asset type (so they can
// still be transformed/previewed), and many accounts — especially newer
// free-tier ones — restrict "raw" uploads for security reasons, which
// shows up as an opaque `403 UnexpectedResponse`. "auto" lets Cloudinary
// pick the correct asset type itself (which will be "image" for a PDF).
export const uploadBufferToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "agreewise/contracts",
        public_id: filename.replace(/\.[^/.]+$/, ""),
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    // Non-fatal: log and continue, we still want the DB records removed.
    console.error("Cloudinary delete failed:", error.message);
  }
};
