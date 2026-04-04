import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.ts";
import financeRouter from "./routes/finance.routes.ts";
import summaryRouter from "./routes/summary.routes.ts";

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
app.use("/api/finance",financeRouter)
app.use("/api/dashboard",summaryRouter)

app.get("/", (req, res) => {
  res.send("Server working");
});
export default app;