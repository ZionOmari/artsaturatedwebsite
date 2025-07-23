import React, { useRef, useEffect, useCallback, useState } from 'react';

interface SaturateEffectProps {
  isActive: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  drift: { x: number; y: number }; // Add drift for smoke movement
}

const SaturateEffect: React.FC<SaturateEffectProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clearedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef<{ x: number; y: number; isMoving: boolean }>({
    x: 0,
    y: 0,
    isMoving: false,
  });

  // Initialize canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create cleared areas tracking canvas
    const clearedCanvas = document.createElement('canvas');
    clearedCanvasRef.current = clearedCanvas;
    const clearedCtx = clearedCanvas.getContext('2d');
    if (!clearedCtx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      clearedCanvas.width = window.innerWidth;
      clearedCanvas.height = window.innerHeight;
      
      // Initialize cleared canvas to transparent
      clearedCtx.clearRect(0, 0, clearedCanvas.width, clearedCanvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fill with grayscale overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setIsInitialized(true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isActive || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = { x, y, isMoving: true };
    
    // Add to trail with some turbulence and drift
    const turbulence = 2;
    trailRef.current.push({
      x: x + (Math.random() - 0.5) * turbulence,
      y: y + (Math.random() - 0.5) * turbulence,
      timestamp: Date.now(),
      drift: {
        x: (Math.random() - 0.5) * 0.5, // Gentle horizontal drift
        y: -Math.random() * 0.3 // Upward drift (smoke rises)
      }
    });
    
    // Keep trail reasonable length (but longer for smoke effect)
    if (trailRef.current.length > 500) {
      trailRef.current.shift();
    }

    // Clear timeout to reset movement state
    setTimeout(() => {
      mouseRef.current.isMoving = false;
    }, 100);

  }, [isActive]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const clearedCanvas = clearedCanvasRef.current;
    if (!canvas || !clearedCanvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    const clearedCtx = clearedCanvas.getContext('2d');
    if (!ctx || !clearedCtx) return;

    // Clear canvas and redraw grayscale overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw smooth continuous trail
    if (trailRef.current.length > 2) {
      const now = Date.now();
      
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      
      // Create a smooth path using bezier curves
      ctx.beginPath();
      ctx.lineWidth = 0;
      
      // Draw the trail as a continuous smooth path
      for (let i = 0; i < trailRef.current.length; i++) {
        const point = trailRef.current[i];
        const age = now - point.timestamp;
        
        // Apply drift over time
        const driftAmount = age * 0.001;
        const driftedX = point.x + point.drift.x * age * 0.1;
        const driftedY = point.y + point.drift.y * age * 0.1;
        
        // Faster expansion - grows much quicker
        const expansionRate = age * 0.03; // 30 pixels per second
        const baseRadius = 20 + expansionRate; // Start smaller, expand indefinitely
        
        // Create smooth gradient for this point with drift
        const gradient = ctx.createRadialGradient(
          driftedX, driftedY, 0,
          driftedX, driftedY, baseRadius
        );
        
        // Smoke-like gradient - denser center, softer edges
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.6)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.1)');
        gradient.addColorStop(0.8, 'rgba(255,255,255,0.03)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(driftedX, driftedY, baseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
        
      // Also update cleared canvas with the same smooth trail
      for (let i = 0; i < trailRef.current.length; i++) {
        const point = trailRef.current[i];
        const age = now - point.timestamp;
        
        // Apply same drift
        const driftedX = point.x + point.drift.x * age * 0.1;
        const driftedY = point.y + point.drift.y * age * 0.1;
        
        // Same faster expansion for cleared canvas
        const expansionRate = age * 0.03;
        const baseRadius = 20 + expansionRate;
        
        const clearedGradient = clearedCtx.createRadialGradient(
          driftedX, driftedY, 0,
          driftedX, driftedY, baseRadius * 0.8
        );
        clearedGradient.addColorStop(0, 'rgba(255,255,255,1)');
        clearedGradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        clearedCtx.fillStyle = clearedGradient;
        clearedCtx.beginPath();
        clearedCtx.arc(driftedX, driftedY, baseRadius * 0.8, 0, Math.PI * 2);
        clearedCtx.fill();
      }
      
      ctx.restore();
    }
    
    // Don't clean up trail points - let them expand forever

    // Fade the cleared canvas
    clearedCtx.save();
    clearedCtx.globalCompositeOperation = 'source-atop';
    clearedCtx.fillStyle = 'rgba(0, 0, 0, 0.005)';
    clearedCtx.fillRect(0, 0, clearedCanvas.width, clearedCanvas.height);
    clearedCtx.restore();

    // Apply healing only to non-white areas of cleared canvas
    // The imageData was just used to ensure the canvas is read, but we use drawImage for the actual masking
    clearedCtx.getImageData(0, 0, clearedCanvas.width, clearedCanvas.height);
    
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    
    // Create a healing mask that starts from the borders
    const healingCanvas = document.createElement('canvas');
    healingCanvas.width = canvas.width;
    healingCanvas.height = canvas.height;
    const healingCtx = healingCanvas.getContext('2d');
    
    if (healingCtx) {
      // Create a gradient that's stronger at the edges
      const centerX = healingCanvas.width / 2;
      const centerY = healingCanvas.height / 2;
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
      
      // Create radial gradient from center (transparent) to edges (opaque)
      const edgeGradient = healingCtx.createRadialGradient(
        centerX, centerY, maxRadius * 0.7, // Start fading from 70% of max radius
        centerX, centerY, maxRadius
      );
      edgeGradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Transparent at center
      edgeGradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.3)'); // Start becoming visible
      edgeGradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)'); // Nearly opaque at edges
      
      healingCtx.fillStyle = edgeGradient;
      healingCtx.fillRect(0, 0, healingCanvas.width, healingCanvas.height);
      
      // Also add stronger healing from the actual borders
      const borderWidth = 50; // Width of border healing zone
      healingCtx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      
      // Top border
      healingCtx.fillRect(0, 0, healingCanvas.width, borderWidth);
      // Bottom border
      healingCtx.fillRect(0, healingCanvas.height - borderWidth, healingCanvas.width, borderWidth);
      // Left border
      healingCtx.fillRect(0, 0, borderWidth, healingCanvas.height);
      // Right border
      healingCtx.fillRect(healingCanvas.width - borderWidth, 0, borderWidth, healingCanvas.height);
      
      // Apply the cleared canvas as a mask
      healingCtx.globalCompositeOperation = 'destination-out';
      healingCtx.drawImage(clearedCanvas, 0, 0);
      
      // Draw the healing overlay
      ctx.globalAlpha = 1 / 600; // Faster healing from borders
      ctx.drawImage(healingCanvas, 0, 0);
    }
    
    ctx.restore();

    animationRef.current = requestAnimationFrame(animate);
  }, [isActive]);

  // Initialize effect when activated
  useEffect(() => {
    if (isActive && !isInitialized) {
      initCanvas();
    }
  }, [isActive, isInitialized, initCanvas]);

  // Start/stop animation
  useEffect(() => {
    if (isActive && isInitialized) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isInitialized, animate]);

  // Mouse event listeners
  useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isActive, handleMouseMove]);

  // Reset when deactivated
  useEffect(() => {
    if (!isActive) {
      trailRef.current = [];
      setIsInitialized(false);
      if (clearedCanvasRef.current) {
        const clearedCtx = clearedCanvasRef.current.getContext('2d');
        if (clearedCtx) {
          clearedCtx.clearRect(0, 0, clearedCanvasRef.current.width, clearedCanvasRef.current.height);
        }
      }
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      aria-hidden="true"/>
  );
};

export default SaturateEffect; 