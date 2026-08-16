import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Info, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface BirthdayHintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BirthdayHintModal: React.FC<BirthdayHintModalProps> = ({ isOpen, onClose }) => {
  const modalConfig = birthdayConfig.page1.hintModal;

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hint-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c0d16]/95 via-[#140810]/95 to-[#0d040a]/95 border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)] backdrop-blur-2xl text-center z-10 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Icon Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close hint modal"
              className="absolute top-4 right-4 p-2 rounded-full text-pink-300/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hint Icon Badge */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-500/20 border border-pink-400/40 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Info className="w-6 h-6 text-pink-300" />
            </div>

            {/* Title */}
            <h3
              id="hint-modal-title"
              className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 tracking-wide"
            >
              {modalConfig.title}
            </h3>

            {/* Lead description */}
            <p className="text-sm sm:text-base text-pink-200/90 font-sans leading-relaxed mb-4">
              {modalConfig.leadText}
            </p>

            {/* Question Box */}
            <div className="my-5 p-4 rounded-2xl bg-white/[0.04] border border-pink-500/20 text-left">
              <div className="flex items-center gap-2 mb-1.5 text-pink-300 font-serif font-semibold text-base sm:text-lg">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <span>{modalConfig.question}</span>
              </div>
              <p className="text-xs sm:text-sm text-pink-100/80 font-sans leading-relaxed flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 shrink-0 inline" />
                {modalConfig.hint}
              </p>
            </div>

            {/* Dismiss Button */}
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] border border-pink-400/40 transition-all cursor-pointer"
            >
              {modalConfig.closeButtonText}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
