import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// Deep AI analysis for resume
export const analyzeResumeAI = async (resumeText) => {
  const prompt = `
You are a professional resume reviewer + ATS evaluator.
Analyze the resume and return ONLY JSON in this exact format:

{
  "keyword_match": { "matched": [], "missing": [] },
  "grammar_issues": [],
  "suggestions": [],
  "summary_strength": "excellent/good/average/weak",
  "experience_strength": "excellent/good/average/weak",
  "skills_strength": "excellent/good/average/weak"
}

Resume:
${resumeText}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(completion.choices[0].message.content);
};
