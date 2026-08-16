import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  fadeSpeed: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface FloatingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  hue: number;
  isPetal?: boolean;
}

interface TouchSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const RomanticBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Interactive sparkles from pointer movements
    const touchSparkles: TouchSparkle[] = [];
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : (e as MouseEvent).clientY;
      if (clientX === undefined || clientY === undefined) return;

      if (Math.random() < 0.3) {
        touchSparkles.push({
          x: clientX,
          y: clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          size: Math.random() * 3 + 2,
          alpha: 0.9,
          color: Math.random() > 0.5 ? '#f472b6' : '#fbbf24',
        });
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Initialize Stars & Sparkles
    const starCount = Math.min(110, Math.floor((width * height) / 10000));
    const stars: Particle[] = [];
    const colors = [
      'rgba(255, 230, 240, ',
      'rgba(244, 114, 182, ',
      'rgba(216, 180, 254, ',
      'rgba(255, 255, 255, ',
      'rgba(251, 207, 232, ',
      'rgba(253, 230, 138, ', // Warm gold
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.3 - 0.05,
        opacity: Math.random() * 0.7 + 0.2,
        baseOpacity: Math.random() * 0.6 + 0.2,
        fadeSpeed: Math.random() * 0.01 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Initialize Floating Romantic Hearts & Rose Petals
    const heartCount = Math.min(18, Math.max(9, Math.floor(width / 110)));
    const hearts: FloatingHeart[] = [];

    const createHeart = (initialRandomY = false): FloatingHeart => ({
      x: Math.random() * width,
      y: initialRandomY ? Math.random() * height : height + Math.random() * 80 + 20,
      size: Math.random() * 16 + 10,
      speedY: -(Math.random() * 0.45 + 0.18),
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: 0,
      maxOpacity: Math.random() * 0.28 + 0.12,
      scale: Math.random() * 0.5 + 0.75,
      rotation: (Math.random() - 0.5) * 0.6,
      rotationSpeed: (Math.random() - 0.5) * 0.006,
      hue: Math.random() * 35 + 330, // Soft rose, magenta, pink, peach
      isPetal: Math.random() > 0.5,
    });

    for (let i = 0; i < heartCount; i++) {
      hearts.push(createHeart(true));
    }

    // Helper to draw a heart or petal shape
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number,
      hue: number,
      isPetal?: boolean
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();

      if (isPetal) {
        // Draw soft romantic rose petal
        context.moveTo(0, -size);
        context.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.9, size * 0.4, 0, size);
        context.bezierCurveTo(-size * 0.9, size * 0.4, -size * 0.8, -size * 0.6, 0, -size);
      } else {
        // Draw heart shape
        const topCurveHeight = size * 0.3;
        context.moveTo(0, topCurveHeight);
        context.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight / 3, 0, size);
        context.bezierCurveTo(size, topCurveHeight / 3, size / 2, -size / 2, 0, topCurveHeight);
      }

      context.closePath();

      const grad = context.createRadialGradient(0, 0, 1, 0, 0, size * 1.3);
      grad.addColorStop(0, `hsla(${hue}, 95%, 80%, ${opacity})`);
      grad.addColorStop(0.6, `hsla(${hue}, 85%, 68%, ${opacity * 0.75})`);
      grad.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);

      context.fillStyle = grad;
      context.shadowColor = `hsla(${hue}, 90%, 75%, ${opacity * 0.85})`;
      context.shadowBlur = size * 0.7;
      context.fill();

      context.restore();
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle twinkling stars and floating particles
      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity =
          p.baseOpacity + Math.sin(tick * p.twinkleSpeed + p.twinkleOffset) * 0.35;
        const boundedOpacity = Math.max(0.05, Math.min(0.9, currentOpacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${boundedOpacity})`;

        if (p.size > 1.4) {
          ctx.shadowColor = 'rgba(244, 114, 182, 0.7)';
          ctx.shadowBlur = p.size * 5;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      // 2. Draw subtle floating hearts and rose petals
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y += h.speedY;
        h.x += h.speedX + Math.sin(tick * 0.02 + i) * 0.3;
        h.rotation += h.rotationSpeed;

        const distanceRatio = (height - h.y) / height;
        if (distanceRatio < 0.2) {
          h.opacity = (distanceRatio / 0.2) * h.maxOpacity;
        } else if (distanceRatio > 0.8) {
          h.opacity = ((1 - distanceRatio) / 0.2) * h.maxOpacity;
        } else {
          h.opacity = h.maxOpacity;
        }

        drawHeart(
          ctx,
          h.x,
          h.y,
          h.size * h.scale,
          Math.max(0, Math.min(1, h.opacity)),
          h.rotation,
          h.hue,
          h.isPetal
        );

        if (h.y < -50) {
          hearts[i] = createHeart(false);
        }
      }

      // 3. Draw touch / pointer sparkles
      for (let i = touchSparkles.length - 1; i >= 0; i--) {
        const sp = touchSparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.025;

        if (sp.alpha <= 0) {
          touchSparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = sp.alpha;
        ctx.fillStyle = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
