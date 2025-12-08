import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// Extract skills + keywords from job description
export const analyzeJobDescriptionAI = async (jobText) => {

  const prompt = `
You are an expert ATS system. Analyze the given job description
and return ONLY JSON in this format:

{
  "skills": [],
  "tools": [],
  "experience_keywords": [],
  "industry_terms": []
}

Job Description:
${jobText}
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(completion.choices[0].message.content);
};
