import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import StargazingScene from './components/StargazingScene';
import EndingScreen from './components/EndingScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleStartGame = () => {
    setShowCountdown(true);
    
    // Countdown animation
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          setShowCountdown(false);
          setCurrentScreen('game');
        }, 1000);
      }
    }, 1000);
  };

  const handleGameComplete = () => {
    setCurrentScreen('stargazing-question');
  };

  const handleStartStargazing = () => {
    setCurrentScreen('stargazing');
  };

  const handleEndDate = () => {
    setCurrentScreen('ending');
  };

  const renderScreen = () => {
    if (showCountdown) {
      return (
        <div className="countdown-screen">
          <div className="countdown-number">{countdown}</div>
          {countdown === 0 && <div className="countdown-text">Let's Go!</div>}
        </div>
      );
    }

    switch (currentScreen) {
      case 'landing':
        return <LandingPage onStart={handleStartGame} />;
      case 'game':
        return <GameScreen onComplete={handleGameComplete} />;
      case 'stargazing-question':
        return (
          <div className="stargazing-question">
            <h2 className="question-text">Wanna do stargazing together?</h2>
            <div className="question-buttons">
              <button className="yes-btn" onClick={handleStartStargazing}>
                Yes ❤️
              </button>
              <button className="no-btn">
                No
              </button>
            </div>
          </div>
        );
      case 'stargazing':
        return <StargazingScene onEndDate={handleEndDate} />;
      case 'ending':
        return <EndingScreen />;
      default:
        return <LandingPage onStart={handleStartGame} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;