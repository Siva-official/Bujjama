import React from 'react';
import { motion } from 'motion/react';
import { Heart, Mail, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface LetterIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const LetterIntro: React.FC<LetterIntroProps> = ({ onOpen, isOpen }) => {
  return (
    <header className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-6 text-center select-none z-10">
      {/* Chapter 06 Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase mb-4 backdrop-blur-md shadow-sm"
      >
        <Mail className="w-3.5 h-3.5 text-pink-400" />
        <span className="font-medium">Chapter • 06</span>
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400 animate-pulse" />
      </motion.div>

      {/* Main Cinematic Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-block mb-3"
      >
        <div className="absolute -top-3 -left-6 text-amber-300/80 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute -bottom-2 -right-6 text-pink-400/80 animate-pulse delay-300">
          <Sparkles className="w-5 h-5" />
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif text-white font-bold leading-tight tracking-tight text-shimmer">
          A Letter From {birthdayConfig.yourName} ✉️
        </h1>
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs sm:text-base md:text-lg text-pink-200/85 font-serif italic max-w-xl mx-auto leading-relaxed mb-6"
      >
        From <span className="font-semibold text-pink-100">{birthdayConfig.yourName}</span>, written especially for <span className="font-semibold text-pink-100">{birthdayConfig.herName}</span>. ❤️
      </motion.p>

      {/* Open Button (Only when not yet opened) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2"
        >
          <button
            onClick={onOpen}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-serif text-base sm:text-lg font-semibold tracking-wide shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:shadow-[0_0_55px_rgba(236,72,153,0.9)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-pink-300/40"
            aria-label="Open personal birthday letter"
          >
            <Mail className="w-5 h-5 text-pink-200 group-hover:scale-110 transition-transform" />
            <span>Open The Letter 💌</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </button>
        </motion.div>
      )}
    </header>
  );
};
