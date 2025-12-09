import "./loadEnv.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import rewriteRoutes from "./routes/rewriteRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
connectDB();

const app = express();

// MUST COME FIRST
app.use(express.json());

// RENDER-COMPATIBLE CORS FIX
const allowed = [
  "http://localhost:5173",
  "https://resume-ai-frontend.vercel.app",
  "https://resume-ai-backend-p06j.onrender.com"
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("CORS BLOCKED: " + origin), false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Required for Render preflight
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/rewrite", rewriteRoutes);
app.use("/api/export", exportRoutes);

app.listen(5000, () => console.log("🔥 Server running on port 5000"));
