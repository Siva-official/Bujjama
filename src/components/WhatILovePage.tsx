import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { LoveIntro } from './LoveIntro';
import { QualityCards } from './QualityCards';
import { LoveContinueSection } from './LoveContinueSection';

interface WhatILovePageProps {
  onBackToPage4: () => void;
  onContinueToPage6?: () => void;
}

export const WhatILovePage: React.FC<WhatILovePageProps> = ({
  onBackToPage4,
  onContinueToPage6,
}) => {
  // Ensure page scrolls to top smoothly on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#080205] text-white overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-100">
      {/* Background Interactive Stardust & Floating Hearts Particle Canvas */}
      <RomanticBackgroundCanvas />

      {/* Persistent Audio Ambience */}
      <RomanticAudioPlayer />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Page Intro Entrance */}
        <LoveIntro />

        {/* The 9 Distinct Interactive Quality Cards */}
        <QualityCards />

        {/* Final Message ("And honestly...") & Transition to Page 6 */}
        <LoveContinueSection
          onBackToPage4={onBackToPage4}
          onContinueToPage6={onContinueToPage6}
        />
      </main>
    </div>
  );
};
