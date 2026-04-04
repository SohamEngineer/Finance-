import express from "express";

import {
  registerUser,
  loginUser
} from "../controllers/auth.controller.ts";

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