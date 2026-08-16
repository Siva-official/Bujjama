import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface MemoriesContinueSectionProps {
  onBackToPage3: () => void;
  onContinueToPage5?: () => void;
}

export const MemoriesContinueSection: React.FC<MemoriesContinueSectionProps> = ({
  onBackToPage3,
  onContinueToPage5,
}) => {
  return (
    <footer className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-16 sm:my-24 z-10 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-pink-300/70 font-sans">
            Chapter • 05 Next
          </span>
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-semibold">
            What I Love About Bujjama ✨
          </h4>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onBackToPage3}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-sans tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Her Chapters</span>
          </button>

          <button
            type="button"
            onClick={onContinueToPage5}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-serif text-base sm:text-lg font-semibold tracking-wide shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_rgba(236,72,153,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>{birthdayConfig.page4.continueButtonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
