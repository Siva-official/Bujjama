import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface SignatureProps {
  isVisible?: boolean;
  closingText?: string;
  signatureName?: string;
}

export const Signature: React.FC<SignatureProps> = ({
  isVisible = true,
  closingText,
  signatureName,
}) => {
  const closing = closingText || birthdayConfig.letter.closing || 'With lots of love,';
  const yourName = signatureName || birthdayConfig.yourName || birthdayConfig.letter.signatureName || 'Siva ❤️';

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-8 sm:mt-10 pt-6 border-t border-pink-500/20 text-center select-none"
    >
      <p className="text-sm sm:text-base font-serif italic text-pink-200/80 mb-2">
        {closing}
      </p>

      <div className="relative inline-block my-2">
        <span className="font-script-romantic text-4xl sm:text-5xl md:text-6xl text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.7)] tracking-wider block">
          {yourName}
        </span>

        {/* Animated Stroke Underline */}
        <svg
          viewBox="0 0 240 20"
          className="w-48 sm:w-64 h-4 text-pink-400/90 -mt-1 mx-auto overflow-visible"
        >
          <motion.path
            d="M 6 10 Q 120 18 234 8"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300/70 font-sans mt-3">
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
        <span>Written with all my heart</span>
      </div>
    </motion.div>
  );
};
