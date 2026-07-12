import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/protect.js";
import {
    uploadDocument,
    getUserDocuments,
    deleteDocument,
} from "../controllers/documentController.js";

const documentRouter = express.Router();

documentRouter.post(
    "/upload",
    protect,
    upload.single("document"),
    uploadDocument
);

documentRouter.get("/", protect, getUserDocuments);

documentRouter.delete(
  "/:id",
  protect,
  deleteDocument
);

export default documentRouter;