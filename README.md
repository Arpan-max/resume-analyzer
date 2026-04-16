<div align="center">📄 ResumeAIAI-Powered Resume Analyzer & ATS ScorerUpload your resume, paste a job description, and let Claude AI reveal your ATS score, keyword gaps, and tailored improvements.</div>✨ Key Features🎯 ATS Scoring System: Get an overall score plus breakdown metrics (Keywords, Format, Experience, Education).🔍 Keyword Gap Analysis: Instantly see which crucial keywords from the JD are missing in your resume.🧠 3-Step AI Prompt Chain: Uses advanced sequence processing (Parse → Score → Suggest) for reliable JSON outputs.📝 Section-wise Feedback: Highly tailored advice for your Summary, Skills, Experience, and Formatting.⚙️ Deep Resume Parsing: Accurately extracts Name, Email, Skills, and Work History from PDF, DOCX, and TXT files.🎨 Interactive UI: Features drag-and-drop uploads and custom SVG animated score rings.🚀 Getting StartedFollow these steps to set up the project locally.PrerequisitesMake sure you have installed:Node.js (v18+)Anthropic API KeyInstallation1. Clone the repositorygit clone [https://github.com/Arpan-max/resume-analyzer.git](https://github.com/Arpan-max/resume-analyzer.git)
cd resume-analyzer
2. Setup Backendcd backend
npm install
Create a .env file in the backend folder:ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
3. Setup FrontendOpen a new terminal tab:cd frontend
npm install
Running the AppRun both servers concurrently to start the application.Terminal 1 (Backend):cd backend
npm run dev
Terminal 2 (Frontend):cd frontend
npm start
Success: Open http://localhost:3000 in your browser.📂 Project Architecture<details><summary>Click to expand folder structure</summary>resume-analyzer/
├── backend/
│   ├── routes/
│   │   └── analyze.js          # File upload & analysis logic
│   ├── utils/
│   │   ├── fileParser.js       # Extracts text from docs
│   │   └── aiAnalyzer.js       # Claude API prompt chains
│   └── server.js               # Express entry point
└── frontend/
    └── src/
        ├── components/
        │   ├── UploadSection.js      
        │   ├── ResultsDashboard.js   
        │   ├── ScoreRing.js          
        │   └── SuggestionsPanel.js   
        └── App.js
</details><div align="center"><i>Built by Arpan</i></div>