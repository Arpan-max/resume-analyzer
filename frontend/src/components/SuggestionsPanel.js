import React, { useState } from 'react';
import './SuggestionsPanel.css';

const SECTIONS = [
  {
    key: 'summary_suggestions',
    label: 'Professional Summary',
    icon: '👤',
    color: 'var(--accent-primary)'
  },
  {
    key: 'skills_suggestions',
    label: 'Skills Section',
    icon: '⚡',
    color: 'var(--accent-secondary)'
  },
  {
    key: 'experience_suggestions',
    label: 'Work Experience',
    icon: '💼',
    color: 'var(--accent-warm)'
  },
  {
    key: 'format_suggestions',
    label: 'Resume Format',
    icon: '📐',
    color: '#a78bfa'
  },
  {
    key: 'keyword_suggestions',
    label: 'Keyword Integration',
    icon: '🎯',
    color: 'var(--accent-success)'
  },
];

function SuggestionsPanel({ improvements, compact }) {
  const [openSection, setOpenSection] = useState(compact ? null : 'summary_suggestions');

  const toggle = (key) => {
    setOpenSection(prev => prev === key ? null : key);
  };

  return (
    <div className={`suggestions-panel ${compact ? 'compact' : ''}`}>
      <div className="section-header">
        <h3 className="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Improvement Suggestions
        </h3>
        <span className="suggestion-count">
          {SECTIONS.reduce((acc, s) => acc + (improvements[s.key]?.length || 0), 0)} tips
        </span>
      </div>

      <div className="accordion">
        {SECTIONS.map(({ key, label, icon, color }) => {
          const items = improvements[key] || [];
          if (items.length === 0) return null;
          const isOpen = openSection === key;

          return (
            <div key={key} className={`accordion-item ${isOpen ? 'open' : ''}`}>
              <button
                className="accordion-trigger"
                onClick={() => toggle(key)}
              >
                <div className="trigger-left">
                  <span className="trigger-icon">{icon}</span>
                  <span className="trigger-label">{label}</span>
                  <span className="trigger-badge" style={{ color, borderColor: color + '33', background: color + '11' }}>
                    {items.length}
                  </span>
                </div>
                <svg
                  className={`trigger-chevron ${isOpen ? 'rotated' : ''}`}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </button>

              {isOpen && (
                <div className="accordion-body">
                  {items.map((item, i) => (
                    <div key={i} className="suggestion-item">
                      <div className="suggestion-bullet" style={{ background: color }}></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SuggestionsPanel;
