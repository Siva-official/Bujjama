import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface ContinueButtonProps {
  onBackToPage5?: () => void;
  onContinueToPage7?: () => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onBackToPage5,
  onContinueToPage7,
}) => {
  return (
    <footer className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-24 sm:pb-32 text-center select-none z-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-pink-300/80 mb-3"
      >
        The Final Chapter • 07 Next
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8 tracking-tight text-shimmer"
      >
        One Last Surprise Awaits... ✨
      </motion.h2>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
      >
        {onBackToPage5 && (
          <button
            onClick={onBackToPage5}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-pink-200 hover:text-white font-sans text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            aria-label="Go back to Chapter 5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to What I Love</span>
          </button>
        )}

        <button
          onClick={onContinueToPage7}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-serif text-base sm:text-lg font-semibold tracking-wide shadow-[0_0_35px_rgba(236,72,153,0.5)] hover:shadow-[0_0_55px_rgba(236,72,153,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-pink-400/40 group"
          aria-label="Continue to Final Surprise"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>The Final Surprise & Birthday Ending</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </footer>
  );
};
