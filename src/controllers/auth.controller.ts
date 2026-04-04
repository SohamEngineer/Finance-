import type { Request, Response } from "express";

import {
  createUser,
  findUserByEmail
} from "../service/auth.service.ts";

import {
  comparePassword,
  hashPassword
} from "../utils/hash.ts";

import {
  generateToken
} from "../utils/jwt.ts";

//register controller

export const registerUser = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // Basic validation
    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    // Default role = viewer
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

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

};

//Login controller
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