import React, { useRef, useEffect, useCallback } from 'react';

interface WaterEffectProps {
  width?: number;
  height?: number;
  className?: string;
}

export const WaterEffect: React.FC<WaterEffectProps> = ({ 
  width = 800, 
  height = 600, 
  className = '' 
}) => {
  // Canvas refs for 3-layer system
  const containerRef = useRef<HTMLDivElement>(null);
  const greyCanvasRef = useRef<HTMLCanvasElement>(null);
  const waterCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Water physics state
  const waterDataRef = useRef<{
    current: Float32Array;
    previous: Float32Array;
    frameIndex: number;
    animationId?: number;
  }>();

  // Initialize water physics
  const initWaterPhysics = useCallback(() => {
    const pixelCount = width * height;
    waterDataRef.current = {
      current: new Float32Array(pixelCount),
      previous: new Float32Array(pixelCount),
      frameIndex: 0
    };
  }, [width, height]);

  // Core water physics update - the magic equation!
  const updateWaterPhysics = useCallback(() => {
    if (!waterDataRef.current) return;

    const { current, previous, frameIndex } = waterDataRef.current;
    const currentBuffer = frameIndex === 0 ? current : previous;
    const previousBuffer = frameIndex === 0 ? previous : current;

    // Apply the beautiful water physics equation
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        
        // Get neighboring pixel heights
        const north = currentBuffer[(y - 1) * width + x];
        const south = currentBuffer[(y + 1) * width + x];
        const west = currentBuffer[y * width + (x - 1)];
        const east = currentBuffer[y * width + (x + 1)];
        
        // The magic formula: sum neighbors, divide by 2, subtract previous, apply damping
        const newHeight = ((north + south + east + west) * 0.5 - previousBuffer[i]) * 0.99;
        
        previousBuffer[i] = newHeight;
      }
    }
    
    // Swap buffers
    waterDataRef.current.frameIndex = 1 - frameIndex;
  }, [width, height]);

  // Render water to canvas
  const renderWater = useCallback(() => {
    const canvas = waterCanvasRef.current;
    if (!canvas || !waterDataRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const { current, previous, frameIndex } = waterDataRef.current;
    const waterBuffer = frameIndex === 0 ? current : previous;

    // Convert water heights to beautiful blue colors
    for (let i = 0; i < width * height; i++) {
      const height = waterBuffer[i];
      const intensity = Math.max(0, Math.min(255, 127 + height * 127));
      
      const pixelIndex = i * 4;
      data[pixelIndex] = 0;                    // Red
      data[pixelIndex + 1] = intensity * 0.3;  // Green (slight tint)
      data[pixelIndex + 2] = intensity;        // Blue
      data[pixelIndex + 3] = 180;              // Alpha (semi-transparent)
    }

    ctx.putImageData(imageData, 0, 0);
  }, [width, height]);

  // Create water ripple at position
  const createRipple = useCallback((x: number, y: number, intensity: number = 8.0) => {
    if (!waterDataRef.current) return;

    const { current, previous, frameIndex } = waterDataRef.current;
    const waterBuffer = frameIndex === 0 ? current : previous;
    
    // Create ripple with falloff
    const radius = 15;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const px = Math.floor(x + dx);
        const py = Math.floor(y + dy);
        
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= radius) {
            const falloff = 1 - (distance / radius);
            const index = py * width + px;
            waterBuffer[index] += intensity * falloff * falloff;
          }
        }
      }
    }
  }, [width, height]);

  // Clear grey overlay around cursor
  const clearGreyOverlay = useCallback((x: number, y: number) => {
    const canvas = greyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a clear circle around cursor
    const radius = 30;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Handle mouse/touch interactions
  const handleInteraction = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = waterCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if ('clientX' in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return;
    }

    const x = Math.floor((clientX - rect.left) * (width / rect.width));
    const y = Math.floor((clientY - rect.top) * (height / rect.height));
    
    createRipple(x, y);
    clearGreyOverlay(x, y);
  }, [width, height, createRipple, clearGreyOverlay]);

  // Handle mouse movement for cursor clearing
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = waterCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * (width / rect.width));
    const y = Math.floor((event.clientY - rect.top) * (height / rect.height));
    
    clearGreyOverlay(x, y);
  }, [width, height, clearGreyOverlay]);

  // Animation loop
  const animate = useCallback(() => {
    updateWaterPhysics();
    renderWater();
    
    if (waterDataRef.current) {
      waterDataRef.current.animationId = requestAnimationFrame(animate);
    }
  }, [updateWaterPhysics, renderWater]);

  // Initialize grey background
  const initGreyCanvas = useCallback(() => {
    const canvas = greyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a nice grey gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#d0d0d0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  // Setup and cleanup
  useEffect(() => {
    initWaterPhysics();
    initGreyCanvas();
    
    // Start animation
    const timeoutId = setTimeout(() => {
      animate();
    }, 100);

    // Create some initial ripples for demo
    setTimeout(() => {
      createRipple(width * 0.3, height * 0.4, 5);
      createRipple(width * 0.7, height * 0.6, 4);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (waterDataRef.current?.animationId) {
        cancelAnimationFrame(waterDataRef.current.animationId);
      }
    };
  }, [animate, initWaterPhysics, initGreyCanvas, createRipple, width, height]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      {/* Grey background layer */}
      <canvas
        ref={greyCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-10"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Water physics layer */}
      <canvas
        ref={waterCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-20 cursor-crosshair"
        style={{ imageRendering: 'pixelated' }}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseMove={handleMouseMove}
      />
      
      {/* Cursor interaction layer */}
      <canvas
        ref={cursorCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-30 pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default WaterEffect;