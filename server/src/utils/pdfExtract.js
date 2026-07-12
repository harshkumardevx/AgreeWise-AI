import { PDFParse } from "pdf-parse";

// Extracts plain text from a PDF buffer. Returns "" if the PDF has no
// extractable text (e.g. a scanned image with no OCR layer) instead of
// throwing, so callers can decide how to handle that case.
export const extractTextFromPdf = async (buffer) => {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text || "";
  } finally {
    await parser.destroy();
  }
};
