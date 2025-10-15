/**
 * React Curtain Effect - Main Export
 * Author: Tulsiram Kushwah
 * LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
 * Facebook: https://www.facebook.com/ramp00786
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import CurtainEffect from './CurtainEffectStandalone.jsx';

// This version includes inline styles to avoid CSS import issues with Vite
// For custom styling, you can still import the CSS separately:
// import 'curtain-opening-effect/react/css';

/**
 * Custom hook for curtain effect control
 */
export const useCurtainEffect = (options = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const open = useCallback(() => {
    if (!isAnimating && !isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(true);
        setIsAnimating(false);
        options.onComplete && options.onComplete();
      }, options.speed || 2000);
    }
  }, [isAnimating, isOpen, options]);
  
  const reset = useCallback(() => {
    setIsOpen(false);
    setIsAnimating(false);
  }, []);
  
  return {
    isOpen,
    isAnimating,
    open,
    reset
  };
};

/**
 * Higher-order component for wrapping pages with curtain effect
 */
export const withCurtainEffect = (WrappedComponent, curtainProps = {}) => {
  return function CurtainWrappedComponent(props) {
    const [showContent, setShowContent] = useState(false);
    
    const handleComplete = () => {
      setShowContent(true);
      curtainProps.onComplete && curtainProps.onComplete();
    };
    
    if (showContent) {
      return React.createElement(WrappedComponent, props);
    }
    
    return React.createElement(CurtainEffect, {
      ...curtainProps,
      onComplete: handleComplete
    });
  };
};

// Named exports
export { CurtainEffect };

// Default export
export default CurtainEffect;