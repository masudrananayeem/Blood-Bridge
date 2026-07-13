import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// ---- Security & core middleware ----
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting — protects auth & request endpoints from abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", apiLimiter);

// ---- Health check ----
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "BloodBridge API is running" });
});

/*
  ---- Route mounting (added progressively) ----
  Step 6 will add:
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
  Step 10 will add:
    app.use("/api/requests", bloodRequestRoutes);
    app.use("/api/notifications", notificationRoutes);
    app.use("/api/admin", adminRoutes);
*/

// ---- Error handling (always last) ----
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 BloodBridge server running on port ${PORT}`);
  });
};

startServer();
