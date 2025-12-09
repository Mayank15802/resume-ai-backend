import "./loadEnv.js";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import rewriteRoutes from "./routes/rewriteRoutes.js";

dotenv.config();
connectDB();

const app = express();

// MUST come before CORS
app.use(express.json());

// FIXED CORS (Render compatible)
const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-ai-backend-p06j.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked: " + origin), false);
    },
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
  })
);

// Important for Render CORS!
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/rewrite", rewriteRoutes);
app.use("/api/export", exportRoutes);

app.listen(5000, () => console.log("🔥 Server running on port 5000"));
