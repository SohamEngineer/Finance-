import express from "express";

import {
  registerUser,
  loginUser
} from "../controllers/auth.controller.ts";
import { loginLimiter } from "../middleware/rateLimit.middleware.ts";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerUser
);

authRouter.post(
  "/login",
  loginLimiter,
  loginUser
);

export default authRouter;