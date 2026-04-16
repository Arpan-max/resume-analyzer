import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './UploadSection.css';

function UploadSection({ onLoading, onSuccess, onError, error }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jdCharCount, setJdCharCount] = useState(0);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      onError('Invalid file type. Please upload PDF, DOCX, or TXT files only.');
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false
  });

  const handleJdChange = (e) => {
    setJobDescription(e.target.value);
    setJdCharCount(e.target.value.length);
  };

  const handleSubmit = async () => {
    if (!file) { onError('Please upload your resume file.'); return; }
    if (jobDescription.trim().length < 50) { onError('Please enter a job description (min 50 characters).'); return; }

    onLoading();
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      const res = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 90000
      });

      onSuccess(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Analysis failed. Please try again.';
      onError(msg);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="upload-section">
      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          AI-Powered Analysis
        </div>
        <h1 className="hero-title">
          Score your resume against<br />
          <span className="highlight">any job description</span>
        </h1>
        <p className="hero-subtitle">
          Upload your resume, paste the job description, and get instant ATS scoring,
          keyword gap analysis, and tailored improvement suggestions.
        </p>
        <div className="hero-stats">
          <div className="stat"><span>3</span> AI Prompt Chains</div>
          <div className="stat-sep">·</div>
          <div className="stat"><span>100%</span> Free</div>
          <div className="stat-sep">·</div>
          <div className="stat"><span>30s</span> Analysis</div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="upload-form">
        {/* Drop Zone */}
        <div className="form-section">
          <label className="form-label">
            <span className="label-num">01</span>
            Upload Resume
          </label>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="file-preview">
                <div className="file-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{formatFileSize(file.size)}</div>
                </div>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="dropzone-content">
                <div className="drop-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <p className="drop-main">
                  {isDragActive ? 'Drop it here!' : 'Drag & drop your resume'}
                </p>
                <p className="drop-sub">or <span>browse to choose</span> · PDF, DOCX, TXT · Max 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="form-section">
          <label className="form-label">
            <span className="label-num">02</span>
            Job Description
            <span className="char-count">{jdCharCount} chars</span>
          </label>
          <textarea
            className="jd-textarea"
            placeholder="Paste the full job description here — the more detail you include, the more accurate the ATS matching will be..."
            value={jobDescription}
            onChange={handleJdChange}
            rows={10}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          className="btn-analyze"
          onClick={handleSubmit}
          disabled={!file || jobDescription.trim().length < 50}
        >
          <span>Analyze Resume</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <p className="submit-note">Powered by Claude AI · Your data is not stored</p>
      </div>
    </div>
  );
}

export default UploadSection;
