import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

interface Point {
  x: number;
  y: number;
}

interface ParticleSystemProps {
  isActive: boolean;
  mousePosition: Point | null;
  mouseVelocity: number;
  onParticleUpdate?: (particles: Particle[]) => void;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  isActive,
  mousePosition,
  mouseVelocity,
  onParticleUpdate
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastMousePos = useRef<Point | null>(null);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
  ];

  const createParticle = useCallback((x: number, y: number, velocity: number): Particle => {
    const speed = Math.random() * 2 + 1;
    const angle = Math.random() * Math.PI * 2;
    const life = 30 + Math.random() * 40;
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * velocity * 0.1,
      vy: Math.sin(angle) * speed + (Math.random() - 0.5) * velocity * 0.1,
      life,
      maxLife: life,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    };
  }, []);

  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;
    
    // Add new particles if mouse is active
    if (isActive && mousePosition && lastMousePos.current) {
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - lastMousePos.current.x, 2) +
        Math.pow(mousePosition.y - lastMousePos.current.y, 2)
      );
      
      const particleCount = Math.min(Math.floor(distance * 0.5 + mouseVelocity * 0.3), 10);
      
      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const x = lastMousePos.current.x + (mousePosition.x - lastMousePos.current.x) * t;
        const y = lastMousePos.current.y + (mousePosition.y - lastMousePos.current.y) * t;
        
        particles.push(createParticle(x, y, mouseVelocity));
      }
    }

    // Update existing particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply slight gravity and friction
      particle.vy += 0.05;
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Update life
      particle.life--;
      particle.alpha = particle.life / particle.maxLife;
      
      // Remove dead particles
      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }

    lastMousePos.current = mousePosition;
    
    if (onParticleUpdate) {
      onParticleUpdate([...particles]);
    }
  }, [isActive, mousePosition, mouseVelocity, createParticle, onParticleUpdate]);

  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    const particles = particlesRef.current;
    particles.forEach(particle => {
      ctx.save();
      
      // Set particle properties
      ctx.globalAlpha = particle.alpha * 0.8;
      ctx.fillStyle = particle.color;
      
      // Draw particle with glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add inner glow
      ctx.globalAlpha = particle.alpha * 0.4;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }, []);

  const animate = useCallback(() => {
    updateParticles();
    renderParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles]);

  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Start/stop animation
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleSystem;