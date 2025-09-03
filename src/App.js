// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import chaosTrack from './bgmusic.mp3';

const App = () => {
  console.log("🚀 App component loaded!");
  
  const [isTransformed, setIsTransformed] = useState(false);
  const [showGlitter, setShowGlitter] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);
  const animationRef = useRef();

  const buttonTexts = [
    "SHOWER 🚿", "XBOX ❌", "PHILOSOPE 💥", "SILKSONG 🧵",
    "NINTENDO 🎮", "EPIC 🚀", "DISCORD 💬", "TWITCH 🎥",
    "YOUTUBE 📺", "SPOTIFY 🎵", "CLANKER NUDES 🤖", "TWITTER (KYS) 🐦",
    "END IT ALL", "🪢🪢🪢", "SILKSNITY 🌪️", "WADAHELLY ⚡",
    "TURKEY 🇹🇷", "MATCHA AHH 🟩🟩", "NO BALLS", "10 YEARS IN THE JOINT"
  ];

  // Function to start audio
const startAudio = async () => {
  const el = audioRef.current;
  if (!el || audioStarted) return;
  try {
    el.volume = 0.5;
    await el.play();
    setAudioStarted(true);
    console.log("Audio started successfully!");
  } catch (error) {
    console.log("Audio play failed:", error);
    alert("Click anywhere on the page to enable background music!");
  }
};


  useEffect(() => {
    if (isTransformed) {
      setShowGlitter(true);
      
      // Initialize bouncing buttons
      const initialButtons = buttonTexts.map((text, index) => ({
        id: index,
        text,
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 60),
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        scale: 0.8 + Math.random() * 0.4,
        hue: Math.random() * 360
      }));
      setButtons(initialButtons);

      // Start audio
      startAudio();

      // Start animation loop
      const animate = () => {
        setButtons(prevButtons =>
          prevButtons.map(button => {
            let newX = button.x + button.vx;
            let newY = button.y + button.vy;
            let newVx = button.vx;
            let newVy = button.vy;

            // Bounce off walls with some padding
            if (newX <= 0 || newX >= window.innerWidth - 200) {
              newVx = -newVx * 0.9; // Add some dampening
              newX = Math.max(0, Math.min(window.innerWidth - 200, newX));
            }
            if (newY <= 0 || newY >= window.innerHeight - 60) {
              newVy = -newVy * 0.9;
              newY = Math.max(0, Math.min(window.innerHeight - 60, newY));
            }

            return {
              ...button,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              rotation: button.rotation + button.rotationSpeed,
              hue: (button.hue + 2) % 360
            };
          })
        );
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTransformed]);

  // Add click handler for the entire document to start audio
  useEffect(() => {
    const handleFirstClick = () => {
      if (isTransformed && !audioStarted) {
        startAudio();
      }
    };

    document.addEventListener('click', handleFirstClick, { once: true });
    
    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, [isTransformed, audioStarted]);

  const handleMangoClick = () => {
    startAudio();
    setIsTransformed(true);
};

  const redirectToSteam = () => {
    // Also try to start audio when clicking buttons
    if (!audioStarted) {
      startAudio();
    }
    window.open('https://steamcommunity.com/id/Despairgodlove/', '_blank');
  };

  // Generate glitter particles
  const glitterParticles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 4,
    size: 2 + Math.random() * 6
  }));

  // Floating chaos elements
  const chaosElements = [
    { emoji: "🦄", size: "chaos-text-9xl", position: "chaos-pos-1" },
    { emoji: "🌟", size: "chaos-text-8xl", position: "chaos-pos-2" },
    { emoji: "💎", size: "chaos-text-7xl", position: "chaos-pos-3" },
    { emoji: "🎈", size: "chaos-text-6xl", position: "chaos-pos-4" },
    { emoji: "🎪", size: "chaos-text-8xl", position: "chaos-pos-5" },
    { emoji: "🎭", size: "chaos-text-7xl", position: "chaos-pos-6" },
    { emoji: "🚀", size: "chaos-text-9xl", position: "chaos-pos-7" },
    { emoji: "⚡", size: "chaos-text-8xl", position: "chaos-pos-8" },
    { emoji: "🔥", size: "chaos-text-7xl", position: "chaos-pos-9" },
    { emoji: "❄️", size: "chaos-text-6xl", position: "chaos-pos-10" },
    { emoji: "🌊", size: "chaos-text-8xl", position: "chaos-pos-11" },
    { emoji: "💫", size: "chaos-text-7xl", position: "chaos-pos-12" }
  ];

  const MangoScreen = (
    <div className="professional-container">
        <div
          onClick={handleMangoClick}
          className="mango-logo"
        >
          <svg width="120" height="150" viewBox="0 0 120 150" className="mango-svg">
            <path
              d="M60 20 C40 20, 20 40, 20 70 C20 100, 30 120, 50 135 C55 140, 65 140, 70 135 C90 120, 100 100, 100 70 C100 40, 80 20, 60 20 Z"
              fill="url(#mangoGradient)"
              stroke="#FF6B35"
              strokeWidth="2"
            />
            <path
              d="M60 20 Q65 10, 75 15 Q70 20, 60 20"
              fill="#4CAF50"
            />
            <defs>
              <linearGradient id="mangoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8C42" />
                <stop offset="50%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#E63946" />
              </linearGradient>
            </defs>
          </svg>
        </div>
     </div>
  );

  return (
    <>
      {/* Hidden audio element available regardless of screen */}
      <audio
        ref={audioRef}
        src={chaosTrack}
        preload="auto"
        loop
        style={{ display: 'none' }}
      />
      {!isTransformed ? (
        MangoScreen
      ) : (
        <div className="chaos-container">
      {/* Audio control button (only shows if audio fails to start from mango click) */}
      {!audioStarted && (
        <button 
          onClick={startAudio}
          className="audio-control-btn"
        >
          🎵 CLICK FOR CHAOS MUSIC! 🎵
        </button>
      )}

      {/* Intense glitter overlay */}
      {showGlitter && (
        <div className="glitter-container">
          {glitterParticles.map(particle => (
            <div
              key={particle.id}
              className="glitter-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Rainbow border */}
      <div className="rainbow-border" />

      {/* Floating chaos elements */}
      {chaosElements.map((element, index) => (
        <div
          key={index}
          className={`chaos-element ${element.size} ${element.position}`}
          style={{
            animationDelay: `${index * 0.2}s`
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Bouncing buttons */}
      {buttons.map(button => (
        <button
          key={button.id}
          onClick={redirectToSteam}
          className="bouncing-button"
          style={{
            left: `${button.x}px`,
            top: `${button.y}px`,
            transform: `rotate(${button.rotation}deg) scale(${button.scale})`,
            background: `linear-gradient(45deg, hsl(${button.hue}, 100%, 50%), hsl(${(button.hue + 60) % 360}, 100%, 50%))`,
            boxShadow: `0 0 20px hsl(${button.hue}, 100%, 50%)`,
          }}
        >
          {button.text}
        </button>
      ))}

      {/* Screaming text */}
      <div className="chaos-text chaos-text-1">MANGOOO</div>
      <div className="chaos-text chaos-text-2">MUSTARD</div>
      <div className="chaos-text chaos-text-3">SILKSANITY</div>
      <div className="chaos-text chaos-text-4">SEPTEMBER 4TH</div>
      <div className="chaos-text chaos-text-5">RETARDATION</div>
      <div className="chaos-text chaos-text-6">LFGGGG</div>

      {/* Background overlays */}
      <div className="bg-overlay bg-overlay-1" />
      <div className="bg-overlay bg-overlay-2" />
      <div className="bg-overlay bg-overlay-3" />
        </div>
      )}
    </>
  );
};

export default App;