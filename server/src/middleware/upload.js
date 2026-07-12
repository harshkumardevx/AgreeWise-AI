import multer from "multer";

// Files are streamed straight to Cloudinary (see utils/cloudinaryUpload.js),
// so we keep them in memory instead of writing to local disk.
const storage = multer.memoryStorage();

// Allow only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

export default upload;
