import React from 'react';
import './ResumeInfo.css';

function Tag({ children, color }) {
  return (
    <span className="info-tag" style={{
      color: color || 'var(--accent-primary)',
      background: (color || 'var(--accent-primary)') + '11',
      borderColor: (color || 'var(--accent-primary)') + '33'
    }}>
      {children}
    </span>
  );
}

function InfoRow({ label, value, children }) {
  if (!value && !children) return null;
  return (
    <div className="info-row">
      <div className="info-label">{label}</div>
      <div className="info-value">
        {children || value}
      </div>
    </div>
  );
}

function ResumeInfo({ info }) {
  if (!info) return null;

  return (
    <div className="resume-info">
      <div className="info-card">
        <div className="info-card-header">
          <div className="candidate-avatar">
            {(info.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="candidate-name">{info.name || 'Unknown'}</div>
            <div className="candidate-meta">
              {info.email && <span>{info.email}</span>}
              {info.phone && <span>{info.phone}</span>}
            </div>
          </div>
        </div>

        <div className="info-rows">
          <InfoRow label="Experience">
            <span className="exp-badge">
              {info.experience_years > 0 ? `~${info.experience_years} years` : 'Not specified'}
            </span>
          </InfoRow>

          {info.skills?.length > 0 && (
            <InfoRow label="Skills">
              <div className="tag-list">
                {info.skills.slice(0, 20).map((s, i) => (
                  <Tag key={i} color="var(--accent-primary)">{s}</Tag>
                ))}
                {info.skills.length > 20 && (
                  <Tag color="var(--text-muted)">+{info.skills.length - 20} more</Tag>
                )}
              </div>
            </InfoRow>
          )}

          {info.job_titles?.length > 0 && (
            <InfoRow label="Job Titles">
              <div className="tag-list">
                {info.job_titles.map((t, i) => (
                  <Tag key={i} color="var(--accent-secondary)">{t}</Tag>
                ))}
              </div>
            </InfoRow>
          )}

          {info.companies?.length > 0 && (
            <InfoRow label="Companies">
              <div className="tag-list">
                {info.companies.map((c, i) => (
                  <Tag key={i} color="var(--accent-warm)">{c}</Tag>
                ))}
              </div>
            </InfoRow>
          )}

          {info.education?.length > 0 && (
            <InfoRow label="Education">
              <div className="edu-list">
                {info.education.map((e, i) => (
                  <div key={i} className="edu-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                    {e}
                  </div>
                ))}
              </div>
            </InfoRow>
          )}

          {info.certifications?.length > 0 && (
            <InfoRow label="Certifications">
              <div className="tag-list">
                {info.certifications.map((c, i) => (
                  <Tag key={i} color="#a78bfa">{c}</Tag>
                ))}
              </div>
            </InfoRow>
          )}

          {info.sections_present?.length > 0 && (
            <InfoRow label="Sections Detected">
              <div className="tag-list">
                {info.sections_present.map((s, i) => (
                  <Tag key={i} color="var(--accent-success)">{s}</Tag>
                ))}
              </div>
            </InfoRow>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeInfo;
