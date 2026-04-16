import React, { useState } from 'react';
import ScoreRing from './ScoreRing';
import KeywordSection from './KeywordSection';
import SuggestionsPanel from './SuggestionsPanel';
import ResumeInfo from './ResumeInfo';
import './ResultsDashboard.css';

function ResultsDashboard({ data, onReset }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { analysis, fileName } = data;
  const { ats_scores, improvements, resume_info } = analysis;

  const getScoreColor = (score) => {
    if (score >= 75) return 'var(--accent-success)';
    if (score >= 50) return 'var(--accent-warm)';
    return 'var(--accent-danger)';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 65) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Work';
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'keywords', label: 'Keywords' },
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="results-dashboard">
      {/* Top bar */}
      <div className="results-topbar">
        <div className="results-file">
          <div className="file-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
            {fileName}
          </div>
          <span className="results-time">
            Analyzed {new Date(analysis.analyzed_at).toLocaleTimeString()}
          </span>
        </div>
        <button className="btn-reanalyze" onClick={onReset}>
          Analyze New Resume
        </button>
      </div>

      {/* Score hero */}
      <div className="score-hero">
        <div className="score-main">
          <ScoreRing score={ats_scores.overall_score} size={160} strokeWidth={10} />
          <div className="score-meta">
            <div className="score-label-big" style={{ color: getScoreColor(ats_scores.overall_score) }}>
              {getScoreLabel(ats_scores.overall_score)}
            </div>
            <h2 className="score-headline">ATS Compatibility Score</h2>
            <p className="score-desc">{improvements.overall_verdict}</p>
          </div>
        </div>

        {/* Sub scores */}
        <div className="sub-scores">
          {[
            { label: 'Keyword Match', score: ats_scores.keyword_match_score },
            { label: 'Format Score', score: ats_scores.format_score },
            { label: 'Experience Fit', score: ats_scores.experience_match_score },
            { label: 'Education Fit', score: ats_scores.education_match_score },
          ].map(({ label, score }) => (
            <div key={label} className="sub-score-card">
              <div className="sub-score-header">
                <span className="sub-score-label">{label}</span>
                <span className="sub-score-value" style={{ color: getScoreColor(score) }}>{score}</span>
              </div>
              <div className="sub-score-bar">
                <div
                  className="sub-score-fill"
                  style={{
                    width: `${score}%`,
                    background: getScoreColor(score)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority actions */}
      {improvements.priority_actions?.length > 0 && (
        <div className="priority-banner">
          <div className="priority-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
            </svg>
            Priority Actions
          </div>
          <div className="priority-list">
            {improvements.priority_actions.map((action, i) => (
              <div key={i} className="priority-item">
                <span className="priority-num">{i + 1}</span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <KeywordSection
              matched={ats_scores.matched_keywords}
              missing={ats_scores.missing_keywords}
              required={ats_scores.job_required_skills}
              compact
            />
            <SuggestionsPanel improvements={improvements} compact />
          </div>
        )}
        {activeTab === 'keywords' && (
          <KeywordSection
            matched={ats_scores.matched_keywords}
            missing={ats_scores.missing_keywords}
            required={ats_scores.job_required_skills}
          />
        )}
        {activeTab === 'suggestions' && (
          <SuggestionsPanel improvements={improvements} />
        )}
        {activeTab === 'profile' && (
          <ResumeInfo info={resume_info} />
        )}
      </div>
    </div>
  );
}

export default ResultsDashboard;
