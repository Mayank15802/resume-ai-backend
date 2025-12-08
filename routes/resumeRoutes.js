import express from "express";
import Resume from "../models/Resume.js";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { uploadAndAnalyzeResume } from "../controllers/resumeController.js";

const router = express.Router();

router.get("/all", protect, async (req, res) => {
  const resumes = await Resume.find({ userId: req.user }).sort({ createdAt: -1 });
  res.json(resumes);
});

const upload = multer({ dest: "uploads/" });

router.post("/upload", protect, upload.single("resume"), uploadAndAnalyzeResume);

export default router;
