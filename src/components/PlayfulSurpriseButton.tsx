import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface PlayfulSurpriseButtonProps {
  isUnlocked: boolean;
  onOpenSurprise: () => void;
  externalTease?: string;
  disabled?: boolean;
}

export const PlayfulSurpriseButton: React.FC<PlayfulSurpriseButtonProps> = ({
  isUnlocked,
  onOpenSurprise,
  externalTease,
  disabled = false,
}) => {
  const config = birthdayConfig.page1.playfulButton;
  const teasePhrases = birthdayConfig.page1.dateUnlock?.teaseMessages ?? [
    'Hehe... catch me 😜',
    'Almost! 😂',
    'Not that easy... 👀',
    'Tell me the date first! 🎂',
    'You can’t catch me 😜',
  ];

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [teaseIndex, setTeaseIndex] = useState<number>(0);
  const [clickSparkles, setClickSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [accessibilityNotice, setAccessibilityNotice] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const initialButtonRectRef = useRef<DOMRect | null>(null);
  const lastEscapeTime = useRef<number>(0);
  const isEscapingRef = useRef<boolean>(false);
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update current pos ref on state change
  useEffect(() => {
    currentPosRef.current = position;
  }, [position]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Store initial button rect for calculation reference
  useEffect(() => {
    if (buttonRef.current) {
      initialButtonRectRef.current = buttonRef.current.getBoundingClientRect();
    }
  }, []);

  // When date is unlocked, smoothly return button to original centered position
  useEffect(() => {
    if (isUnlocked) {
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      currentPosRef.current = { x: 0, y: 0 };
    }
  }, [isUnlocked]);

  /**
   * Find a safe escape position:
   * 1. Calculate direction vector pointing AWAY from cursor (never towards cursor)
   * 2. Generate candidate positions (up to 50 attempts)
   * 3. Ensure distance from cursor > SAFE_DISTANCE (180px on desktop, 120px on mobile)
   * 4. Ensure button stays completely within screen & container safe bounds
   */
  const findSafeButtonPosition = useCallback(
    (cursorX: number, cursorY: number) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

      const SAFE_DISTANCE = isMobile ? 120 : isTablet ? 160 : 190;
      const maxRangeX = isMobile ? 70 : isTablet ? 120 : 150;
      const maxRangeY = isMobile ? 32 : 50;

      // Base origin in viewport
      let originCenterX = window.innerWidth / 2;
      let originCenterY = window.innerHeight / 2;

      if (containerRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        originCenterX = cRect.left + cRect.width / 2;
        originCenterY = cRect.top + cRect.height / 2;
      }

      // Direction vector FROM cursor TO button center (points away from cursor)
      const currentCenterX = originCenterX + currentPosRef.current.x;
      const currentCenterY = originCenterY + currentPosRef.current.y;

      let awayVectorX = currentCenterX - cursorX;
      let awayVectorY = currentCenterY - cursorY;
      const len = Math.hypot(awayVectorX, awayVectorY);

      if (len > 0.001) {
        awayVectorX /= len;
        awayVectorY /= len;
      } else {
        // Cursor is directly on center; push down or sideways
        awayVectorX = Math.random() > 0.5 ? 1 : -1;
        awayVectorY = Math.random() > 0.5 ? 1 : -1;
      }

      const baseAngle = Math.atan2(awayVectorY, awayVectorX);

      let bestPosition = { x: 0, y: 0 };
      let maxFoundDist = -1;

      // Try 50 candidates
      for (let i = 0; i < 50; i++) {
        // Fan out angles: biased around baseAngle ± 80 degrees
        const angleSpread = ((Math.random() - 0.5) * Math.PI * 0.9);
        const candidateAngle = baseAngle + angleSpread;

        // Distance jump
        const distStepX = Math.random() * (maxRangeX - 35) + 35;
        const distStepY = Math.random() * (maxRangeY - 15) + 15;

        let candX = Math.cos(candidateAngle) * distStepX;
        let candY = Math.sin(candidateAngle) * distStepY;

        // Clamp to allowed range
        candX = Math.max(-maxRangeX, Math.min(maxRangeX, candX));
        candY = Math.max(-maxRangeY, Math.min(maxRangeY, candY));

        // Evaluate candidate in viewport space
        const targetCenterX = originCenterX + candX;
        const targetCenterY = originCenterY + candY;

        const distToCursor = Math.hypot(targetCenterX - cursorX, targetCenterY - cursorY);

        // Keep button inside screen margins (16px from edges)
        const estButtonHalfWidth = isMobile ? 120 : 140;
        const isWithinScreen =
          targetCenterX - estButtonHalfWidth >= 16 &&
          targetCenterX + estButtonHalfWidth <= window.innerWidth - 16 &&
          targetCenterY >= 60 &&
          targetCenterY <= window.innerHeight - 40;

        if (isWithinScreen && distToCursor > SAFE_DISTANCE) {
          // Safe candidate found!
          const randomRotation = (Math.random() - 0.5) * 10;
          return {
            pos: { x: candX, y: candY },
            rot: randomRotation,
          };
        }

        // Track fallback with highest distance
        if (distToCursor > maxFoundDist && isWithinScreen) {
          maxFoundDist = distToCursor;
          bestPosition = { x: candX, y: candY };
        }
      }

      // Fallback to best available position
      return {
        pos: bestPosition,
        rot: (Math.random() - 0.5) * 8,
      };
    },
    []
  );

  /**
   * Escape trigger:
   * Updates coordinates away from (cursorX, cursorY)
   */
  const triggerEscape = useCallback(
    (cursorX: number, cursorY: number) => {
      if (isUnlocked) return;

      const now = Date.now();
      // Throttle by 60ms to prevent CPU saturation while reacting instantly to cursor approach
      if (now - lastEscapeTime.current < 60) return;
      lastEscapeTime.current = now;

      setTeaseIndex((prev) => (prev + 1) % teasePhrases.length);

      if (prefersReducedMotion) {
        setAccessibilityNotice('Nice try 😜 Enter the special date first!');
        return;
      }

      isEscapingRef.current = true;
      const { pos, rot } = findSafeButtonPosition(cursorX, cursorY);

      setPosition(pos);
      setRotation(rot);
      currentPosRef.current = pos;
    },
    [isUnlocked, prefersReducedMotion, teasePhrases.length, findSafeButtonPosition]
  );

  /**
   * Continuous mousemove tracking with large 180-200px proximity danger zone
   */
  useEffect(() => {
    if (isUnlocked || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || isUnlocked) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      // Calculate distance from cursor to closest edge of button rectangle
      const closestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const closestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      const edgeDistance = Math.hypot(e.clientX - closestX, e.clientY - closestY);

      // Also calculate center distance
      const centerDistance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);

      // Large proximity trigger (180px safe zone)
      const isMobile = window.innerWidth < 640;
      const dangerZone = isMobile ? 120 : 180;
      const edgeDangerZone = isMobile ? 80 : 130;

      if (edgeDistance < edgeDangerZone || centerDistance < dangerZone) {
        triggerEscape(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isUnlocked, prefersReducedMotion, triggerEscape]);

  /**
   * Pointer Down & Touch Handling:
   * Moves button away immediately on touch/pointer down BEFORE any click can fire
   */
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isUnlocked) {
      e.preventDefault();
      e.stopPropagation();
      triggerEscape(e.clientX, e.clientY);
    }
  };

  /**
   * Handle Click / Tap:
   * Hard-guarded: Page 2 NEVER opens before isUnlocked === true
   */
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    // STRICT GUARD: If date is not unlocked, never open Page 2
    if (!isUnlocked) {
      triggerEscape(e.clientX, e.clientY);
      return;
    }

    // Unlocked: Generate celebration sparkles and open Page 2
    const newSparkles = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 120,
    }));
    setClickSparkles(newSparkles);

    onOpenSurprise();
  };

  /**
   * Keyboard accessibility:
   * If focused via keyboard, does not run away, but requires date unlock first.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (disabled) return;
      if (!isUnlocked) {
        setAccessibilityNotice('Enter the special date first. ❤️');
        return;
      }
      onOpenSurprise();
    }
  };

  const getButtonText = () => {
    if (isUnlocked) {
      return config.unlockedText || 'Open Your Surprise 💝';
    }
    const teaseTexts = config.lockedTeaseTexts;
    return teaseTexts[teaseIndex % teaseTexts.length] || config.initialText;
  };

  const getSubMessage = () => {
    if (isUnlocked) {
      return 'Now you can open it ✨';
    }
    if (accessibilityNotice) {
      return accessibilityNotice;
    }
    if (externalTease) {
      return externalTease;
    }
    return teasePhrases[teaseIndex % teasePhrases.length];
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto min-h-[125px] sm:min-h-[140px] select-none"
    >
      {/* Spring Runaway Container */}
      <motion.div
        animate={{
          x: isUnlocked || prefersReducedMotion ? 0 : position.x,
          y: isUnlocked || prefersReducedMotion ? 0 : position.y,
          rotate: isUnlocked || prefersReducedMotion ? 0 : rotation,
        }}
        transition={{
          type: 'spring',
          stiffness: 480,
          damping: 22,
          mass: 0.7,
        }}
        className="relative z-20 flex items-center justify-center"
      >
        {/* Glow Aura */}
        <div
          className={`absolute -inset-2.5 bg-gradient-to-r ${
            isUnlocked
              ? 'from-pink-500 via-rose-500 to-amber-400 opacity-95 blur-xl animate-pulse'
              : 'from-pink-600 via-purple-600 to-rose-600 opacity-50 blur-lg'
          } rounded-full transition-all duration-300 pointer-events-none`}
        />

        {/* Semantic Action Button */}
        <motion.button
          ref={buttonRef}
          id="playful-surprise-button"
          type="button"
          aria-label="Open your birthday surprise"
          onPointerDown={handlePointerDown}
          onClick={handleButtonClick}
          onKeyDown={handleKeyDown}
          whileHover={{ scale: isUnlocked ? 1.06 : 1.02 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 w-full sm:w-auto min-h-[52px] sm:min-h-[58px] px-8 sm:px-11 py-3.5 sm:py-4 rounded-full backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center gap-3 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-[#080205] ${
            isUnlocked
              ? 'bg-gradient-to-r from-pink-600/80 via-purple-600/70 to-rose-600/80 border-2 border-pink-300 shadow-[0_0_50px_rgba(236,72,153,0.8)]'
              : 'bg-gradient-to-r from-pink-600/50 via-purple-600/40 to-pink-600/50 border border-pink-400/60 shadow-[0_0_30px_rgba(236,72,153,0.35)]'
          }`}
        >
          {isUnlocked && (
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin shrink-0 [animation-duration:3s]" />
          )}

          <span className="relative z-10 text-sm sm:text-base font-medium tracking-wider text-pink-50 uppercase flex items-center gap-2 whitespace-nowrap">
            {getButtonText()}
          </span>

          {isUnlocked ? (
            <Heart className="w-4 h-4 text-pink-300 fill-pink-400 animate-pulse shrink-0" />
          ) : (
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200 group-hover:translate-x-1.5 transition-transform shrink-0" />
          )}
        </motion.button>

        {/* Click Sparkles */}
        {clickSparkles.map((sp) => (
          <motion.span
            key={sp.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 2, x: sp.x, y: sp.y }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-pink-300 text-lg"
          >
            ✨
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle / Tease message underneath */}
      <div className="relative mt-3 h-6 flex items-center justify-center pointer-events-none text-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={isUnlocked ? 'unlocked' : teaseIndex + (accessibilityNotice || externalTease || '')}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`text-xs sm:text-sm font-sans tracking-wide transition-colors ${
              isUnlocked
                ? 'text-pink-300 font-medium font-serif drop-shadow-[0_0_10px_rgba(244,114,182,0.7)]'
                : 'text-pink-200/80 font-serif italic'
            }`}
          >
            {getSubMessage()}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
