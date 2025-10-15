/**
 * Simple React usage example
 */
import React, { useState } from 'react';
import CurtainEffect from 'curtain-opening-effect/react';

function App() {
  const [showCurtain, setShowCurtain] = useState(true);

  const handleComplete = () => {
    console.log('Curtain animation completed!');
  };

  const resetCurtain = () => {
    setShowCurtain(true);
  };

  if (!showCurtain) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome! The curtains have opened!</h1>
        <p>Your main application content goes here.</p>
        <button onClick={resetCurtain}>Show Curtain Again</button>
      </div>
    );
  }

  return (
    <CurtainEffect
      title="Welcome to My App"
      subtitle="Click to enter"
      buttonText="Open Curtains"
      theme="gold"
      speed={2000}
      sparkles={true}
      onComplete={() => {
        handleComplete();
        setShowCurtain(false);
      }}
    />
  );
}

export default App;