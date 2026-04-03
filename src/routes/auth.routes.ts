import express from "express";

import {
  registerUser,
} from "../controllers/auth.controller.ts";
import { loginUser } from "../controllers/login.controller.ts";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerUser
);

authRouter.post(
  "/login",
  loginUser
);

export default authRouter;