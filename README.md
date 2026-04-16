# ResumeAI — AI-Powered Resume Analyzer & ATS Scorer

A full-stack tool where users upload a resume and job description; Claude AI-powered prompt chains extract skills, score ATS compatibility, identify keyword gaps, and generate tailored improvement suggestions.

**Tech Stack:** React.js · Node.js · Express · Claude AI (Anthropic) · Multer · pdf-parse · mammoth

---

## ✅ Prerequisites

Before starting, make sure you have these installed:

- **Node.js** (v18 or higher) → Download from https://nodejs.org
- **VS Code** → You already have this
- **Git** → Download from https://git-scm.com

To check if they're installed, open a terminal in VS Code (`Ctrl + `` ` ``) and run:
```
node --version
git --version
```

---

## 🔑 Step 1 — Get Your FREE Anthropic API Key

This project uses **Claude AI** (by Anthropic) instead of OpenAI. Anthropic gives **free credits** to new accounts — enough for hundreds of analyses.

1. Go to → https://console.anthropic.com
2. Click **"Sign Up"** and create a free account
3. After logging in, go to → https://console.anthropic.com/settings/keys
4. Click **"Create Key"**
5. Name it `resume-analyzer` and click **Create**
6. **Copy the key** (starts with `sk-ant-...`) — you only see it once!

> ⚠️ New accounts get $5 free credits. Each resume analysis costs roughly $0.002 (fraction of a cent), so you can do ~2,500 analyses for free.

---

## 🛠️ Step 2 — Set Up the Project

### 2.1 — Open the project in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `resume-analyzer` folder (wherever you extracted/placed it)

### 2.2 — Open the terminal in VS Code

Press `Ctrl + `` ` `` ` (backtick) to open the integrated terminal.

### 2.3 — Set up the Backend

In the terminal, run these commands one by one:

```bash
cd backend
npm install
```

Wait for it to finish (it installs Express, Multer, pdf-parse, Anthropic SDK, etc.)

### 2.4 — Create the backend `.env` file

Still inside the `backend` folder, create a file named `.env`:

```bash
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Now open the `.env` file and replace `your_anthropic_api_key_here` with your actual API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Save the file.

### 2.5 — Set up the Frontend

