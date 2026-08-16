import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface LoveContinueSectionProps {
  onBackToPage4?: () => void;
  onContinueToPage6?: () => void;
}

export const LoveContinueSection: React.FC<LoveContinueSectionProps> = ({
  onBackToPage4,
  onContinueToPage6,
}) => {
  const ending = birthdayConfig.page5Ending;

  return (
    <footer className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-24 sm:pb-32 text-center select-none z-10">
      {/* Main Punchline Heading: "And honestly..." */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight text-shimmer"
      >
        {ending.heading}
      </motion.h2>

      {/* Subtext: "I could keep listing things, but I'd probably never finish. ❤️" */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-xl md:text-2xl text-pink-200/90 font-serif italic max-w-xl mx-auto leading-relaxed mb-8"
      >
        "{ending.subtext}"
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
      >
        {onBackToPage4 && (
          <button
            onClick={onBackToPage4}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-pink-200 hover:text-white font-sans text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Her Memories</span>
          </button>
        )}

        <button
          onClick={onContinueToPage6}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-serif text-base sm:text-lg font-semibold tracking-wide shadow-[0_0_35px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-pink-400/40 group"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{ending.continueButtonText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </footer>
  );
};
