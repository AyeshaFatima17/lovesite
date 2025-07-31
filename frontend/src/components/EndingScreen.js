import React, { useState, useEffect } from 'react';
import './EndingScreen.css';

const EndingScreen = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ending-screen">
      {/* Floating Hearts Background */}
      <div className="floating-hearts-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-heart-bg"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {showMessage && (
        <div className="ending-content">
          <div className="heart-icon">💖</div>
          <h1 className="ending-title">Our Virtual Date Ends Here</h1>
          <div className="ending-message">
            <p>Thank you for this magical journey together! ✨</p>
            <p>Every moment spent with you fills my heart with joy and love.</p>
            <p>From collecting gifts to stargazing under the moonlight,</p>
            <p>this has been a perfect virtual date. 🌙⭐</p>
            <br />
            <p className="special-message">
              Until we meet again, you'll always be in my thoughts... 💕
            </p>
          </div>
          <div className="ending-decoration">
            <span className="deco-heart">💝</span>
            <span className="deco-star">⭐</span>
            <span className="deco-heart">💝</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndingScreen;