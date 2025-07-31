import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onStart }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleStartClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      onStart();
    }, 2000);
  };

  return (
    <div className="landing-page">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="content">
        {!showMessage ? (
          <>
            <h1 className="title">Welcome to Our Love Story</h1>
            <p className="subtitle">A magical journey awaits us</p>
            <button className="start-btn" onClick={handleStartClick}>
              Let's Start ❤️
            </button>
          </>
        ) : (
          <div className="gift-time-message">
            <h2>Gift Time! 🎁</h2>
            <p>Get ready for some magical moments...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;