import React, { useRef, useEffect, useCallback, useState } from 'react';

interface SaturateEffectProps {
  isActive: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
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
    
    // Add to trail only if moved enough distance from last point
    const lastPoint = trailRef.current[trailRef.current.length - 1];
    if (!lastPoint || 
        Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2)) > 5) {
      trailRef.current.push({
        x,
        y,
        timestamp: Date.now()
      });
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
      
      // Draw smooth pixelated smoke effect
      if (trailRef.current.length > 0) {
        const pixelSize = 4; // Much smaller pixels for smoother appearance
        
        // Enable anti-aliasing for smoother edges
        ctx.imageSmoothingEnabled = true;
        
        // Create pixelated smoke clouds
        for (let i = 0; i < trailRef.current.length; i++) {
          const point = trailRef.current[i];
          const age = now - point.timestamp;
          const time = age / 1000;
          const baseRadius = 40 + time * 150; // Very fast expansion
          
          // Calculate pixel grid bounds
          const startX = Math.floor((point.x - baseRadius) / pixelSize) * pixelSize;
          const startY = Math.floor((point.y - baseRadius) / pixelSize) * pixelSize;
          const endX = Math.ceil((point.x + baseRadius) / pixelSize) * pixelSize;
          const endY = Math.ceil((point.y + baseRadius) / pixelSize) * pixelSize;
          
          // Draw pixelated circle using discrete blocks
          for (let px = startX; px < endX; px += pixelSize) {
            for (let py = startY; py < endY; py += pixelSize) {
              const dx = px + pixelSize/2 - point.x;
              const dy = py + pixelSize/2 - point.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < baseRadius) {
                // Calculate opacity based on distance (simpler 8-bit style)
                const normalizedDist = distance / baseRadius;
                
                // Smooth gradient with multiple opacity levels
                let opacity = 0;
                
                if (normalizedDist < 0.3) {
                  opacity = 1; // Solid center
                } else if (normalizedDist < 0.5) {
                  opacity = 0.8;
                } else if (normalizedDist < 0.65) {
                  opacity = 0.6;
                } else if (normalizedDist < 0.75) {
                  opacity = 0.4;
                } else if (normalizedDist < 0.85) {
                  opacity = 0.2;
                } else if (normalizedDist < 0.95) {
                  opacity = 0.1;
                }
                
                if (opacity > 0) {
                  // Add slight blur for smoother appearance
                  const gradient = ctx.createRadialGradient(
                    px + pixelSize/2, py + pixelSize/2, 0,
                    px + pixelSize/2, py + pixelSize/2, pixelSize
                  );
                  gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                  gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.5})`);
                  ctx.fillStyle = gradient;
                  ctx.fillRect(px, py, pixelSize, pixelSize);
                }
              }
            }
          }
        }
        
        // Remove particle effects for cleaner edges
        ctx.imageSmoothingEnabled = true; // Re-enable for other rendering
      }
        
      // Update cleared canvas with smooth style
      clearedCtx.imageSmoothingEnabled = true;
      const pixelSize = 4;
      
      for (let i = 0; i < trailRef.current.length; i++) {
        const point = trailRef.current[i];
        const age = now - point.timestamp;
        const time = age / 1000;
                  const baseRadius = 40 + time * 150; // Match the very fast expansion
        
        // Simplified pixelated clear area
        const startX = Math.floor((point.x - baseRadius) / pixelSize) * pixelSize;
        const startY = Math.floor((point.y - baseRadius) / pixelSize) * pixelSize;
        const endX = Math.ceil((point.x + baseRadius) / pixelSize) * pixelSize;
        const endY = Math.ceil((point.y + baseRadius) / pixelSize) * pixelSize;
        
        for (let px = startX; px < endX; px += pixelSize) {
          for (let py = startY; py < endY; py += pixelSize) {
            const dx = px + pixelSize/2 - point.x;
            const dy = py + pixelSize/2 - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < baseRadius) {
              const normalizedDist = distance / baseRadius;
              const opacity = normalizedDist < 0.5 ? 1 : normalizedDist < 0.8 ? 0.5 : 0.2;
              
              clearedCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
              clearedCtx.fillRect(px, py, pixelSize, pixelSize);
            }
          }
        }
      }
      
      clearedCtx.imageSmoothingEnabled = true;
      
      ctx.restore();
    }
    
    // No cleanup - trail points persist forever

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