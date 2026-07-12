import express from "express";
import { protect } from "../middleware/protect.js";
import {
  analyzeDocument,
  getUserReports,
  getReportById,
  downloadReport,
  getReportStats,
} from "../controllers/reportController.js";

const reportRouter = express.Router();

reportRouter.post("/analyze/:documentId", protect, analyzeDocument);

reportRouter.get("/stats/summary", protect, getReportStats);

reportRouter.get("/", protect, getUserReports);

reportRouter.get("/:id", protect, getReportById);

reportRouter.get("/:id/download", protect, downloadReport);

export default reportRouter;
