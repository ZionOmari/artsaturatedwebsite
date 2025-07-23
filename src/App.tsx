import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import SaturateEffect from './components/SaturateEffect';

// --- Main App ---
const App: React.FC = () => {
  const [isSaturated, setIsSaturated] = useState(false);
  const [isScreenClear, setIsScreenClear] = useState(false);
  const [shouldResetFog, setShouldResetFog] = useState(false);

  const handleSaturateToggle = () => {
    if (isSaturated && isScreenClear) {
      // If currently saturated and screen is clear, unsaturate and reset fog
      setIsSaturated(false);
      setShouldResetFog(true);
      setTimeout(() => setShouldResetFog(false), 100); // Reset the flag
    } else {
      // Normal toggle
      setIsSaturated(!isSaturated);
    }
  };

  return (
    <Router>
      {/* Layer 1: Background - black initially, colorful when saturated (z-index: 0) */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: isSaturated 
          ? 'linear-gradient(135deg, #FF6B6B, #FFA500, #FFD93D, #FF69B4, #9B59B6, #3498DB)'
          : 'linear-gradient(135deg, #2a2a2a, #3a3a3a, #4a4a4a, #3a3a3a, #2a2a2a, #1a1a1a)',
        backgroundSize: '400% 400%',
        animation: isSaturated ? 'gradientShift 20s ease infinite' : 'none',
        transition: 'background 0.5s ease',
        zIndex: 0
      }} />
      
      {/* Layer 2: Interactive fog effect (z-index: 10) */}
      <SaturateEffect 
        isActive={isSaturated} 
        onScreenClearChange={setIsScreenClear}
        shouldReset={shouldResetFog}
      />
      
      {/* Layer 3: All content - text and UI only (z-index: 20) */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                isSaturated={isSaturated}
                onSaturateToggle={handleSaturateToggle}
                isScreenClear={isScreenClear}
              />
            } 
          />
          <Route 
            path="/shop" 
            element={
              <Shop isSaturated={isSaturated} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 