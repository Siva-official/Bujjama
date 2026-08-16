import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';

interface BirthdayWelcomePageProps {
  onEnterPage2: () => void;
}

export const BirthdayWelcomePage: React.FC<BirthdayWelcomePageProps> = ({ onEnterPage2 }) => {
  const [clickSparkles, setClickSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleOpenSurprise = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();

    // Generate soft sparkle burst coordinates
    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 100,
    }));
    setClickSparkles(newSparkles);

    // Directly open Page 2
    onEnterPage2();
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
      <div className="relative z-10 w-full max-w-xl px-2 sm:px-6 flex flex-col items-center justify-center my-auto py-8 sm:py-12 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.2,
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
            className="relative mb-4 sm:mb-6"
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
            className="mb-3 max-w-md"
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
            className="mb-6 sm:mb-8 max-w-md"
          >
            <p className="text-sm sm:text-base text-pink-200/80 font-sans font-light leading-relaxed">
              {birthdayConfig.page1.line2}
            </p>
          </motion.div>

          {/* 3. Date Badge: "17 August ✨" with floating animation */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mb-8 sm:mb-10 animate-float"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/25 via-purple-500/20 to-pink-500/25 border border-pink-400/50 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:border-pink-300 transition-colors">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="font-serif text-base sm:text-lg text-pink-100 font-medium tracking-wider">
                {birthdayConfig.page1.dateBadge}
              </span>
            </div>
          </motion.div>

          {/* 4. Action Button: "Open Your Surprise 💝" */}
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
            className="relative group w-full sm:w-auto flex justify-center z-20"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 rounded-full blur-md opacity-50 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none animate-glow-pulse" />

            <motion.button
              type="button"
              onClick={handleOpenSurprise}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative z-10 w-full sm:w-auto min-h-[52px] sm:min-h-[58px] px-9 sm:px-12 py-3.5 sm:py-4 bg-gradient-to-r from-pink-600/50 via-purple-600/40 to-pink-600/50 border border-pink-400/60 hover:border-pink-300 rounded-full backdrop-blur-xl transition-all duration-300 shadow-[0_0_35px_rgba(236,72,153,0.4)] hover:shadow-[0_0_55px_rgba(236,72,153,0.7)] cursor-pointer overflow-hidden flex items-center justify-center gap-3 active:scale-95"
            >
              <span className="relative z-10 text-sm sm:text-base font-medium tracking-wider text-pink-50 uppercase flex items-center gap-2 whitespace-nowrap">
                {birthdayConfig.page1.buttonText}
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </motion.button>

            {/* Click Sparkles */}
            {clickSparkles.map((sp) => (
              <motion.span
                key={sp.id}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.8, x: sp.x, y: sp.y }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-pink-300 text-lg"
              >
                ✨
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <motion.footer
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={onEnterPage2}
        className="pt-4 pb-2 z-10 flex flex-col items-center text-slate-400/70 hover:text-pink-300 transition-colors cursor-pointer"
        title="Tap to continue"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-1.5 text-center">
          A special journey awaits
        </span>
        <svg className="w-4 h-4 text-pink-400/80 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.footer>
    </main>
  );
};
