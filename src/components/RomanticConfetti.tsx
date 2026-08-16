import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  shape: 'heart' | 'star' | 'circle' | 'ribbon';
  opacity: number;
}

export const RomanticConfetti: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#f472b6', // pink-400
      '#fb7185', // rose-400
      '#c084fc', // purple-400
      '#fde047', // warm gold
      '#ffffff', // sparkling white
      '#fda4af', // light rose
      '#e879f9', // fuchsia
    ];

    const particles: Particle[] = [];
    const count = Math.min(120, Math.floor(width / 8));

    // Spawn from center cake location
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      const shapes: Array<'heart' | 'star' | 'circle' | 'ribbon'> = ['heart', 'star', 'circle', 'ribbon'];
      
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 60,
        y: height * 0.42 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed * (Math.random() * 0.8 + 0.6),
        vy: Math.sin(angle) * speed - Math.random() * 6 - 2, // shoot upwards
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.vRot;
        p.opacity -= 0.005; // slowly fade out

        if (p.opacity <= 0) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'heart') {
          ctx.beginPath();
          const s = p.size * 0.7;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s / 2, -s / 2, -s, s * 0.3, 0, s);
          ctx.bezierCurveTo(s, s * 0.3, s / 2, -s / 2, 0, s * 0.3);
          ctx.fill();
        } else {
          // Sparkle / 4-point star
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(0, 0, p.size, 0);
          ctx.quadraticCurveTo(0, 0, 0, p.size);
          ctx.quadraticCurveTo(0, 0, -p.size, 0);
          ctx.quadraticCurveTo(0, 0, 0, -p.size);
          ctx.fill();
        }

        ctx.restore();
      });

      if (particles.some((p) => p.opacity > 0)) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};
