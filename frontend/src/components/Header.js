import React from 'react';
import './Header.css';

function Header({ onReset }) {
  return (
    <header className="header">
      <div className="app-container header-inner">
        <div className="logo" onClick={onReset} style={{ cursor: onReset ? 'pointer' : 'default' }}>
          <div className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="8" height="8" rx="1.5" fill="var(--accent-primary)" />
              <rect x="13" y="1" width="8" height="8" rx="1.5" fill="var(--accent-secondary)" opacity="0.7" />
              <rect x="1" y="13" width="8" height="8" rx="1.5" fill="var(--accent-secondary)" opacity="0.5" />
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="var(--accent-primary)" opacity="0.4" />
            </svg>
          </div>
          <span className="logo-text">Resume<span>AI</span></span>
        </div>

        <nav className="header-nav">
          <span className="nav-badge">Free Tool</span>
          {onReset && (
            <button className="btn-new-analysis" onClick={onReset}>
              ← New Analysis
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
