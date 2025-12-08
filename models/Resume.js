import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: String,
  fileUrl: String,
  extractedText: String,

  atsScore: Number,
  atsLabel: String,
  atsBreakdown: Object,

  keywordMatch: Object,
  grammarIssues: Array,
  suggestions: Array,

  rewrittenSections: {
    summary: String,
    experience: String
  },

  createdAt: { type: Date, default: Date.now }
});

// FIX: Prevent OverwriteModelError
export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
