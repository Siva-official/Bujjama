import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, FastForward, CheckCircle2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { LetterParagraph } from './LetterParagraph';
import { Signature } from './Signature';

interface LetterContentProps {
  isOpen: boolean;
  onFullyRevealed: () => void;
  isFullyRevealed: boolean;
}

export const LetterContent: React.FC<LetterContentProps> = ({
  isOpen,
  onFullyRevealed,
  isFullyRevealed,
}) => {
  const paragraphs = birthdayConfig.letter.paragraphs;
  const [revealedCount, setRevealedCount] = useState<number>(0);

  // Progressive reveal timer when envelope opens
  useEffect(() => {
    if (!isOpen) {
      setRevealedCount(0);
      return;
    }

    // Start with 1st paragraph
    setRevealedCount((prev) => (prev === 0 ? 1 : prev));

    const timer = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev < paragraphs.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          onFullyRevealed();
          return prev;
        }
      });
    }, 1100); // Steady gentle reveal pace

    return () => clearInterval(timer);
  }, [isOpen, paragraphs.length, onFullyRevealed]);

  // Handler to reveal all immediately
  const handleRevealAll = () => {
    setRevealedCount(paragraphs.length);
    onFullyRevealed();
  };

  const isAllRevealed = revealedCount >= paragraphs.length || isFullyRevealed;

  return (
    <div className="relative w-full max-w-3xl mx-auto px-3 xs:px-4 sm:px-6 my-6 sm:my-10 select-none z-20">
      {/* Quick Reveal / Speed Control Button if still animating */}
      {!isAllRevealed && isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mb-3 px-2"
        >
          <button
            onClick={handleRevealAll}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-pink-500/20 border border-white/10 hover:border-pink-400/50 text-pink-200 text-xs font-sans font-medium transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Reveal entire letter immediately"
          >
            <FastForward className="w-3.5 h-3.5 text-pink-300" />
            <span>Read Letter All At Once</span>
          </button>
        </motion.div>
      )}

      {/* Main Luxury Parchment Letter Card */}
      <motion.article
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#1c0d16]/95 via-[#160710]/95 to-[#0f030a]/95 border border-pink-400/35 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(236,72,153,0.2)] overflow-hidden"
      >
        {/* Top Gold & Rose Light Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400/70 to-transparent" />

        {/* Ambient Watermark Heart in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] text-pink-400">
          <Heart className="w-96 h-96 fill-current" />
        </div>

        {/* Letter Header / Greeting */}
        <header className="border-b border-pink-500/20 pb-5 sm:pb-7 mb-6 sm:mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-pink-400/70 block mb-1">
              Personal Letter
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight text-shimmer">
              {birthdayConfig.letter.greeting}
            </h2>
          </div>

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-300 shrink-0">
            <Heart className="w-5 h-5 fill-pink-500 text-pink-400 animate-pulse" />
          </div>
        </header>

        {/* Paragraphs Container */}
        <div className="space-y-4 sm:space-y-6">
          {paragraphs.map((p, idx) => (
            <LetterParagraph
              key={idx}
              text={p}
              index={idx}
              totalCount={paragraphs.length}
              isRevealed={idx < revealedCount}
            />
          ))}
        </div>

        {/* Handwritten Signature Section */}
        <Signature isVisible={isAllRevealed} />
      </motion.article>
    </div>
  );
};
