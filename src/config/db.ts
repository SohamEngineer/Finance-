// Load environment variables from .env file
import dotenv from "dotenv"
dotenv.config()

// Import postgres-js client (works well with Neon DB)
import postgres from "postgres"

// Validate DATABASE_URL existence
// If missing, stop the app immediately instead of failing silently
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env")
}


// Create PostgreSQL connection instance
// This uses connection pooling internally
const sql = postgres(process.env.DATABASE_URL, {

  // Required for Neon (SSL enforced connections)
  ssl: "require",

  // Maximum number of database connections in the pool
  // Keep this low in serverless environments
  max: 10,

  // Time (seconds) before idle connections are closed
  // Prevents unused connections from hanging
  idle_timeout: 30,

  // Time (seconds) to wait before failing connection attempt
  // Helps avoid infinite waiting
  connect_timeout: 10,

  // Disable prepared statements
  // Important for Neon or serverless environments
  // Prevents prepared statement conflicts
  prepare: false
})


// Function to test database connectivity
// Should be called when server starts
export const connectDB = async () => {
  try {

    // Simple test query
    await sql`SELECT 1`

    console.log("Neon PostgreSQL Connected")

  } catch (error) {

    console.error("Database connection failed:", error)

    // Exit process if database fails
    // Running without DB is useless
    process.exit(1)

  }
}

// Export sql instance to be used in models
export default sql