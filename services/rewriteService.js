import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const rewriteResumeTextAI = async (text) => {
  const prompt = `
Rewrite the following resume section to be:
- Professional
- ATS-friendly
- Clear and concise
- Uses action verbs
- Uses measurable achievements if possible
- Strong resume tone

Return ONLY the improved text.

Text:
${text}
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content.trim();
};
