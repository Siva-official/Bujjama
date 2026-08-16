import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Info } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { PlayfulSurpriseButton } from './PlayfulSurpriseButton';
import { BirthdayDateInput } from './BirthdayDateInput';
import { BirthdayHintModal } from './BirthdayHintModal';
import { FlowerTransition } from './FlowerTransition';

interface BirthdayWelcomePageProps {
  onEnterPage2: () => void;
}

export const BirthdayWelcomePage: React.FC<BirthdayWelcomePageProps> = ({ onEnterPage2 }) => {
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [dateUnlocked, setDateUnlocked] = useState<boolean>(false);
  const [latestTeaseMessage, setLatestTeaseMessage] = useState<string>('');
  const [isFlowerTransitioning, setIsFlowerTransitioning] = useState<boolean>(false);

  const handleDateUnlock = () => {
    setDateUnlocked(true);
    setLatestTeaseMessage('That’s it! You got the date right. ❤️');
  };

  const handleWrongAttempt = (msg: string) => {
    setLatestTeaseMessage(msg);
  };

  const handleStartTransition = () => {
    if (!dateUnlocked || isFlowerTransitioning) return;
    setIsFlowerTransitioning(true);
  };

  return (
    <main className="relative w-full min-h-screen min-h-[100dvh] overflow-x-hidden overflow-y-auto bg-[#080205] flex flex-col justify-between items-center select-none text-white font-sans py-6 sm:py-10 px-4 sm:px-6">
      {/* Atmosphere Multi-Gradient Layer */}
      <div className="atmosphere" aria-hidden="true" />

      {/* Ambient Heart Background */}
      <div className="heart-shape-ambient" aria-hidden="true">
        ❤
      </div>

      {/* Atmospheric Canvas Animation */}
      <RomanticBackgroundCanvas />

      {/* Ambient Accent Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -bottom-24 -left-24 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[5%] right-[5%] w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,2,5,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Audio Player in Top Corner */}
      <RomanticAudioPlayer />

      {/* Top Chapter Pill */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="pt-2 z-10 flex items-center justify-center w-full"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse shrink-0" />
          <span className="font-sans tracking-[0.25em] text-[10px] sm:text-xs uppercase text-pink-200/80 font-medium whitespace-nowrap">
            Chapter • 01
          </span>
          <span className="w-1 h-1 rounded-full bg-pink-400/60" />
          <span className="font-serif italic text-xs sm:text-sm text-pink-300 whitespace-nowrap">
            The Surprise Begins
          </span>
        </div>
      </motion.header>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl px-2 sm:px-6 flex flex-col items-center justify-center my-auto py-6 sm:py-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.15,
              },
            },
          }}
          className="flex flex-col items-center w-full"
        >
          {/* 1. Large Greeting: "Hey, Bujjama ❤️" */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="relative mb-3 sm:mb-4"
          >
            {/* Ambient subtle heart halo behind name */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-20 sm:h-28 bg-pink-500/20 rounded-full blur-2xl pointer-events-none -z-10 animate-subtle-pulse" />

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-[0_4px_35px_rgba(244,114,182,0.35)]">
              Hey,{' '}
              <span className="text-shimmer font-semibold">
                {birthdayConfig.herName}
              </span>{' '}
              <span className="text-pink-500 inline-block align-middle ml-1 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-heart-beat">
                ❤️
              </span>
            </h1>
          </motion.div>

          {/* 2. Mystery Lines */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mb-2 max-w-md"
          >
            <p className="text-lg sm:text-2xl text-slate-200 font-serif italic font-light tracking-wide">
              "{birthdayConfig.page1.line1}"
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mb-4 sm:mb-5 max-w-md"
          >
            <p className="text-sm sm:text-base text-pink-200/80 font-sans font-light leading-relaxed">
              {birthdayConfig.page1.line2}
            </p>
          </motion.div>

          {/* 3. Small Information Button: "A Little Hint ℹ️" */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mb-6 animate-float"
          >
            <button
              type="button"
              id="birthday-hint-button"
              onClick={() => setIsHintOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-pink-500/20 border border-pink-400/40 hover:border-pink-300 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] transition-all cursor-pointer group"
            >
              <Info className="w-3.5 h-3.5 text-pink-300 group-hover:scale-110 transition-transform" />
              <span className="font-serif text-xs sm:text-sm text-pink-100 font-medium tracking-wide">
                {birthdayConfig.page1.hintButtonText}
              </span>
            </button>
          </motion.div>

          {/* 4. Birthday Date Input Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="w-full flex justify-center z-10"
          >
            <BirthdayDateInput
              isUnlocked={dateUnlocked}
              onUnlock={handleDateUnlock}
              onWrongAttempt={handleWrongAttempt}
            />
          </motion.div>

          {/* 5. Playful Action Button: Runaway interaction with "Open Your Surprise 💝" */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 15 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
              },
            }}
            className="w-full flex justify-center z-20"
          >
            <PlayfulSurpriseButton
              isUnlocked={dateUnlocked}
              onOpenSurprise={handleStartTransition}
              externalTease={latestTeaseMessage}
              disabled={isFlowerTransitioning}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Hint Modal */}
      <BirthdayHintModal
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
      />

      {/* Cinematic Flower Bloom Transition Overlay */}
      {isFlowerTransitioning && (
        <FlowerTransition onComplete={onEnterPage2} />
      )}

      {/* Bottom Hint */}
      <motion.footer
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={dateUnlocked ? handleStartTransition : () => setIsHintOpen(true)}
        className="pt-2 pb-2 z-10 flex flex-col items-center text-slate-400/70 hover:text-pink-300 transition-colors cursor-pointer"
        title="Tap for a hint or continue"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-1.5 text-center">
          {dateUnlocked ? 'Your surprise is ready' : 'Enter the special date to unlock'}
        </span>
        <svg className="w-4 h-4 text-pink-400/80 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.footer>
    </main>
  );
};
