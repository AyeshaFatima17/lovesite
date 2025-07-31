import React, { useState, useEffect } from 'react';
import './StargazingScene.css';

const StargazingScene = ({ onEndDate }) => {
  const [showShootingStar, setShowShootingStar] = useState(false);
  const [showShootingText, setShowShootingText] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);

  useEffect(() => {
    // Show shooting star after 2 seconds
    const shootingStarTimer = setTimeout(() => {
      setShowShootingStar(true);
      
      // Show text after shooting star animation
      setTimeout(() => {
        setShowShootingText(true);
        
        // Show end button after text
        setTimeout(() => {
          setShowEndButton(true);
        }, 3000);
      }, 2000);
    }, 2000);

    return () => clearTimeout(shootingStarTimer);
  }, []);

  return (
    <div className="stargazing-scene">
      {/* Moon */}
      <div className="moon"></div>
      
      {/* Stars */}
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Shooting Star */}
      {showShootingStar && (
        <div className="shooting-star"></div>
      )}

      {/* Shooting Star Text */}
      {showShootingText && (
        <div className="shooting-text">
          <h2>Oh wow! A shooting star! ⭐</h2>
          <p>Let's make a wish together...</p>
        </div>
      )}

      {/* End Date Button */}
      {showEndButton && (
        <div className="end-button-container">
          <button className="end-date-btn" onClick={onEndDate}>
            Wanna End Date? ❤️
          </button>
        </div>
      )}
    </div>
  );
};

export default StargazingScene;