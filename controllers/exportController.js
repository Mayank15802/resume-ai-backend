import Resume from "../models/Resume.js";
import { generatePDF, generateAllDesignsZIP } from "../services/pdfExportService.js";

export const exportSinglePDF = async (req, res) => {
  try {
    const { resumeId, design, photoUrl } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const filePath = await generatePDF(resume, design, photoUrl);
    res.download(filePath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF export failed" });
  }
};

export const exportAllPDFs = async (req, res) => {
  try {
    const { resumeId, photoUrl } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const zipPath = await generateAllDesignsZIP(resume, photoUrl);
    res.download(zipPath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ZIP export failed" });
  }
};
