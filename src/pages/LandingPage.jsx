import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1>RetroVest</h1>
        <p>⏳ Time Travel Through Markets. Invest Smart. Learn From History.</p>
        <button onClick={() => navigate('/time-machine')}>
          Enter the Time Machine
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
