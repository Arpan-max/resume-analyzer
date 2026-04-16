const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// ─── PROMPT CHAIN STEP 1: Extract structured info from resume ───────────────
async function extractResumeInfo(resumeText) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: `You are a resume parsing expert. Extract structured information from this resume.

RESUME TEXT:
${resumeText.slice(0, 4000)}

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "name": "candidate name or Unknown",
  "email": "email or null",
  "phone": "phone or null",
  "skills": ["skill1", "skill2"],
  "experience_years": 0,
  "education": ["degree/institution"],
  "job_titles": ["title1", "title2"],
  "companies": ["company1"],
  "certifications": ["cert1"],
  "sections_present": ["Summary", "Experience", "Education", "Skills"]
}`
    }]
  });

  const text = response.content[0].text.trim();
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ─── PROMPT CHAIN STEP 2: Score ATS compatibility ───────────────────────────
async function scoreATSCompatibility(resumeText, jobDescription, resumeInfo) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `You are an ATS (Applicant Tracking System) scoring expert. Analyze resume-job fit.

RESUME SKILLS: ${JSON.stringify(resumeInfo.skills)}
RESUME EXPERIENCE (years): ${resumeInfo.experience_years}
RESUME SECTIONS: ${JSON.stringify(resumeInfo.sections_present)}

JOB DESCRIPTION:
${jobDescription.slice(0, 2000)}

RESUME TEXT (first 2000 chars):
${resumeText.slice(0, 2000)}

Return ONLY a valid JSON object (no markdown, no explanation):
{
  "overall_score": 72,
  "keyword_match_score": 65,
  "format_score": 80,
  "experience_match_score": 75,
  "education_match_score": 70,
  "matched_keywords": ["Python", "React"],
  "missing_keywords": ["Docker", "Kubernetes", "AWS"],
  "job_required_skills": ["Python", "React", "Docker", "Kubernetes", "AWS"],
  "score_breakdown": {
    "keyword_match": "How well resume keywords match job requirements",
    "format": "ATS-readability of resume format",
    "experience": "Experience level alignment",
    "education": "Education requirement match"
  }
}`
    }]
  });

  const text = response.content[0].text.trim();
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ─── PROMPT CHAIN STEP 3: Generate improvement suggestions ──────────────────
async function generateImprovements(resumeText, jobDescription, atsData) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2500,
    messages: [
      {
        role: 'user',
        content: `You are an expert career coach and resume writer. Generate detailed, actionable resume improvement suggestions.

ATS SCORE: ${atsData.overall_score}/100
MISSING KEYWORDS: ${JSON.stringify(atsData.missing_keywords)}
MATCHED KEYWORDS: ${JSON.stringify(atsData.matched_keywords)}

JOB DESCRIPTION:
${jobDescription.slice(0, 1500)}

RESUME EXCERPT:
${resumeText.slice(0, 1500)}

Provide specific, section-level improvement advice. Return ONLY valid JSON (no markdown):
{
  "summary_suggestions": [
    "Add a compelling professional summary highlighting your X years in [field]",
    "Include target job title and key value proposition"
  ],
  "skills_suggestions": [
    "Add missing technical skills: Docker, Kubernetes, AWS",
    "Group skills by category: Languages, Frameworks, DevOps, Cloud"
  ],
  "experience_suggestions": [
    "Quantify achievements: instead of 'improved performance', write 'improved API response time by 40%'",
    "Use stronger action verbs: Led, Architected, Optimized, Deployed"
  ],
  "format_suggestions": [
    "Use standard section headers (Experience, Education, Skills) for ATS parsing",
    "Avoid tables, columns, and graphics that confuse ATS scanners"
  ],
  "keyword_suggestions": [
    "Naturally incorporate 'Docker' in your DevOps experience bullet",
    "Mention 'Kubernetes' in the context of container orchestration work"
  ],
  "overall_verdict": "Your resume shows strong [X] skills but needs better alignment with the DevOps requirements in this role. Focus on adding cloud infrastructure keywords and quantifying your impact.",
  "priority_actions": [
    "Add missing keywords: Docker, Kubernetes, AWS (HIGH PRIORITY)",
    "Quantify 3-5 key achievements with numbers",
    "Add a tailored professional summary"
  ]
}`
      }
    ]
  });

  const text = response.content[0].text.trim();
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ─── MAIN: Run full prompt chain ─────────────────────────────────────────────
async function analyzeResume(resumeText, jobDescription) {
  try {
    // Step 1: Extract resume info
    const resumeInfo = await extractResumeInfo(resumeText);

    // Step 2: Score ATS compatibility
    const atsData = await scoreATSCompatibility(resumeText, jobDescription, resumeInfo);

    // Step 3: Generate improvements
    const improvements = await generateImprovements(resumeText, jobDescription, atsData);

    return {
      resume_info: resumeInfo,
      ats_scores: atsData,
      improvements,
      analyzed_at: new Date().toISOString()
    };
  } catch (err) {
    throw new Error(`AI analysis failed: ${err.message}`);
  }
}

module.exports = { analyzeResume };
