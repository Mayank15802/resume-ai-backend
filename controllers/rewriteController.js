import { rewriteResumeTextAI } from "../services/rewriteService.js";

export const rewriteText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Text is required" });

    const rewritten = await rewriteResumeTextAI(text);

    res.json({ rewritten });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rewrite failed" });
  }
};
