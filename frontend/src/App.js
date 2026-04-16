import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [step, setStep] = useState('upload'); // upload | loading | results
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalysis = (data) => {
    setResults(data);
    setStep('results');
  };

  const handleLoading = () => {
    setStep('loading');
    setError(null);
  };

  const handleError = (msg) => {
    setError(msg);
    setStep('upload');
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setStep('upload');
  };

  return (
    <div className="app">
      <Header onReset={step === 'results' ? handleReset : null} />
      <main className="app-main">
        <div className="app-container">
          {step === 'upload' && (
            <UploadSection
              onLoading={handleLoading}
              onSuccess={handleAnalysis}
              onError={handleError}
              error={error}
            />
          )}
          {step === 'loading' && <LoadingScreen />}
          {step === 'results' && results && (
            <ResultsDashboard data={results} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
