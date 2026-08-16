import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface WishButtonProps {
  isWishMade: boolean;
  onMakeWish: () => void;
  onResetWish?: () => void;
}

export const WishButton: React.FC<WishButtonProps> = ({
  isWishMade,
  onMakeWish,
  onResetWish,
}) => {
  return (
    <div className="flex flex-col items-center justify-center my-6 w-full max-w-xl mx-auto px-4 text-center">
      <AnimatePresence mode="wait">
        {!isWishMade ? (
          <motion.div
            key="wish-prompt-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className="flex flex-col items-center"
          >
            {/* Prompt Text */}
            <p className="font-serif italic text-lg sm:text-2xl text-pink-200/90 font-light mb-6 tracking-wide drop-shadow-sm">
              "{birthdayConfig.page2.wishPrompt}"
            </p>

            {/* Glowing Make a Wish Button */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-90 transition-opacity duration-500 animate-glow-pulse" />

              <motion.button
                id="make-a-wish-button"
                onClick={onMakeWish}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center gap-3 px-9 sm:px-12 py-4 rounded-full bg-gradient-to-r from-pink-600/60 via-purple-600/40 to-amber-600/45 border border-pink-400/60 hover:border-pink-300 backdrop-blur-xl text-white font-sans font-medium text-base sm:text-lg tracking-wider shadow-[0_0_40px_rgba(244,114,182,0.4)] hover:shadow-[0_0_60px_rgba(244,114,182,0.7)] transition-all cursor-pointer group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 drop-shadow-md text-pink-50 font-serif">
                  {birthdayConfig.page2.wishButtonText}
                </span>
                <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Wish Granted Reveal Message */
          <motion.div
            key="wish-revealed-section"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center p-6 sm:p-8 rounded-3xl glass-card-immersive border border-pink-400/40 shadow-[0_0_50px_rgba(236,72,153,0.35)] relative overflow-hidden w-full max-w-lg"
          >
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 14 }}
              className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mb-4 text-pink-300 shadow-md shadow-pink-950/50"
            >
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400/30 animate-pulse" />
            </motion.div>

            {/* Wish Message 1 */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif italic text-lg sm:text-2xl text-white font-normal mb-3 text-shimmer leading-snug"
            >
              "{birthdayConfig.page2.wishMessage1}"
            </motion.p>

            {/* Wish Message 2 */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-sans text-sm sm:text-base text-pink-200/90 font-light tracking-wide mb-5"
            >
              {birthdayConfig.page2.wishMessage2}
            </motion.p>

            {onResetWish && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={onResetWish}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-pink-300 transition-colors px-3 py-1.5 rounded-full hover:bg-white/5 cursor-pointer"
                title="Relight candles & make another wish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Candles</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
