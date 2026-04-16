import React from 'react';
import './KeywordSection.css';

function KeywordSection({ matched = [], missing = [], required = [], compact }) {
  const matchRate = required.length > 0
    ? Math.round((matched.length / required.length) * 100)
    : 0;

  return (
    <div className={`keyword-section ${compact ? 'compact' : ''}`}>
      <div className="section-header">
        <h3 className="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Keyword Analysis
        </h3>
        <span className="keyword-rate" style={{ color: matchRate >= 60 ? 'var(--accent-success)' : 'var(--accent-warm)' }}>
          {matchRate}% match
        </span>
      </div>

      <div className="keyword-summary">
        <div className="kw-stat">
          <span className="kw-num matched-num">{matched.length}</span>
          <span className="kw-desc">matched</span>
        </div>
        <div className="kw-divider"></div>
        <div className="kw-stat">
          <span className="kw-num missing-num">{missing.length}</span>
          <span className="kw-desc">missing</span>
        </div>
        <div className="kw-divider"></div>
        <div className="kw-stat">
          <span className="kw-num">{required.length}</span>
          <span className="kw-desc">required</span>
        </div>
      </div>

      <div className="keyword-groups">
        {matched.length > 0 && (
          <div className="kw-group">
            <div className="kw-group-label matched-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              Found in your resume
            </div>
            <div className="tag-list">
              {matched.map((kw, i) => (
                <span key={i} className="tag tag-matched">{kw}</span>
              ))}
            </div>
          </div>
        )}

        {missing.length > 0 && (
          <div className="kw-group">
            <div className="kw-group-label missing-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Missing — add these
            </div>
            <div className="tag-list">
              {missing.map((kw, i) => (
                <span key={i} className="tag tag-missing">{kw}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeywordSection;
