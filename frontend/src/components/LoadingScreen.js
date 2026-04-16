import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const STEPS = [
  { label: 'Parsing resume content...', icon: '📄', duration: 2000 },
  { label: 'Extracting skills & experience...', icon: '🔍', duration: 4000 },
  { label: 'Scoring ATS compatibility...', icon: '⚡', duration: 4000 },
  { label: 'Identifying keyword gaps...', icon: '🎯', duration: 3000 },
  { label: 'Generating improvement suggestions...', icon: '✨', duration: 4000 },
  { label: 'Finalizing report...', icon: '📊', duration: 2000 },
];

function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    const advance = () => {
      stepIndex++;
      if (stepIndex < STEPS.length) {
        setCurrentStep(stepIndex);
        setTimeout(advance, STEPS[stepIndex].duration);
      }
    };
    setTimeout(advance, STEPS[0].duration);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-inner">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring spinner-ring-2"></div>
          <div className="spinner-dot"></div>
        </div>

        <h2 className="loading-title">Analyzing Your Resume</h2>
        <p className="loading-subtitle">Running 3 AI prompt chains in sequence...</p>

        <div className="steps-list">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`step-item ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''} ${i > currentStep ? 'pending' : ''}`}
            >
              <div className="step-indicator">
                {i < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : i === currentStep ? (
                  <div className="step-pulse"></div>
                ) : (
                  <div className="step-empty"></div>
                )}
              </div>
              <span className="step-icon">{step.icon}</span>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="loading-timer">
          <span className="timer-label">Elapsed</span>
          <span className="timer-value">{elapsed}s</span>
          <span className="timer-est">· Usually takes 20–40 seconds</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
