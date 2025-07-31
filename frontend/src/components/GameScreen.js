import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GameScreen.css';

const GameScreen = ({ onComplete }) => {
  const [gameObjects, setGameObjects] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const gameAreaRef = useRef(null);
  const maxScore = 20;

  const objectEmojis = ['🎁', '💝', '🌹', '💎', '🎀', '🍰', '🎈', '⭐'];

  const createGameObject = useCallback(() => {
    if (!gameActive) return;
    
    const newObject = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 50),
      y: -50,
      emoji: objectEmojis[Math.floor(Math.random() * objectEmojis.length)],
      speed: 2 + Math.random() * 3,
    };
    
    setGameObjects(prev => [...prev, newObject]);
  }, [gameActive]);

  const updateGameObjects = useCallback(() => {
    if (!gameActive) return;
    
    setGameObjects(prev => 
      prev.map(obj => ({ ...obj, y: obj.y + obj.speed }))
        .filter(obj => obj.y < window.innerHeight + 50)
    );
  }, [gameActive]);

  const handleObjectClick = useCallback((objectId, event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent default touch behavior
    
    setGameObjects(prev => prev.filter(obj => obj.id !== objectId));
    setScore(prev => {
      const newScore = prev + 1;
      const newProgress = (newScore / maxScore) * 100;
      setProgress(newProgress);
      
      if (newScore >= maxScore) {
        setGameActive(false);
        setShowCompletion(true);
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
      
      return newScore;
    });
  }, [onComplete, maxScore]);

  const handleObjectTouch = useCallback((objectId, event) => {
    handleObjectClick(objectId, event);
  }, [handleObjectClick]);

  useEffect(() => {
    if (!gameActive) return;
    
    const objectInterval = setInterval(createGameObject, 800);
    const updateInterval = setInterval(updateGameObjects, 50);
    
    return () => {
      clearInterval(objectInterval);
      clearInterval(updateInterval);
    };
  }, [gameActive, createGameObject, updateGameObjects]);

  return (
    <div className="game-screen" ref={gameAreaRef}>
      {/* Game UI */}
      <div className="game-ui">
        <div className="score">Score: {score}/{maxScore}</div>
        <div className="progress-container">
          <div className="progress-label">Heart Fill Progress</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Falling Objects */}
      {gameObjects.map(obj => (
        <div
          key={obj.id}
          className="game-object"
          style={{ left: obj.x, top: obj.y }}
          onClick={(e) => handleObjectClick(obj.id, e)}
          onTouchStart={(e) => handleObjectTouch(obj.id, e)}
          onTouchEnd={(e) => e.preventDefault()}
        >
          {obj.emoji}
        </div>
      ))}

      {/* Game Instructions */}
      {gameObjects.length < 3 && gameActive && (
        <div className="game-instructions">
          <p>Tap the falling objects to fill the heart! ❤️</p>
        </div>
      )}

      {/* Completion Message */}
      {showCompletion && (
        <div className="completion-message">
          <h2>That was great time collecting gifts!</h2>
          <p>You filled my heart with joy! ❤️</p>
          <div className="completion-heart">💖</div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;