import type { Request, Response } from "express";
import {
  findUserByEmail
} from "../service/auth.service.ts";

import {
  generateToken
} from "../utils/jwt.ts";
import { comparePassword } from "../utils/hash.ts";
export const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const { email, password } = req.body;

    const user =
      await findUserByEmail(email);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const isMatch =
      await comparePassword(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid credentials"
      });

    }

    const token =
      generateToken(
        user.id,
        user.role
      );

    res.json({

      message: "Login successful",

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: "Login failed"
    });

  }

};