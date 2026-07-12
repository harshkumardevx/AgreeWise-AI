import Document from "../models/Document.js";
import Report from "../models/Report.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUpload.js";
import { extractTextFromPdf } from "../utils/pdfExtract.js";
import { logActivity } from "../services/historyService.js";

// Extracted text is stored on the Document so re-analysis doesn't need to
// re-download/re-parse the file. Capped to keep documents small.
const MAX_STORED_TEXT_CHARS = 20000;

export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded",
            });
        }
        // 1. Upload the PDF buffer to Cloudinary (raw file, not an image).
        const cloudinaryResult = await uploadBufferToCloudinary(
            req.file.buffer,
            req.file.originalname
        );

        // 2. Extract text so we have it ready for AI analysis.
        let extractedText = "";
        try {
            extractedText = await extractTextFromPdf(req.file.buffer);
        } catch (err) {
            console.error("PDF text extraction failed:", err.message);
            // Non-fatal — the document still gets saved; analysis will
            // fail later with a clear message if there's really no text.
        }

        const document = await Document.create({
            user: req.user._id,
            originalName: req.file.originalname,
            fileName: req.file.originalname,
            filePath: cloudinaryResult.secure_url,
            cloudinaryId: cloudinaryResult.public_id,
            cloudinaryResourceType: cloudinaryResult.resource_type || "image",
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            extractedText: extractedText.slice(0, MAX_STORED_TEXT_CHARS),
            status: "uploaded",
        });

        await logActivity({
            userId: req.user._id,
            documentId: document._id,
            type: "upload",
            fileName: document.originalName,
            description: "Contract uploaded successfully.",
        });

        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            document,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

export const getUserDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            user: req.user._id,
        })
            .sort({ createdAt: -1 })
            .select("-extractedText") // don't ship large text blobs to the client
            .lean();

        // Attach each document's latest report (if any) so the frontend can
        // show real risk data instead of "pending" for everything.
        const documentIds = documents.map((doc) => doc._id);

        const latestReports = await Report.aggregate([
            { $match: { document: { $in: documentIds } } },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: "$document",
                    reportId: { $first: "$_id" },
                    riskScore: { $first: "$riskScore" },
                    riskLevel: { $first: "$riskLevel" },
                },
            },
        ]);

        const reportByDocId = new Map(
            latestReports.map((r) => [String(r._id), r])
        );

        const documentsWithRisk = documents.map((doc) => {
            const report = reportByDocId.get(String(doc._id));
            return {
                ...doc,
                latestReportId: report?.reportId || null,
                riskScore: report?.riskScore ?? null,
                riskLevel: report?.riskLevel || null,
            };
        });

        res.status(200).json({
            success: true,
            count: documentsWithRisk.length,
            documents: documentsWithRisk,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        await deleteFromCloudinary(document.cloudinaryId, document.cloudinaryResourceType);

        // Remove any reports generated for this document too, so nothing
        // dangling is left behind (e.g. showing up in /reports).
        await Report.deleteMany({ document: document._id });

        await document.deleteOne();

        await logActivity({
            userId: req.user._id,
            documentId: null, // the document no longer exists
            type: "delete",
            fileName: document.originalName,
            description: "Contract and its reports were deleted.",
        });

        res.json({
            success: true,
            message: "Document deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
