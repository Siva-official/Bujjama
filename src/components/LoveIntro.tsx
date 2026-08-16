import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const LoveIntro: React.FC = () => {
  return (
    <header className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center select-none z-10">
      {/* Intro Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase mb-5 backdrop-blur-md shadow-sm"
      >
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400 animate-pulse" />
        <span className="font-medium">Chapter • 05</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
      </motion.div>

      {/* Main Cinematic Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-block mb-4"
      >
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif text-white font-bold leading-tight tracking-tight text-shimmer">
          What I Love About {birthdayConfig.herName} ✨
        </h1>
      </motion.div>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs sm:text-base md:text-lg text-pink-100/80 font-serif italic max-w-2xl mx-auto leading-relaxed mb-6"
      >
        "A few little things that make you truly special."
      </motion.p>

      {/* Reveal Prompt Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-pink-200 text-xs sm:text-sm font-sans"
      >
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
        <span className="font-serif italic">Tap each card to read what makes it special</span>
      </motion.div>
    </header>
  );
};
