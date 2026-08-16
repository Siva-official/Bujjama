import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, BookOpen } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface ChaptersIntroProps {
  onBackToPage2: () => void;
}

export const ChaptersIntro: React.FC<ChaptersIntroProps> = ({ onBackToPage2 }) => {
  const p3 = birthdayConfig.page3;

  return (
    <header className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-4 text-center z-10 flex flex-col items-center">
      {/* Top Navigation & Chapter Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between mb-8 sm:mb-12 gap-3"
      >
        <button
          type="button"
          onClick={onBackToPage2}
          className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs sm:text-sm text-slate-300 hover:text-pink-300 backdrop-blur-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg"
          title="Return to Chapter 2: Happy Birthday"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Back to Birthday</span>
          <span className="xs:hidden">Back</span>
        </button>

        <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 backdrop-blur-xl shadow-lg">
          <BookOpen className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span className="font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs uppercase text-pink-200/90 font-medium whitespace-nowrap">
            Chapter • 03
          </span>
          <span className="w-1 h-1 rounded-full bg-pink-400/60" />
          <span className="font-serif italic text-xs sm:text-sm text-pink-300 whitespace-nowrap">
            Her Chapters
          </span>
        </div>
      </motion.div>

      {/* Intro Eyebrow Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 sm:mb-4"
      >
        <p className="text-pink-300/80 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium flex items-center justify-center gap-2 sm:gap-3">
          <span className="w-4 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-pink-400/60 inline-block" />
          {p3.introSmallText}
          <span className="w-4 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-pink-400/60 inline-block" />
        </p>
      </motion.div>

      {/* Main Display Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-5 sm:mb-6"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 blur-2xl rounded-full pointer-events-none -z-10" />

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif leading-tight tracking-tight text-white drop-shadow-[0_4px_35px_rgba(244,114,182,0.35)]">
          <span className="text-shimmer inline-block">
            {p3.introHeading}
          </span>
        </h1>
      </motion.div>

      {/* Supporting Text */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto px-2 mb-2"
      >
        <p className="text-base sm:text-lg md:text-xl text-pink-100/90 font-light leading-relaxed font-serif italic drop-shadow-sm">
          "{p3.introSubtext}"
        </p>
      </motion.div>
    </header>
  );
};
