// server.js
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

// Parse JSON body first
app.use(express.json());

// ---------- CORS (Render + localhost) ----------
const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-ai-frontend.vercel.app",
  "https://resume-ai-backend-p06j.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,           // allow these origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,                // ok (for cookies if you add later)
  })
);

// (Optional but useful) Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/rewrite", rewriteRoutes);
app.use("/api/export", exportRoutes);

// ---------- Start server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🔥 Server running on PORT:", PORT));
