import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface FlowerTransitionProps {
  onComplete: () => void;
}

interface FloatingPetal {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotation: number;
  endRotation: number;
  scale: number;
  delay: number;
  duration: number;
}

export const FlowerTransition: React.FC<FlowerTransitionProps> = ({ onComplete }) => {
  const flowerConfig = birthdayConfig.page1.flowerTransition;
  const [stage, setStage] = useState<'bud' | 'blooming' | 'full' | 'fading'>('bud');
  const [textStage, setTextStage] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Timeline Sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      // Shorter, gentle sequence for reduced motion
      const t1 = setTimeout(() => setTextStage(1), 400);
      const t2 = setTimeout(() => setTextStage(2), 1200);
      const t3 = setTimeout(() => setStage('fading'), 2200);
      const t4 = setTimeout(() => onComplete(), 2800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }

    // Normal cinematic timeline (approx ~3.8s total)
    // 0.0s: Bud appears & pulses
    // 0.5s: First petals start opening (blooming)
    const timerBloom = setTimeout(() => {
      setStage('blooming');
    }, 500);

    // 1.8s: Full bloom expands & petals emerge
    const timerFull = setTimeout(() => {
      setStage('full');
    }, 1800);

    // 2.2s: "A little something beautiful..."
    const timerText1 = setTimeout(() => {
      setTextStage(1);
    }, 2200);

    // 2.7s: "Just for you, Bujjama. ❤️"
    const timerText2 = setTimeout(() => {
      setTextStage(2);
    }, 2700);

    // 3.3s: "Ready? ✨"
    const timerText3 = setTimeout(() => {
      setTextStage(3);
    }, 3300);

    // 3.6s: Begin soft fade out
    const timerFade = setTimeout(() => {
      setStage('fading');
    }, 3600);

    // 4.0s: Complete & enter Page 2
    const timerComplete = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timerBloom);
      clearTimeout(timerFull);
      clearTimeout(timerText1);
      clearTimeout(timerText2);
      clearTimeout(timerText3);
      clearTimeout(timerFade);
      clearTimeout(timerComplete);
    };
  }, [onComplete, prefersReducedMotion]);

  // Generate lightweight drifting petals
  const floatingPetals: FloatingPetal[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const startDist = Math.random() * 40 + 20;
      const endDist = Math.random() * 180 + 100;
      return {
        id: i,
        startX: Math.cos(angle) * startDist,
        startY: Math.sin(angle) * startDist,
        endX: Math.cos(angle) * endDist + (Math.random() - 0.5) * 60,
        endY: Math.sin(angle) * endDist - (Math.random() * 80 + 40), // Float gently upwards
        rotation: (Math.random() - 0.5) * 60,
        endRotation: (Math.random() - 0.5) * 360,
        scale: Math.random() * 0.5 + 0.7,
        delay: 1.8 + (i % 6) * 0.12,
        duration: 2.0 + Math.random() * 0.8,
      };
    });
  }, []);

  // Generate delicate sparkle particles
  const sparkles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = Math.random() * 110 + 40;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: 1.6 + (i * 0.08),
        size: Math.random() * 8 + 6,
      };
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: stage === 'fading' ? 0 : 1 }}
      transition={{ duration: stage === 'fading' ? 0.45 : 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060104]/98 backdrop-blur-2xl select-none overflow-hidden px-4"
    >
      {/* Background Ambient Glow Halo */}
      <motion.div
        animate={{
          scale: stage === 'bud' ? [0.8, 1.0, 0.8] : stage === 'blooming' ? 1.4 : 1.9,
          opacity: stage === 'bud' ? 0.4 : stage === 'blooming' ? 0.7 : 0.85,
        }}
        transition={{
          scale: { duration: stage === 'bud' ? 1.5 : 1.8, ease: 'easeOut', repeat: stage === 'bud' ? Infinity : 0 },
          opacity: { duration: 1.2, ease: 'easeInOut' },
        }}
        className="absolute w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-gradient-to-tr from-pink-600/30 via-purple-600/25 to-amber-500/20 blur-[90px] pointer-events-none"
      />

      {/* Secondary Stardust Aura */}
      <motion.div
        animate={{
          opacity: stage === 'full' ? 0.6 : 0.2,
          scale: stage === 'full' ? 1.3 : 0.9,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute w-[220px] sm:w-[340px] h-[220px] sm:h-[340px] rounded-full bg-pink-500/15 blur-[60px] pointer-events-none"
      />

      {/* Flower & Petals Main Stage */}
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 my-auto">
        {/* Blooming Glowing Flower SVG */}
        <motion.div
          animate={{
            scale: stage === 'bud' ? 0.7 : stage === 'blooming' ? 1.0 : 1.15,
            rotate: stage === 'bud' ? 0 : stage === 'blooming' ? 15 : 25,
          }}
          transition={{
            scale: { duration: prefersReducedMotion ? 0.8 : 2.0, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: prefersReducedMotion ? 0.8 : 2.4, ease: [0.16, 1, 0.3, 1] },
          }}
          className="relative z-20 flex items-center justify-center w-full h-full"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_0_35px_rgba(236,72,153,0.65)]"
          >
            <defs>
              {/* Petal Gradients */}
              <linearGradient id="outerPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#ec4899" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="midPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.98" />
                <stop offset="50%" stopColor="#f472b6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#db2777" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="innerPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#fbcfe8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0.85" />
              </linearGradient>

              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="80%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
              </radialGradient>

              {/* Individual Petal Path definition */}
              <path
                id="singlePetal"
                d="M 100 100 C 88 70, 78 40, 100 15 C 122 40, 112 70, 100 100 Z"
              />
            </defs>

            {/* Layer 1: Outer Petals (8 petals) */}
            <motion.g
              initial={{ scale: 0.25, opacity: 0 }}
              animate={{
                scale: stage === 'bud' ? 0.35 : stage === 'blooming' ? 0.85 : 1.0,
                opacity: stage === 'bud' ? 0.3 : 0.95,
              }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: '100px 100px' }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <motion.path
                  key={`outer-${angle}`}
                  d="M 100 100 C 82 65, 70 30, 100 8 C 130 30, 118 65, 100 100 Z"
                  fill="url(#outerPetalGrad)"
                  stroke="#fbcfe8"
                  strokeWidth="0.75"
                  strokeOpacity="0.6"
                  transform={`rotate(${angle} 100 100)`}
                  initial={{ scaleY: 0.3 }}
                  animate={{
                    scaleY: stage === 'bud' ? 0.4 : stage === 'blooming' ? 0.85 : 1.0,
                    scaleX: stage === 'bud' ? 0.4 : 1.0,
                  }}
                  transition={{
                    duration: 1.6,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: '100px 100px' }}
                />
              ))}
            </motion.g>

            {/* Layer 2: Middle Petals (6 petals, offset rotation) */}
            <motion.g
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: stage === 'bud' ? 0.45 : stage === 'blooming' ? 0.85 : 0.95,
                opacity: 1,
              }}
              transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: '100px 100px' }}
            >
              {[22.5, 82.5, 142.5, 202.5, 262.5, 322.5].map((angle, idx) => (
                <motion.path
                  key={`mid-${angle}`}
                  d="M 100 100 C 85 70, 75 38, 100 20 C 125 38, 115 70, 100 100 Z"
                  fill="url(#midPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.75"
                  strokeOpacity="0.7"
                  transform={`rotate(${angle} 100 100)`}
                  initial={{ scaleY: 0.3 }}
                  animate={{
                    scaleY: stage === 'bud' ? 0.5 : 1.0,
                    scaleX: stage === 'bud' ? 0.4 : 1.0,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.15 + idx * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: '100px 100px' }}
                />
              ))}
            </motion.g>

            {/* Layer 3: Inner Petals (5 petals, graceful blossom) */}
            <motion.g
              initial={{ scale: 0.4 }}
              animate={{
                scale: stage === 'bud' ? 0.6 : stage === 'blooming' ? 0.9 : 1.0,
              }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: '100px 100px' }}
            >
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <motion.path
                  key={`inner-${angle}`}
                  d="M 100 100 C 88 78, 80 50, 100 35 C 120 50, 112 78, 100 100 Z"
                  fill="url(#innerPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  strokeOpacity="0.85"
                  transform={`rotate(${angle} 100 100)`}
                  initial={{ scaleY: 0.4 }}
                  animate={{
                    scaleY: stage === 'bud' ? 0.6 : 1.0,
                    scaleX: stage === 'bud' ? 0.5 : 1.0,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + idx * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: '100px 100px' }}
                />
              ))}
            </motion.g>

            {/* Layer 4: Golden Heart / Pistils */}
            <circle cx="100" cy="100" r="22" fill="url(#centerGlow)" />
            <motion.circle
              cx="100"
              cy="100"
              r="10"
              fill="#fef08a"
              animate={{
                scale: [1.0, 1.2, 1.0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '100px 100px' }}
              className="drop-shadow-[0_0_12px_rgba(254,240,138,0.9)]"
            />

            {/* Stamen Stardust Dots */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 100 + Math.cos(rad) * 12;
              const cy = 100 + Math.sin(rad) * 12;
              return (
                <circle
                  key={`stamen-${angle}`}
                  cx={cx}
                  cy={cy}
                  r="2.2"
                  fill="#fff"
                  className="drop-shadow-[0_0_6px_rgba(255,255,255,1)]"
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Floating Detached Rose Petals */}
        {stage !== 'bud' && !prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {floatingPetals.map((petal) => (
              <motion.div
                key={petal.id}
                initial={{
                  x: petal.startX,
                  y: petal.startY,
                  rotate: petal.rotation,
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  x: petal.endX,
                  y: petal.endY,
                  rotate: petal.endRotation,
                  opacity: [0, 0.85, 0.9, 0],
                  scale: petal.scale,
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute w-4 h-6 sm:w-5 sm:h-7 rounded-[60%_40%_70%_30%/50%_60%_40%_50%] bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.6)] backdrop-blur-sm"
              />
            ))}
          </div>
        )}

        {/* Sparkle Particles Burst */}
        {stage === 'full' && !prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                  x: sp.x,
                  y: sp.y,
                }}
                transition={{
                  duration: 1.2,
                  delay: sp.delay,
                  ease: 'easeOut',
                }}
                className="absolute text-amber-300 pointer-events-none"
              >
                <Sparkles style={{ width: sp.size, height: sp.size }} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Emotional Text Reveal Section */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-[90px] text-center max-w-md pb-6 sm:pb-10">
        <AnimatePresence mode="wait">
          {textStage === 1 && (
            <motion.p
              key="line1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-base sm:text-xl font-serif italic text-pink-200/90 tracking-wide font-light"
            >
              {flowerConfig?.line1 ?? 'A little something beautiful...'}
            </motion.p>
          )}

          {textStage === 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-lg sm:text-2xl font-serif font-medium text-pink-50 drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]"
            >
              <span>{flowerConfig?.line2 ?? 'Just for you, Bujjama. ❤️'}</span>
              <Heart className="w-5 h-5 text-pink-400 fill-pink-500 animate-pulse shrink-0" />
            </motion.div>
          )}

          {textStage === 3 && (
            <motion.p
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-sm sm:text-base font-sans uppercase tracking-[0.25em] text-pink-300/90 font-medium"
            >
              {flowerConfig?.readyText ?? 'Ready? ✨'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
