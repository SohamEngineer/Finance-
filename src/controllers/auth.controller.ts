import type { Request, Response } from "express";

import {
  createUser,
  findUserByEmail
} from "../service/auth.service";

import {
  comparePassword,
  hashPassword
} from "../utils/hash";

import {
  generateToken
} from "../utils/jwt";
import { loginSchema, registerSchema } from "../validation/auth.validation";





/* ============================= */
/* REGISTER */
/* ============================= */

export const registerUser = async (
  req: Request,
  res: Response
) => {

  try {

    // Validate request body
    const validatedData =
      registerSchema.parse(req.body);

    const {
      name,
      email,
      password
    } = validatedData;

    const role_id = 1;

    // Check existing user
    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // Hash password
    const hashedPassword =
      await hashPassword(password);

    // Create user
    const user =
      await createUser(
        name,
        email,
        hashedPassword,
        role_id
      );

    // Generate token
    const token =
      generateToken(
        user.id,
        "viewer"
      );

    res.status(201).json({

      message: "User registered",

      token,

      user

    });

  } catch (error: any) {

    // Zod validation error
    if (error.name === "ZodError") {

      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });

    }

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

};



/* ============================= */
/* LOGIN */
/* ============================= */

export const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    // Validate request body
    const validatedData =
      loginSchema.parse(req.body);

    const { email, password } =
      validatedData;

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

  } catch (error: any) {

    if (error.name === "ZodError") {

      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });

    }

    res.status(500).json({
      message: "Login failed"
    });

  }

};