// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.ts";
import app from "./src/app.ts";

// Handle synchronous errors
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

// Start server safely
const startServer = async () => {
  try {

    // Connect database first
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(
        ` Server running on http://localhost:${PORT}`
      );
    });

    // Handle async errors
    process.on("unhandledRejection", (err: any) => {
      console.error("Unhandled Rejection:", err.message);

      server.close(() => {
        process.exit(1);
      });
    });

    // Graceful shutdown (VERY important)
    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down...");
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received. Shutting down...");
      server.close(() => process.exit(0));
    });

  } catch (error) {

    console.error("Server startup failed:", error);

    process.exit(1);

  }
};

startServer();