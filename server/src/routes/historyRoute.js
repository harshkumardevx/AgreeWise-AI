import express from "express";
import { protect } from "../middleware/protect.js";
import {
  getUserHistory,
  clearUserHistory,
} from "../controllers/historyController.js";

const historyRouter = express.Router();

historyRouter.get("/", protect, getUserHistory);
historyRouter.delete("/", protect, clearUserHistory);

export default historyRouter;
