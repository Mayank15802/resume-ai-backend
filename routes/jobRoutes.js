import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { analyzeJob } from "../controllers/jobController.js";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/all", protect, async (req, res) => {
  const jobs = await Job.find({ userId: req.user }).sort({ createdAt: -1 });
  res.json(jobs);
});

router.post("/analyze", protect, analyzeJob);

export default router;
