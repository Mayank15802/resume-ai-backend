import "./loadEnv.js";

import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";



// Routes
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import rewriteRoutes from "./routes/rewriteRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/rewrite", rewriteRoutes);
app.use("/api/export", exportRoutes);

// Run server
app.listen(5000, () => console.log("🔥 Server running on port 5000"));

console.log("DEBUG OPENAI:", process.env.OPENAI_API_KEY);

