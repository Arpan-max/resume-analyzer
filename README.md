ResumeAI — AI-Powered Resume Analyzer & ATS ScorerA full-stack web application that allows users to upload their resumes and compare them against specific job descriptions. Utilizing Claude AI (Anthropic), the tool employs prompt chains to extract skills, calculate an ATS compatibility score, identify keyword gaps, and generate tailored, section-by-section improvement suggestions.🚀 Tech StackFrontend: React.js, Tailwind CSS (or standard CSS, update as needed)Backend: Node.js, Express.jsAI Processing: Claude API (Anthropic SDK)File Parsing: Multer, pdf-parse, mammoth✨ FeaturesDrag & Drop Upload: Support for PDF, DOCX, and TXT resume uploads.ATS Scoring System: Calculates an overall score alongside 4 sub-scores (Keywords, Format, Experience, Education).Keyword Gap Analysis: Visual tagging of matched versus missing keywords based on the target job description.3-Step AI Prompt Chain: Sequential Claude API calls (Parse → Score → Suggest) for accurate and structured JSON outputs.Section-wise Feedback: Detailed, AI-generated suggestions for Summary, Skills, Experience, Formatting, and Keywords.Animated Score Ring: Custom SVG-based animated circular progress indicators for visual feedback.Resume Profile Extraction: Automatically parses Name, Email, Skills, Companies, and Education history.Robust Backend: Includes rate limiting (10 requests/15 mins) and comprehensive file validation (type checking, size limits, content verification).🛠️ Getting StartedPrerequisitesNode.js (v18 or higher)An Anthropic API Key (Claude)InstallationClone the repository:git clone [https://github.com/Arpan-max/resume-analyzer.git](https://github.com/Arpan-max/resume-analyzer.git)
cd resume-analyzer
Set up the Backend:cd backend
npm install
Configure Environment Variables:Create a .env file in the backend directory:ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
Set up the Frontend:Open a new terminal window/tab:cd frontend
npm install
Running the ApplicationYou will need to run the frontend and backend concurrently.Start the Backend (Terminal 1):cd backend
npm run dev
Start the Frontend (Terminal 2):cd frontend
npm start
The application will be available at http://localhost:3000.📁 Project Structureresume-analyzer/
├── backend/
│   ├── routes/
│   │   └── analyze.js          # File upload & analysis endpoint
│   ├── utils/
│   │   ├── fileParser.js       # PDF/DOCX/TXT text extraction
│   │   └── aiAnalyzer.js       # 3-step Claude AI prompt chain
│   ├── server.js               # Express server entry point
│   └── package.json
├── frontend/
│   ├── public/
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
└── README.md
