import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Camera } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const MemoriesIntro: React.FC = () => {
  const p4 = birthdayConfig.page4;

  return (
    <header className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center select-none z-10">
      {/* Intro Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase mb-5 backdrop-blur-md shadow-sm"
      >
        <Camera className="w-3.5 h-3.5 text-pink-400" />
        <span className="font-medium">Chapter • 04</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
      </motion.div>

      {/* Small Intro Lead */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs sm:text-sm md:text-base font-serif italic text-pink-200/90 tracking-wide mb-2"
      >
        "{p4.introSmallText}"
      </motion.p>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-block mb-4"
      >
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif text-white font-bold leading-tight tracking-tight text-shimmer">
          {p4.heading}
        </h1>
      </motion.div>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs sm:text-base md:text-lg text-pink-100/80 font-serif italic max-w-2xl mx-auto leading-relaxed"
      >
        "{p4.subtext}"
      </motion.p>
    </header>
  );
};
