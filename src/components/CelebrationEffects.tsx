import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: 'sparkle' | 'heart' | 'confetti';
  rotation: number;
  vRotation: number;
}

interface CelebrationEffectsProps {
  active: boolean;
}

export const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const colors = [
      '#f43f5e', // rose
      '#ec4899', // pink
      '#d946ef', // fuchsia
      '#f59e0b', // amber / gold
      '#fb7185', // rose light
      '#a855f7', // purple
      '#ffffff', // white sparkle
    ];

    // Spawn a burst of celebratory particles
    const spawnBurst = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        const types: Array<'sparkle' | 'heart' | 'confetti'> = ['sparkle', 'heart', 'confetti'];
        const type = types[Math.floor(Math.random() * types.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // Slight initial lift
          size: type === 'heart' ? Math.random() * 8 + 6 : Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.008 + 0.004, // Smooth gradual fade
          type,
          rotation: Math.random() * 360,
          vRotation: (Math.random() - 0.5) * 8,
        });
      }
    };

    // Initial burst from center/sides
    spawnBurst(width * 0.5, height * 0.4, 40);
    spawnBurst(width * 0.25, height * 0.5, 25);
    spawnBurst(width * 0.75, height * 0.5, 25);

    let frameCount = 0;
    const maxFrames = 300; // ~5 seconds at 60fps, then natural fade out

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Periodically spawn a few gentle floating particles for the first 3 seconds
      if (frameCount < 160 && frameCount % 20 === 0) {
        spawnBurst(Math.random() * width, height * 0.3 + Math.random() * (height * 0.4), 10);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // subtle gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.vRotation;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'confetti') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
        } else if (p.type === 'sparkle') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'heart') {
          // Draw tiny heart path
          ctx.fillStyle = p.color;
          const s = p.size * 0.4;
          ctx.beginPath();
          ctx.moveTo(0, s);
          ctx.bezierCurveTo(-s * 2, -s, -s * 2, -s * 2.5, 0, -s * 1.5);
          ctx.bezierCurveTo(s * 2, -s * 2.5, s * 2, -s, 0, s);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0 && frameCount < maxFrames + 120) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};
