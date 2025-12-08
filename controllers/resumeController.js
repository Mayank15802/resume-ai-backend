import { extractTextFromPDF } from "../services/pdfService.js";
import { analyzeResumeAI } from "../services/openaiService.js";
import { calculateFairAtsScore } from "../services/atsCalculator.js";
import Resume from "../models/Resume.js";
import fs from "fs";

export const uploadAndAnalyzeResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    // 1) Extract PDF text
    const extractedText = await extractTextFromPDF(filePath);

    // 2) AI analysis
    const analysis = await analyzeResumeAI(extractedText);

    // 3) Fair ATS scoring
    const scoring = calculateFairAtsScore(analysis);

    // 4) Save to DB
    const resume = await Resume.create({
      userId: req.user,
      fileUrl: filePath,
      extractedText,
      atsScore: scoring.finalScore,
      atsLabel: scoring.label,
      atsBreakdown: scoring.breakdown,
      keywordMatch: analysis.keyword_match,
      grammarIssues: analysis.grammar_issues,
      suggestions: analysis.suggestions,
      rewrittenSections: { summary: "", experience: "" }
    });

    // 5) Return combined response
    res.json({
      ...resume.toObject(),
      atsLabel: scoring.label,
      atsBreakdown: scoring.breakdown
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Resume analysis failed" });
  }
};
