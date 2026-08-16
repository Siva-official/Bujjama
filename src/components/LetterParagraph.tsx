import React from 'react';
import { motion } from 'motion/react';

interface LetterParagraphProps {
  text: string;
  index: number;
  isRevealed: boolean;
  totalCount: number;
}

export const LetterParagraph: React.FC<LetterParagraphProps> = ({
  text,
  index,
  isRevealed,
  totalCount,
}) => {
  if (!isRevealed) return null;

  // Determine if it's the opening "Happy Birthday!" or closing special paragraph
  const isGreetingParagraph = index === 0;
  const isClosingBirthday = index === totalCount - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative ${
        isGreetingParagraph
          ? 'text-xl sm:text-2xl md:text-3xl font-serif font-bold text-rose-950 dark:text-pink-100 tracking-tight pt-1 pb-1'
          : isClosingBirthday
          ? 'text-lg sm:text-xl md:text-2xl font-serif font-semibold text-rose-900 dark:text-pink-200 tracking-tight pt-3 pb-1'
          : 'text-sm sm:text-base md:text-lg font-serif leading-relaxed sm:leading-loose text-neutral-800 dark:text-pink-50/90'
      }`}
    >
      <p className="tracking-wide">
        {text}
      </p>
    </motion.div>
  );
};
