/**
 * React Curtain Effect Component - Standalone Version
 * Author: Tulsiram Kushwah
 * LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
 * Facebook: https://www.facebook.com/ramp00786
 * 
 * This version includes inline styles to avoid CSS import issues with Vite
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

const curtainStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10000,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  panel: {
    position: 'absolute',
    top: 0,
    width: '50%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform var(--speed, 2s) cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    zIndex: 2
  },
  leftPanel: {
    left: 0,
    transformOrigin: 'left center'
  },
  rightPanel: {
    right: 0,
    transformOrigin: 'right center'
  },
  content: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    color: 'white',
    padding: '2rem',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  title: {
    fontSize: '3rem',
    margin: '0 0 1rem 0',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    animation: 'glow 2s ease-in-out infinite alternate'
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '0 0 2rem 0',
    opacity: 0.9
  },
  button: {
    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
    color: '#000',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 auto'
  },
  sparkle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#FFD700',
    borderRadius: '50%',
    animation: 'sparkle linear forwards',
    pointerEvents: 'none'
  }
};

const themes = {
  default: 'linear-gradient(135deg, #8B0000, #DC143C)',
  royal: 'linear-gradient(135deg, #4B0082, #8A2BE2)', 
  elegant: 'linear-gradient(135deg, #2F4F4F, #708090)',
  gold: 'linear-gradient(135deg, #DAA520, #FFD700)',
  saffron: 'linear-gradient(135deg, #FF8C00, #FFA500)'
};

const CurtainEffect = React.forwardRef(({
  title = "Welcome",
  subtitle = "Click to Enter", 
  buttonText = "Open Curtains",
  theme = "default",
  speed = 2000,
  autoOpen = false,
  autoOpenDelay = 5000,
  sparkles = true,
  sound = false,
  leftCurtainImage = "",
  rightCurtainImage = "",
  onOpen = null,
  onComplete = null,
  className = "",
  style = {},
  children
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const curtainRef = useRef(null);
  const audioRef = useRef(null);
  const sparkleIntervalRef = useRef(null);
  const autoOpenTimeoutRef = useRef(null);

  // Create sparkle particles
  const createSparkles = useCallback(() => {
    if (!sparkles || !curtainRef.current) return;
    
    const container = curtainRef.current;
    const sparkle = document.createElement('div');
    
    Object.assign(sparkle.style, {
      ...curtainStyles.sparkle,
      left: Math.random() * 100 + '%',
      animationDuration: (Math.random() * 3 + 2) + 's'
    });
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 5000);
  }, [sparkles]);

  // Handle curtain opening
  const handleOpen = useCallback(() => {
    if (isAnimating || isOpen) return;
    
    setIsAnimating(true);
    onOpen && onOpen();
    
    // Play sound if enabled
    if (sound && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Start sparkle animation
    if (sparkles) {
      sparkleIntervalRef.current = setInterval(createSparkles, 200);
    }
    
    // Apply opening animation
    const leftPanel = curtainRef.current?.querySelector('.curtain-left');
    const rightPanel = curtainRef.current?.querySelector('.curtain-right');
    
    if (leftPanel && rightPanel) {
      leftPanel.style.transform = 'translateX(-100%) rotateY(-15deg)';
      rightPanel.style.transform = 'translateX(100%) rotateY(15deg)';
    }
    
    // Complete animation
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
      
      // Stop sparkles
      if (sparkleIntervalRef.current) {
        clearInterval(sparkleIntervalRef.current);
        sparkleIntervalRef.current = null;
      }
      
      onComplete && onComplete();
    }, speed);
  }, [isAnimating, isOpen, onOpen, onComplete, sound, sparkles, speed, createSparkles]);

  // Auto-open effect
  useEffect(() => {
    if (autoOpen && !isOpen && !isAnimating) {
      autoOpenTimeoutRef.current = setTimeout(handleOpen, autoOpenDelay);
    }
    
    return () => {
      if (autoOpenTimeoutRef.current) {
        clearTimeout(autoOpenTimeoutRef.current);
        autoOpenTimeoutRef.current = null;
      }
    };
  }, [autoOpen, autoOpenDelay, handleOpen, isOpen, isAnimating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sparkleIntervalRef.current) {
        clearInterval(sparkleIntervalRef.current);
      }
      if (autoOpenTimeoutRef.current) {
        clearTimeout(autoOpenTimeoutRef.current);
      }
    };
  }, []);

  // Reset function for external control
  const reset = useCallback(() => {
    setIsOpen(false);
    setIsAnimating(false);
    if (sparkleIntervalRef.current) {
      clearInterval(sparkleIntervalRef.current);
      sparkleIntervalRef.current = null;
    }
    if (autoOpenTimeoutRef.current) {
      clearTimeout(autoOpenTimeoutRef.current);
      autoOpenTimeoutRef.current = null;
    }
  }, []);

  // Expose methods via imperative handle
  React.useImperativeHandle(ref, () => ({
    open: handleOpen,
    reset,
    isOpen,
    isAnimating
  }), [handleOpen, reset, isOpen, isAnimating]);

  // Don't render if curtains are open
  if (isOpen) {
    return children || null;
  }

  const containerStyle = {
    ...curtainStyles.container,
    '--speed': speed + 'ms',
    ...style
  };

  const leftPanelStyle = {
    ...curtainStyles.panel,
    ...curtainStyles.leftPanel,
    background: leftCurtainImage ? `url(${leftCurtainImage})` : themes[theme] || themes.default,
    backgroundSize: leftCurtainImage ? 'cover' : 'initial',
    backgroundPosition: leftCurtainImage ? 'center' : 'initial'
  };

  const rightPanelStyle = {
    ...curtainStyles.panel,
    ...curtainStyles.rightPanel,
    background: rightCurtainImage ? `url(${rightCurtainImage})` : themes[theme] || themes.default,
    backgroundSize: rightCurtainImage ? 'cover' : 'initial',
    backgroundPosition: rightCurtainImage ? 'center' : 'initial'
  };

  const buttonStyle = {
    ...curtainStyles.button,
    opacity: isAnimating ? 0.6 : 1,
    cursor: isAnimating ? 'not-allowed' : 'pointer'
  };

  return (
    <>
      <style>{`
        @keyframes glow {
          from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.3); }
          to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.6); }
        }
        
        @keyframes sparkle {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) scale(1);
          }
          100% {
            transform: translateY(-10vh) scale(0);
            opacity: 0;
          }
        }
        
        @media (max-width: 768px) {
          .curtain-title-mobile {
            font-size: 2rem !important;
          }
          
          .curtain-content-mobile {
            padding: 1.5rem !important;
          }
          
          .curtain-button-mobile {
            padding: 0.8rem 1.5rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
      
      <div 
        ref={curtainRef}
        className={`curtain-container ${className}`}
        style={containerStyle}
      >
        {/* Left Curtain Panel */}
        <div 
          className="curtain-left"
          style={leftPanelStyle}
        />
        
        {/* Right Curtain Panel */}
        <div 
          className="curtain-right"
          style={rightPanelStyle}
        />
        
        {/* Curtain Content */}
        <div style={curtainStyles.content} className="curtain-content-mobile">
          <div>
            <h1 style={curtainStyles.title} className="curtain-title-mobile">{title}</h1>
            <p style={curtainStyles.subtitle}>{subtitle}</p>
          </div>
          <button 
            style={buttonStyle}
            className="curtain-button-mobile"
            onClick={handleOpen}
            disabled={isAnimating}
          >
            <span>▶</span>
            {buttonText}
          </button>
        </div>
        
        {/* Audio element for sound effects */}
        {sound && (
          <audio ref={audioRef} preload="auto">
            <source src="/curtain-assets/sounds/clapping.wav" type="audio/wav" />
            <source src="/curtain-assets/sounds/fanfare.wav" type="audio/wav" />
          </audio>
        )}
      </div>
    </>
  );
});

// Add display name for debugging
CurtainEffect.displayName = 'CurtainEffect';

export default CurtainEffect;