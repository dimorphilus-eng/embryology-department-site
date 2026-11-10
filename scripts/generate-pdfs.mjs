import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const documents = JSON.parse(readFileSync(path.join(root, "content/documents.json"), "utf8"));
const regular = readFileSync("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf");
const bold = readFileSync("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf");
const outDir = path.join(root, "public/documents");
mkdirSync(outDir, { recursive: true });

function wrap(text, font, size, width) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

for (const document of documents) {
  for (const locale of ["ru", "en"]) {
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);
    const body = await pdf.embedFont(regular, { subset: true });
    const titleFont = await pdf.embedFont(bold, { subset: true });
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 56;
    const maxWidth = pageWidth - margin * 2;
    let page = pdf.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;
    const title = document.title[locale];
    pdf.setTitle(title);
    pdf.setAuthor(locale === "ru" ? "Кафедра эмбриологии" : "Department of Embryology");
    pdf.setLanguage(locale === "ru" ? "ru-RU" : "en-GB");
    pdf.setSubject("Sample departmental document");

    function ensure(lineHeight) {
      if (y - lineHeight < margin) {
        page = pdf.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
    }

    for (const line of wrap(title, titleFont, 18, maxWidth)) {
      ensure(24);
      page.drawText(line, { x: margin, y: y - 18, size: 18, font: titleFont, color: rgb(0.08, 0.11, 0.18) });
      y -= 24;
    }
    y -= 8;
    for (const paragraph of document.lines[locale]) {
      for (const line of wrap(paragraph, body, 12, maxWidth)) {
        ensure(18);
        page.drawText(line, { x: margin, y: y - 12, size: 12, font: body, color: rgb(0.1, 0.15, 0.2) });
        y -= 18;
      }
      y -= 8;
    }

    const bytes = await pdf.save();
    writeFileSync(path.join(outDir, `${document.slug}.${locale}.pdf`), bytes);
  }
}

console.log(`Wrote ${documents.length * 2} PDF files to public/documents`);
