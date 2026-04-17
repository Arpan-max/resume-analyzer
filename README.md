# ResumeAI — AI-Powered Resume Analyzer & ATS Scorer

> Upload your resume, paste a job description, and get instant ATS scoring, keyword gap analysis, and tailored improvement suggestions — powered by Claude AI.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)
![Claude AI](https://img.shields.io/badge/Claude_AI-Anthropic-CC785C?style=flat-square)

---

## ✨ Features

- **Drag & Drop Upload** — Supports PDF, DOCX, and TXT resume formats
- **ATS Compatibility Score** — Overall score + 4 sub-scores (keyword match, format, experience, education)
- **Keyword Gap Analysis** — Visual breakdown of matched vs. missing keywords from the job description
- **3-Step AI Prompt Chain** — Sequential Claude API calls: Parse → Score → Suggest
- **Section-wise Feedback** — Targeted suggestions for Summary, Skills, Experience, Format, and Keywords
- **Animated Score Ring** — SVG-based circular progress indicator with real-time animation
- **Resume Profile Extraction** — Extracts name, skills, companies, education, and job titles
- **Rate Limiting** — Built-in API protection (10 requests per 15 minutes)

---

## 🖥️ Demo

| Upload Screen | Results Dashboard |
|---|---|
| Drag & drop resume + paste job description | ATS score, keyword gaps, and AI suggestions |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Dropzone, CSS Variables |
| Backend | Node.js, Express.js |
| File Parsing | Multer, pdf-parse, mammoth |
| AI / LLM | Anthropic Claude API (claude-haiku) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## ⚙️ How It Works

The backend runs a **3-step prompt chain** against the Claude API:

```
Step 1 — Resume Parser
  └─ Extracts: name, skills, experience years, education, job titles, companies

Step 2 — ATS Scorer
  └─ Compares resume against job description keywords
  └─ Produces: overall score + 4 sub-scores + matched/missing keywords

Step 3 — Suggestion Generator
  └─ Generates section-wise, actionable improvement tips
  └─ Outputs: priority actions + per-section recommendations
```

Each step passes its output as context into the next — classic prompt chaining for consistent, structured JSON output.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- An Anthropic API key (see below)

### 1. Clone the repository

```bash
git clone https://github.com/Arpan-max/resume-analyzer.git
cd resume-analyzer
```

### 2. Get your Anthropic API Key

This project uses the **Claude AI API** by Anthropic.

1. Go to [console.anthropic.com](https://console.anthropic.com) and create a free account
2. Navigate to **Settings → API Keys → Create Key**
3. Copy your key — it starts with `sk-ant-...`

> New accounts receive free credits sufficient for hundreds of resume analyses.

### 3. Configure the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and add your API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Run the app

Open two terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm start
```

App runs at **http://localhost:3000**

---

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── routes/
│   │   └── analyze.js          # Upload & analysis endpoint
│   ├── utils/
│   │   ├── fileParser.js       # PDF / DOCX / TXT text extraction
│   │   └── aiAnalyzer.js       # 3-step Claude AI prompt chain
│   ├── server.js
│   └── .env.example
└── frontend/
    └── src/
        └── components/
            ├── UploadSection.js     # Drag-drop upload + JD input
            ├── LoadingScreen.js     # Animated step-by-step loader
            ├── ResultsDashboard.js  # Main results view + tabs
            ├── ScoreRing.js         # Animated SVG score ring
            ├── KeywordSection.js    # Matched / missing keyword tags
            ├── SuggestionsPanel.js  # Accordion suggestions per section
            └── ResumeInfo.js        # Extracted resume profile
```

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Claude API key from [console.anthropic.com](https://console.anthropic.com) |
| `PORT` | Backend port (default: `5000`) |
| `FRONTEND_URL` | Frontend origin for CORS (default: `http://localhost:3000`) |