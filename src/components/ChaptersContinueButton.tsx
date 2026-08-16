import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Camera } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface ChaptersContinueButtonProps {
  onContinueToPage4?: () => void;
}

export const ChaptersContinueButton: React.FC<ChaptersContinueButtonProps> = ({
  onContinueToPage4,
}) => {
  const handleClick = () => {
    if (onContinueToPage4) {
      onContinueToPage4();
    }
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 my-10 sm:my-16 text-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-full bg-pink-500/15 border border-pink-400/30 flex items-center justify-center mb-4 text-pink-300 shadow-[0_0_25px_rgba(236,72,153,0.3)]">
          <Camera className="w-6 h-6 text-pink-300 animate-pulse" />
        </div>

        <p className="text-pink-300/80 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-2">
          Her Memories
        </p>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-6 max-w-lg leading-snug text-shimmer">
          Let's look at the moments that made these chapters special. 📸
        </h3>

        <div className="relative group w-full sm:w-auto flex justify-center">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 rounded-full blur-md opacity-40 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />

          <motion.button
            id="open-memories-button"
            type="button"
            onClick={handleClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-10 w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-600/40 via-purple-600/40 to-amber-600/30 border border-pink-400/50 hover:border-pink-300 text-sm sm:text-base font-serif text-white shadow-[0_0_35px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3 cursor-pointer transition-all duration-300"
          >
            <span className="tracking-wide whitespace-nowrap">
              {birthdayConfig.page3.continueButtonText}
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
