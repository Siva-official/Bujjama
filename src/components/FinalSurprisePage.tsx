import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Cake,
  Flame,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { CelebrationEffects } from './CelebrationEffects';
import { AnimatedCake } from './AnimatedCake';
import { Signature } from './Signature';

interface FinalSurprisePageProps {
  onBackToPage6: () => void;
  onRestartJourney: () => void;
}

export const FinalSurprisePage: React.FC<FinalSurprisePageProps> = ({
  onBackToPage6,
  onRestartJourney,
}) => {
  const [candleLit, setCandleLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [celebrationActive, setCelebrationActive] = useState<boolean>(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBlowCandle = () => {
    setCandleLit(false);
    setWishMade(true);
    setCelebrationActive(true);
  };

  const handleRelightCandle = () => {
    setCandleLit(true);
    setWishMade(false);
  };

  const herName = birthdayConfig.herName;
  const yourName = birthdayConfig.yourName;
  const p7 = birthdayConfig.page7;

  return (
    <div className="relative min-h-screen w-full bg-[#080205] text-white overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-100">
      {/* Background Interactive Stardust & Floating Particles Canvas */}
      <RomanticBackgroundCanvas />

      {/* Persistent Audio Ambience */}
      <RomanticAudioPlayer />

      {/* Celebration Confetti & Fireworks FX */}
      <CelebrationEffects active={celebrationActive} />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-rose-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <header className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex justify-between items-center">
        <button
          onClick={onBackToPage6}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-pink-200 text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer shadow-sm"
          aria-label="Go back to Chapter 6 letter"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Letter</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(236,72,153,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Final Chapter • 07</span>
        </div>
      </header>

      {/* Main Experience Flow */}
      <main className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6 pt-6 pb-24 text-center max-w-4xl mx-auto">
        {/* 1. Big, Warm, Cinematic Birthday Celebration Header */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase mb-1 backdrop-blur-md">
            <Cake className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Grand Finale & Birthday Celebration</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-tight text-shimmer">
            {p7.celebrationHeading}
          </h1>

          <p className="text-base sm:text-xl md:text-2xl font-serif italic text-pink-200/90 max-w-2xl mx-auto leading-relaxed">
            "{p7.celebrationSubtext}"
          </p>
        </motion.section>

        {/* 2. Interactive Cake & Candle Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto my-4 p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent border border-pink-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(236,72,153,0.25)] flex flex-col items-center"
        >
          {/* Animated SVG Cake Component */}
          <div className="w-full flex justify-center py-2">
            <AnimatedCake isWishMade={wishMade} />
          </div>

          {/* Candle Interaction Controls */}
          <div className="mt-6 flex flex-col items-center space-y-4 w-full">
            <AnimatePresence mode="wait">
              {candleLit ? (
                <motion.div
                  key="blow-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-pink-300 font-medium">
                    ✨ Close your eyes, make a wish, and blow the candle ✨
                  </p>
                  <button
                    type="button"
                    onClick={handleBlowCandle}
                    className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-serif text-base sm:text-lg font-semibold tracking-wide shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_rgba(245,158,11,0.8)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-amber-300/40"
                  >
                    <Flame className="w-5 h-5 text-amber-200 animate-pulse" />
                    <span>Blow Out The Candle 🎂</span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="wish-granted"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="p-4 sm:p-6 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-center shadow-lg">
                    <p className="text-lg sm:text-2xl font-serif font-bold text-white text-shimmer mb-1">
                      🎉 May all your secret wishes come true, {herName}! 🎉
                    </p>
                    <p className="text-xs sm:text-sm font-serif italic text-pink-200">
                      The universe has registered your wish. ❤️
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRelightCandle}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-200 text-xs sm:text-sm font-sans transition-all cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-amber-300" />
                    <span>Light the Candle Again 🕯️</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* 3. Final Words From Siva */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto my-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-black/70 border border-pink-400/40 backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.2)] text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs uppercase tracking-widest font-mono">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400" />
            <span>Final Words</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight text-shimmer">
            {p7.finalWordsHeading}
          </h2>

          <p className="text-base sm:text-xl font-serif italic text-pink-100/95 leading-relaxed max-w-xl mx-auto">
            "{p7.finalWordsMessage}"
          </p>

          {/* Handwritten Signature */}
          <Signature
            closingText="With all my love & best wishes,"
            signatureName={yourName}
          />
        </motion.section>

        {/* 4. Replay Journey Button */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 mb-12 flex flex-col items-center space-y-3"
        >
          <button
            type="button"
            onClick={onRestartJourney}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-white/[0.08] hover:bg-pink-600/30 border border-white/20 hover:border-pink-400/60 text-white font-serif text-base sm:text-lg font-medium transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Start birthday journey from the beginning"
          >
            <RotateCcw className="w-5 h-5 text-pink-300 group-hover:-rotate-180 transition-transform duration-500" />
            <span>{p7.replayButtonText}</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </button>

          <p className="text-xs text-pink-300/60 font-sans tracking-wide">
            You can experience this birthday journey again anytime.
          </p>
        </motion.section>
      </main>
    </div>
  );
};
