const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { extractTextFromFile } = require('../utils/fileParser');
const { analyzeResume } = require('../utils/aiAnalyzer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'));
    }
  }
});

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({ error: 'Job description must be at least 50 characters' });
    }

    // Extract text from uploaded file
    const resumeText = await extractTextFromFile(req.file);

    if (!resumeText || resumeText.trim().length < 100) {
      return res.status(400).json({ error: 'Could not extract sufficient text from the resume. Please ensure the file is not image-based.' });
    }

    // Run AI analysis
    const analysis = await analyzeResume(resumeText, jobDescription);

    res.json({
      success: true,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      analysis
    });

  } catch (err) {
    console.error('Analysis error:', err);
    if (err.message.includes('Only PDF')) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || 'Analysis failed. Please try again.' });
  }
});

module.exports = router;
