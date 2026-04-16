ResumeAI — AI-Powered Resume Analyzer & ATS Scorer

A full-stack tool where users upload a resume and job description; Claude AI-powered prompt chains extract skills, score ATS compatibility, identify keyword gaps, and generate tailored improvement suggestions.

Tech Stack: React.js · Node.js · Express · Claude AI (Anthropic) · Multer · pdf-parse · mammoth

💡 Features Summary

Drag & Drop Upload — PDF, DOCX, TXT resume upload

ATS Scoring — Overall score + 4 sub-scores (keyword, format, experience, education)

Keyword Gap Analysis — Matched vs missing keywords with visual tags

3-Step AI Prompt Chain — Parse → Score → Suggest (sequential Claude API calls)

Section-wise Feedback — Summary, Skills, Experience, Format, Keywords

Animated Score Ring — SVG-based animated circular progress

Resume Profile Extraction — Name, email, skills, companies, education

Rate Limiting — 10 requests per 15 minutes to protect API quota

File Validation — Type checking, size limits, content verification

🛠️ Local Setup Instructions

1 — Prerequisites

Node.js (v18 or higher)

Anthropic API Key (Claude AI)

2 — Clone the Repository

git clone [https://github.com/Arpan-max/resume-analyzer.git](https://github.com/Arpan-max/resume-analyzer.git)
cd resume-analyzer


3 — Set up the Backend

Open your terminal and run:

cd backend
npm install


Create a .env file in the backend folder:

ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000
FRONTEND_URL=http://localhost:3000


4 — Set up the Frontend

Open a new terminal and run:

cd frontend
npm install


🚀 Run the Project Locally

You need two terminals running simultaneously.

Terminal 1 — Start the Backend:

cd backend
npm run dev


Terminal 2 — Start the Frontend:

cd frontend
npm start


Your browser will automatically open at http://localhost:3000. Upload a resume PDF and paste a job description to test it.

📁 Project Structure

resume-analyzer/
├── backend/
│   ├── routes/
│   │   └── analyze.js          # File upload & analysis endpoint
│   ├── utils/
│   │   ├── fileParser.js       # PDF/DOCX/TXT text extraction
│   │   └── aiAnalyzer.js       # 3-step Claude AI prompt chain
│   ├── server.js               # Express server
│   ├── .env.example            # Environment variables template
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js             # Navigation header
│   │   │   ├── UploadSection.js      # Drag-drop upload + JD input
│   │   │   ├── LoadingScreen.js      # Animated loading with step tracking
│   │   │   ├── ResultsDashboard.js   # Main results view
│   │   │   ├── ScoreRing.js          # Animated SVG score ring
│   │   │   ├── KeywordSection.js     # Matched/missing keywords
│   │   │   ├── SuggestionsPanel.js   # Section-wise AI suggestions
│   │   │   └── ResumeInfo.js         # Extracted resume profile
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
├── package.json                # Root scripts
└── README.md


🔧 Troubleshooting

"Cannot find module" errors:
→ Run npm install inside the backend folder, then inside frontend folder.

"Invalid API key" error:
→ Check your .env file in the backend folder. Make sure there are no spaces around the = sign.

Port 5000 already in use:
→ Change PORT=5001 in your .env file and restart the backend.

PDF text not extracting:
→ Some PDFs are image-based (scanned). Try a text-based PDF or DOCX file instead.

Frontend shows blank page:
→ Make sure backend is running on port 5000 before starting the frontend.