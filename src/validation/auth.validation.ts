import { z } from "zod";

/* ============================= */
/* Register Validation Schema */
/* ============================= */

export const registerSchema = z.object({

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain letters and numbers"
    )

});


/* ============================= */
/* Login Validation Schema */
/* ============================= */

export const loginSchema = z.object({

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required")

});