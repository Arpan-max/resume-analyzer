const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

async function extractTextFromFile(file) {
  const ext = path.extname(file.originalname).toLowerCase();

  try {
    if (ext === '.pdf') {
      const data = await pdfParse(file.buffer);
      return data.text;
    }

    if (ext === '.docx' || ext === '.doc') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value;
    }

    if (ext === '.txt') {
      return file.buffer.toString('utf-8');
    }

    throw new Error('Unsupported file type');
  } catch (err) {
    throw new Error(`Failed to parse file: ${err.message}`);
  }
}

module.exports = { extractTextFromFile };
