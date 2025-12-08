import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  keywords: Array,
  tools: Array,
  experienceKeys: Array,
  industryTerms: Array,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", jobSchema);
