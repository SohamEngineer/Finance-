import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import financeRouter from "./routes/finance.routes";
import summaryRouter from "./routes/summary.routes";
import { apiLimiter } from "./middleware/rateLimit.middleware";
import { swaggerSpec, swaggerUi } from "./config/swagger";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

//ratelimit
app.use("/api", apiLimiter);

//Auth apis
app.use("/api/auth",authRouter)
app.use("/api/finance",financeRouter)
app.use("/api/dashboard",summaryRouter)

app.get("/", (req, res) => {
  res.send("Server working");
});
export default app;