Open a **new terminal** in VS Code (`Ctrl + Shift + `` ` ```) and run:

```bash
cd frontend
npm install
```

This installs React, Axios, React Dropzone, and other frontend packages. May take 2-3 minutes.

---

## 🚀 Step 3 — Run the Project Locally

You need **two terminals** running simultaneously.

### Terminal 1 — Start the Backend:
```bash
cd backend
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
```

### Terminal 2 — Start the Frontend:
```bash
cd frontend
npm start
```

Your browser will automatically open at **http://localhost:3000**

The app is now fully running! Upload a resume PDF and paste a job description to test it.

---

## 📦 Step 4 — Push to GitHub (to get a link for your resume)

### 4.1 — Create a GitHub account (if you don't have one)

Go to → https://github.com and sign up for free.

### 4.2 — Create a new repository on GitHub

1. Go to → https://github.com/new
2. Repository name: `resume-analyzer` (or `ai-resume-analyzer`)
3. Set it to **Public**
4. **Do NOT** check "Add a README file" (we already have one)
5. Click **"Create repository"**

### 4.3 — Configure Git (first time only)

In your VS Code terminal (from the root `resume-analyzer` folder):

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 4.4 — Initialize and push the code

In the terminal, make sure you're in the root `resume-analyzer` folder (not inside backend or frontend):

```bash
# Go to root folder
cd ..   # (run this if you're inside backend/ or frontend/)

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "feat: AI-powered resume analyzer with ATS scoring"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/resume-analyzer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

GitHub will ask for your username and password. For password, use a **Personal Access Token**:
1. Go to → https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name, check the **"repo"** checkbox, click **Generate**
4. Use this token as your password when Git asks

### 4.5 — Get your GitHub link

After pushing, your repository link will be:
```
https://github.com/YOUR_USERNAME/resume-analyzer
```

---

## 🌐 Step 5 — Deploy Online (Optional but Recommended for Resume)

For a live hosted link (better for resumes than a GitHub repo link), deploy it free:

### Deploy Backend to Render (Free)

1. Go to → https://render.com and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your API key
6. Click **"Create Web Service"**
7. Wait ~2 minutes. Copy the URL (e.g., `https://resume-analyzer-xxxx.onrender.com`)

### Deploy Frontend to Vercel (Free)

1. Go to → https://vercel.com and sign up with GitHub
2. Click **"New Project"**
3. Import your `resume-analyzer` GitHub repo
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
5. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: your Render backend URL (from above)
6. Click **"Deploy"**
7. Your live URL will be: `https://resume-analyzer-xxxx.vercel.app`

> **Note:** Update `frontend/src/components/UploadSection.js` — change the axios URL from `/api/analyze` to `${process.env.REACT_APP_API_URL}/api/analyze` before deploying.

---

## 📝 What to Write on Your Resume

### Project Entry:
```
AI-Powered Resume Analyzer & ATS Scorer  |  React.js, Node.js, Anthropic Claude API, Python
• GitHub: github.com/YOUR_USERNAME/resume-analyzer
• Live Demo: your-app.vercel.app  (if deployed)
```

### Bullet Points (already on your resume — they're accurate!):
```
• Built a full-stack tool where users upload a resume and job description; Claude AI-powered 
  prompt chains extract skills, score ATS compatibility, identify keyword gaps, and generate 
  tailored improvement suggestions.

• Implemented prompt chaining (3-step chain) and structured JSON output strategies to produce 
  consistent results from the LLM, rendered dynamically in a React frontend with drag-and-drop 
  upload, real-time scoring UI, and section-wise feedback; backend uses Multer and pdf-parse 
  for file processing.
```

---

## 📁 Project Structure

```
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
│   │   │   ├── Header.js       # Navigation header
│   │   │   ├── UploadSection.js # Drag-drop upload + JD input
│   │   │   ├── LoadingScreen.js # Animated loading with step tracking
│   │   │   ├── ResultsDashboard.js # Main results view
│   │   │   ├── ScoreRing.js    # Animated SVG score ring
│   │   │   ├── KeywordSection.js # Matched/missing keywords
│   │   │   ├── SuggestionsPanel.js # Section-wise AI suggestions
│   │   │   └── ResumeInfo.js   # Extracted resume profile
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
├── package.json                # Root scripts
└── README.md
```

---

## 🔧 Troubleshooting

**"Cannot find module" errors:**
→ Run `npm install` inside the `backend` folder, then inside `frontend` folder.

**"Invalid API key" error:**
→ Check your `.env` file in the backend folder. Make sure there are no spaces around the `=` sign.

**Port 5000 already in use:**
→ Change `PORT=5001` in your `.env` file and restart the backend.

**PDF text not extracting:**
→ Some PDFs are image-based (scanned). Try a text-based PDF or DOCX file instead.

**Frontend shows blank page:**
→ Make sure backend is running on port 5000 before starting the frontend.

---

## 💡 Features Summary

- **Drag & Drop Upload** — PDF, DOCX, TXT resume upload
- **ATS Scoring** — Overall score + 4 sub-scores (keyword, format, experience, education)
- **Keyword Gap Analysis** — Matched vs missing keywords with visual tags
- **3-Step AI Prompt Chain** — Parse → Score → Suggest (sequential Claude API calls)
- **Section-wise Feedback** — Summary, Skills, Experience, Format, Keywords
- **Animated Score Ring** — SVG-based animated circular progress
- **Resume Profile Extraction** — Name, email, skills, companies, education
- **Rate Limiting** — 10 requests per 15 minutes to protect API quota
- **File Validation** — Type checking, size limits, content verification
