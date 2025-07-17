import React, { useRef, useEffect, useState, useCallback } from 'react';
import ParticleSystem from './ParticleSystem';

interface Point {
  x: number;
  y: number;
}

const SaturateEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clearAreas, setClearAreas] = useState<Point[]>([]);
  const [mousePosition, setMousePosition] = useState<Point | null>(null);
  const [mouseVelocity, setMouseVelocity] = useState(0);
  const lastClearTime = useRef<number>(Date.now());
  const lastMousePosition = useRef<Point | null>(null);
  const lastVelocityTime = useRef<number>(Date.now());

  // Colorful background content
  const colorfulBackground = (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-lg"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-green-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-400 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400 rounded-full blur-lg"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Interactive Art
        </h1>
      </div>
    </div>
  );

  const calculateVelocity = useCallback((currentPos: Point): number => {
    const now = Date.now();
    const timeDelta = now - lastVelocityTime.current;
    
    if (!lastMousePosition.current || timeDelta === 0) {
      return 0;
    }
    
    const distance = Math.sqrt(
      Math.pow(currentPos.x - lastMousePosition.current.x, 2) +
      Math.pow(currentPos.y - lastMousePosition.current.y, 2)
    );
    
    const velocity = distance / timeDelta * 10; // Scale for better particle response
    
    lastMousePosition.current = currentPos;
    lastVelocityTime.current = now;
    
    return Math.min(velocity, 50); // Cap velocity to prevent excessive particles
  }, []);

  const getMousePos = useCallback((canvas: HTMLCanvasElement, e: MouseEvent | TouchEvent): Point => {
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }, []);

  const drawCircle = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number = 40) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pos = getMousePos(canvas, e);
    const velocity = calculateVelocity(pos);
    
    setMousePosition(pos);
    setMouseVelocity(velocity);
    
    if (!isMouseDown) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Add to clear areas for tracking
    setClearAreas(prev => [...prev, pos]);
    lastClearTime.current = Date.now();
    
    drawCircle(ctx, pos.x, pos.y);
  }, [isMouseDown, getMousePos, drawCircle, calculateVelocity]);

  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    setIsMouseDown(true);
    lastClearTime.current = Date.now();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(canvas, e);
    const velocity = calculateVelocity(pos);
    
    setMousePosition(pos);
    setMouseVelocity(velocity);
    setClearAreas(prev => [...prev, pos]);
    drawCircle(ctx, pos.x, pos.y);
  }, [getMousePos, drawCircle, calculateVelocity]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setMousePosition(null);
    setMouseVelocity(0);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fill with semi-transparent gray (fog effect)
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(128, 128, 128, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const regenerateFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gradually regenerate fog
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(128, 128, 128, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Fog regeneration effect
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastClear = Date.now() - lastClearTime.current;
      
      if (timeSinceLastClear > 10000) {
        // Reset after 10 seconds
        initCanvas();
        setClearAreas([]);
      } else if (timeSinceLastClear > 3000) {
        // Start regenerating after 3 seconds
        regenerateFog();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [initCanvas, regenerateFog]);

  // Initialize canvas
  useEffect(() => {
    initCanvas();
    
    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Mouse and touch event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Colorful background */}
      <div ref={backgroundRef} className="absolute inset-0">
        {colorfulBackground}
      </div>
      
      {/* Fog overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair z-10"
        style={{ pointerEvents: 'all' }}
      />
      
      {/* Particle system */}
      <ParticleSystem
        isActive={isMouseDown}
        mousePosition={mousePosition}
        mouseVelocity={mouseVelocity}
      />
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white text-lg font-medium z-30 pointer-events-none">
        <p>Brush away the fog to reveal the art beneath</p>
        <p className="text-sm opacity-70 mt-1">Fog regrows after 10 seconds</p>
        <p className="text-sm opacity-50 mt-1">✨ Now with magical particle trails!</p>
      </div>
    </div>
  );
};

export default SaturateEffect;