import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

const templateDir = path.resolve("templates");
const outputDir = path.resolve("exports");

const fill = (html, data) =>
  html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");

export const generatePDF = async (resume, design, photoUrl = "") => {
  const file = path.join(templateDir, `${design}.html`);
  let html = fs.readFileSync(file, "utf8");

  const filledHTML = fill(html, {
    name: resume.name,
    email: resume.email,
    phone: resume.phone,
    location: resume.location,
    summary: resume.summary,
    experience: resume.experience,
    skills: resume.skills.join(", "),
    photo: photoUrl,
  });

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(filledHTML, { waitUntil: "networkidle0" });

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const pdfPath = `${outputDir}/${design}-${Date.now()}.pdf`;

  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  return pdfPath;
};

export const generateAllDesignsZIP = async (resume, photoUrl = "") => {
  const designs = ["modern", "minimal", "premium"];
  const zip = new AdmZip();

  for (let d of designs) {
    const pdf = await generatePDF(resume, d, photoUrl);
    zip.addLocalFile(pdf);
  }

  const zipPath = `${outputDir}/resume-pack-${Date.now()}.zip`;
  zip.writeZip(zipPath);

  return zipPath;
};
