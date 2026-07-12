import express from "express";
import {
  signupUser,
  loginUser,
  getCurrentUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/protect.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);

userRouter.post("/login", loginUser);

userRouter.get("/me", protect, getCurrentUser);

export default userRouter;