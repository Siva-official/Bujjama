import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MessageCircle } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const SharedStoryMilestone: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const story = birthdayConfig.page3.sharedStoryMilestone;

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 my-12 sm:my-16 z-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-pink-950/40 border border-pink-400/40 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.2)] text-center overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

        {/* Date & Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs uppercase tracking-widest font-sans mb-4">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400 animate-pulse" />
          <span>{story.date}</span>
        </div>

        {/* Label: "And somewhere along the way... our story began." */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-bold mb-3 text-shimmer leading-snug">
          {story.label}
        </h3>

        {/* Interactive punchline reveal */}
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="tap-to-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <button
                onClick={() => setIsRevealed(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-pink-300" />
                <span>How did it start? (Tap to reveal)</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed-story"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-pink-400/30 max-w-lg mx-auto"
            >
              <p className="text-base sm:text-lg font-serif italic text-pink-100 font-medium">
                "{story.punchline}"
              </p>
              <p className="text-xs sm:text-sm font-sans text-pink-200/80 mt-1">
                {story.subtext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
