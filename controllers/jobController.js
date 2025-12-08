import { analyzeJobDescriptionAI } from "../services/jobService.js";
import Job from "../models/Job.js";

export const analyzeJob = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Job description required" });
    }

    // AI extract keywords
    const result = await analyzeJobDescriptionAI(description);

    // Save to DB
    const job = await Job.create({
      userId: req.user,
      title,
      description,
      keywords: result.skills,
      tools: result.tools,
      experienceKeys: result.experience_keywords,
      industryTerms: result.industry_terms
    });

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Job analyze failed" });
  }
};

