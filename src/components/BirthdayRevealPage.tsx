import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { AnimatedCake } from './AnimatedCake';
import { WishButton } from './WishButton';
import { RomanticConfetti } from './RomanticConfetti';

interface BirthdayRevealPageProps {
  onBackToPage1?: () => void;
  onContinueToPage3?: () => void;
}

export const BirthdayRevealPage: React.FC<BirthdayRevealPageProps> = ({
  onBackToPage1,
  onContinueToPage3,
}) => {
  const [isWishMade, setIsWishMade] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Scroll to top on initial page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMakeWish = () => {
    setIsWishMade(true);
    setShowConfetti(true);

    // Stop confetti after 6 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  const handleResetWish = () => {
    setIsWishMade(false);
    setShowConfetti(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080205] text-white overflow-x-hidden font-sans select-none pb-16">
      {/* Atmosphere Multi-Gradient Layer */}
      <div className="atmosphere" aria-hidden="true" />

      {/* Atmospheric Tilted Ambient Heart Background */}
      <div className="heart-shape-ambient" aria-hidden="true">
        ❤
      </div>

      {/* Background Star & Particle Canvas */}
      <RomanticBackgroundCanvas />

      {/* Confetti Explosion on Wish */}
      <RomanticConfetti isActive={showConfetti} />

      {/* Floating Audio Controller */}
      <RomanticAudioPlayer />

      {/* Ambient Lighting Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-b from-pink-600/15 via-purple-700/12 to-transparent rounded-full blur-[130px]" />
        <div className="absolute top-[45%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Navigation Bar with Back Option & Chapter Badge */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        {onBackToPage1 ? (
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={onBackToPage1}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-pink-400/40 text-xs text-slate-300 hover:text-pink-200 backdrop-blur-md transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Start</span>
          </motion.button>
        ) : (
          <div />
        )}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span className="font-sans tracking-[0.25em] text-[10px] sm:text-xs uppercase text-pink-200/90 font-medium">
            Chapter • 02
          </span>
          <span className="w-1 h-1 rounded-full bg-pink-400/60" />
          <span className="font-serif italic text-xs sm:text-sm text-pink-300">
            Happy Birthday, Bujjama
          </span>
        </motion.div>
      </header>

      {/* Main Page 2 Container */}
      <main className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 flex flex-col items-center">
        {/* ================= OPENING SECTION ================= */}
        <div className="w-full text-center mb-6 sm:mb-8">
          {/* Date pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-serif tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{birthdayConfig.page2.date}</span>
          </motion.div>

          {/* Main Heading: "Happy Birthday, Bujjama! 🎂❤️" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative px-2 max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_4px_45px_rgba(244,114,182,0.4)]">
              Happy Birthday,{' '}
              <span className="text-shimmer font-semibold block sm:inline mt-1 sm:mt-0">
                {birthdayConfig.herName}!
              </span>{' '}
              <span className="text-pink-500 inline-block align-middle ml-1">
                🎂❤️
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif italic text-base sm:text-xl text-pink-200/80 font-light mt-3 tracking-wide"
          >
            {birthdayConfig.page2.cakeSubtitle}
          </motion.p>
        </div>

        {/* ================= BIRTHDAY CAKE SECTION ================= */}
        <AnimatedCake isWishMade={isWishMade} />

        {/* ================= MAKE A WISH INTERACTION ================= */}
        <WishButton
          isWishMade={isWishMade}
          onMakeWish={handleMakeWish}
          onResetWish={handleResetWish}
        />

        {/* ================= CONTINUE BUTTON TO CHAPTERS ================= */}
        {onContinueToPage3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 sm:mt-12 flex justify-center w-full"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onContinueToPage3}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-600/40 via-purple-600/35 to-rose-600/40 border border-pink-400/50 hover:border-pink-300 text-pink-50 font-serif text-base sm:text-lg tracking-wider shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] backdrop-blur-xl transition-all duration-300 cursor-pointer group"
            >
              <span>{birthdayConfig.page2.continueButtonText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BirthdayRevealPage;
