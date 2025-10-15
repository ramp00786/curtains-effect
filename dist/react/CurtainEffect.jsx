/**
 * React Curtain Effect Component
 * Author: Tulsiram Kushwah
 * LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
 * Facebook: https://www.facebook.com/ramp00786
 * 
 * A React component for beautiful curtain opening animations
 * with full lifecycle management and proper cleanup.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CurtainEffect.css';

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
    sparkle.className = 'curtain-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
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

  return (
    <div 
      ref={curtainRef}
      className={`curtain-container curtain-theme-${theme} ${isAnimating ? 'opening' : ''} ${className}`}
      style={style}
    >
      {/* Left Curtain Panel */}
      <div 
        className="curtain-panel curtain-left"
        style={leftCurtainImage ? { backgroundImage: `url(${leftCurtainImage})` } : {}}
      />
      
      {/* Right Curtain Panel */}
      <div 
        className="curtain-panel curtain-right"
        style={rightCurtainImage ? { backgroundImage: `url(${rightCurtainImage})` } : {}}
      />
      
      {/* Curtain Content */}
      <div className="curtain-content">
        <div className="curtain-text">
          <h1 className="curtain-title">{title}</h1>
          <p className="curtain-subtitle">{subtitle}</p>
        </div>
        <button 
          className="curtain-button"
          onClick={handleOpen}
          disabled={isAnimating}
        >
          <i className="fas fa-play"></i>
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
  );
});

// Add display name for debugging
CurtainEffect.displayName = 'CurtainEffect';

// PropTypes are now handled by TypeScript definitions

export default CurtainEffect;