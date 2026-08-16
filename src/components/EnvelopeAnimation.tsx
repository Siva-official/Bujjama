import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Mail } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface EnvelopeAnimationProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({
  isOpen,
  onOpen,
}) => {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto my-4 sm:my-8 px-4 flex flex-col items-center justify-center select-none z-20">
      {/* Ambient Pulsing Aura around envelope */}
      <motion.div
        animate={{
          scale: isOpen ? [1, 1.2, 1.1] : [1, 1.06, 1],
          opacity: isOpen ? 0.35 : [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-pink-600/30 via-purple-600/25 to-rose-600/30 blur-2xl pointer-events-none -z-10"
      />

      {/* Main Interactive Envelope Container */}
      <motion.div
        layout
        whileHover={!isOpen ? { scale: 1.02, y: -4 } : {}}
        whileTap={!isOpen ? { scale: 0.98 } : {}}
        onClick={!isOpen ? onOpen : undefined}
        className={`relative w-full aspect-[16/11] max-w-[360px] sm:max-w-[420px] rounded-2xl sm:rounded-3xl border transition-all duration-700 ${
          !isOpen ? 'cursor-pointer hover:border-pink-400/60' : 'cursor-default'
        } ${
          isOpen
            ? 'bg-gradient-to-b from-[#2a101d] via-[#1a0812] to-[#0f040b] border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.3)]'
            : 'bg-gradient-to-b from-[#200b17] via-[#160610] to-[#0a0207] border-pink-400/30 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_30px_rgba(236,72,153,0.15)]'
        } overflow-visible`}
        style={{ perspective: 1000 }}
        role={!isOpen ? 'button' : undefined}
        tabIndex={!isOpen ? 0 : undefined}
        aria-label="Birthday letter envelope"
        onKeyDown={(e) => {
          if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {/* Envelope Top Flap (3D Folding Flap) */}
        <motion.div
          initial={false}
          animate={{
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 1 : 15,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          className="absolute top-0 inset-x-0 h-1/2 pointer-events-none"
        >
          {/* Triangular top flap SVG */}
          <svg
            viewBox="0 0 400 130"
            preserveAspectRatio="none"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <polygon
              points="0,0 400,0 200,130"
              className="fill-[#2a0e20] stroke-pink-400/30 stroke-1"
            />
          </svg>

          {/* Wax Seal / Heart Button on Flap */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-[80px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 border border-amber-200/50 shadow-[0_0_20px_rgba(236,72,153,0.8)] flex items-center justify-center pointer-events-none z-30"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-sm" />
            </motion.div>
          )}
        </motion.div>

        {/* Letter Peeking / Sliding Out of the Envelope */}
        <motion.div
          initial={false}
          animate={{
            y: isOpen ? -90 : 0,
            opacity: isOpen ? 1 : 0.85,
            scale: isOpen ? 1.05 : 0.94,
          }}
          transition={{
            duration: 0.9,
            delay: isOpen ? 0.25 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-x-5 top-5 bottom-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#fdfbf7] via-[#f7f0e6] to-[#eddcc7] shadow-xl p-4 flex flex-col justify-between select-none z-10 border border-amber-200/60 overflow-hidden"
        >
          {/* Faux letter lined preview */}
          <div>
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-2 mb-2">
              <span className="text-[10px] sm:text-xs font-serif italic text-amber-900/70 font-semibold">
                {birthdayConfig.letter.greeting}
              </span>
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            </div>
            <div className="space-y-1.5 opacity-60">
              <div className="w-4/5 h-1.5 bg-amber-900/20 rounded-full" />
              <div className="w-full h-1.5 bg-amber-900/20 rounded-full" />
              <div className="w-3/4 h-1.5 bg-amber-900/20 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-amber-900/50 font-serif italic">
            <span>Special Delivery</span>
            <span className="font-script-romantic text-xs text-rose-800">
              {birthdayConfig.letter.signatureName}
            </span>
          </div>
        </motion.div>

        {/* Envelope Front Left & Right Pocket Folds */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Bottom Fold */}
          <svg
            viewBox="0 0 400 260"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Left triangle */}
            <polygon
              points="0,0 200,130 0,260"
              className="fill-[#1b0814]/90 stroke-pink-500/15 stroke-1"
            />
            {/* Right triangle */}
            <polygon
              points="400,0 200,130 400,260"
              className="fill-[#1b0814]/90 stroke-pink-500/15 stroke-1"
            />
            {/* Bottom triangle */}
            <polygon
              points="0,260 400,260 200,130"
              className="fill-[#14050f]/95 stroke-pink-500/20 stroke-1"
            />
          </svg>

          {/* Front Title Label if closed */}
          {!isOpen && (
            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-[11px] text-pink-200/90 font-serif italic">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Tap to Open Letter</span>
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
