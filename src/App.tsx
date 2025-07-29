import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';

const App: React.FC = () => {
  const [isSaturated, setIsSaturated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const clearedAreasRef = useRef<Array<{x: number, y: number, time: number, size: number}>>([]);

  const handleSaturateToggle = () => {
    setIsSaturated(!isSaturated);
    if (!isSaturated) {
      // Reset cleared areas when starting
      clearedAreasRef.current = [];
    }
  };

  // Initialize canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fill with grayscale gradient (same as CSS)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#808080');
      gradient.addColorStop(0.5, '#A0A0A0');
      gradient.addColorStop(1, '#C0C0C0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Handle mouse movement to clear grayscale with fluid effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isSaturated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentTime = Date.now();

    // Create fluid ripple effect
    const time = currentTime * 0.01;
    const brushSize = 20;
    
    // Create multiple overlapping circles for fluid texture
    for (let i = 0; i < 3; i++) {
      const offset = Math.sin(time + i * 2) * 10;
      const size = brushSize + Math.sin(time * 2 + i) * 20;
      
      const gradient = ctx.createRadialGradient(
        x + offset, y + offset, 0, 
        x + offset, y + offset, size
      );
      
      // Fluid-like gradient with varying opacity
      const opacity = 0.7 + Math.sin(time + i) * 0.2;
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.2, `rgba(255, 255, 255, ${opacity * 0.8})`);
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.5})`);
      gradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.3})`);
      gradient.addColorStop(0.8, `rgba(255, 255, 255, ${opacity * 0.1})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      // Clear area with fluid effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x + offset, y + offset, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Track this cleared area for expansion
    clearedAreasRef.current.push({
      x: x,
      y: y,
      time: currentTime,
      size: brushSize
    });
    
    ctx.globalCompositeOperation = 'source-over';
  }, [isSaturated]);

  // Animation loop for smooth clearing and expansion
  const animate = useCallback(() => {
    if (isSaturated) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentTime = Date.now();
      
      // Expand existing cleared areas
      clearedAreasRef.current.forEach((area, index) => {
        const age = currentTime - area.time;
        const expansionRate = 0.1; // much slower - pixels per millisecond
        const maxExpansion = Math.max(canvas.width, canvas.height) * 2; // expand beyond screen edges
        
        const expandedSize = area.size + (age * expansionRate);
        
        // Create expanding gradient
        const gradient = ctx.createRadialGradient(
          area.x, area.y, 0, 
          area.x, area.y, expandedSize
        );
        
        // Very slow fade - maintain opacity much longer
        const fadeFactor = Math.max(0, 1 - (age / 15000)); // fade over 15 seconds
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 * fadeFactor})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.3 * fadeFactor})`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.2 * fadeFactor})`);
        gradient.addColorStop(0.8, `rgba(255, 255, 255, ${0.1 * fadeFactor})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        // Expand the cleared area
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(area.x, area.y, expandedSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      });
      
      // Remove old areas (older than 15 seconds)
      clearedAreasRef.current = clearedAreasRef.current.filter(
        area => currentTime - area.time < 15000
      );
      
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isSaturated]);

  // Setup canvas and events
  useEffect(() => {
    // Always initialize canvas (grayscale always visible)
    initCanvas();
    
    if (isSaturated) {
      animate();
    }

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initCanvas, handleMouseMove, animate, isSaturated]);

  return (
    <Router>
      {/* Colorful background - always there */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          background: 'linear-gradient(45deg, #FF6B6B, #FFA500, #FFD93D, #FF69B4, #9B59B6, #3498DB)'
        }}
      />
      
      {/* Grayscale overlay - always visible */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 10,
          cursor: isSaturated ? 'crosshair' : 'default',
          pointerEvents: isSaturated ? 'auto' : 'none'
        }}
      />
      
      {/* Content Layer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 100,
        minHeight: '100vh'
      }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                isSaturated={isSaturated}
                onSaturateToggle={handleSaturateToggle}
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