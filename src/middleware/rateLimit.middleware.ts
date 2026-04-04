import rateLimit from "express-rate-limit";



// GENERAL API LIMIT
export const apiLimiter = rateLimit({

  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // 100 requests per IP

  message: {
    message: "Too many requests. Try again later."
  }

});



// LOGIN LIMIT (STRICT)
export const loginLimiter = rateLimit({

  windowMs: 60 * 1000, // 1 minute

  max: 5,

  message: {
    message: "Too many login attempts"
  }

});