import pdf from "pdf-parse";
import fs from "fs";

export const extractTextFromPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
};
