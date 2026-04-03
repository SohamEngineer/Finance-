import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.ts";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

//Auth apis
app.use("/api/auth",authRouter)

app.get("/", (req, res) => {
  res.send("Server working");
});
export default app;