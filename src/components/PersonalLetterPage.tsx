import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { LetterIntro } from './LetterIntro';
import { EnvelopeAnimation } from './EnvelopeAnimation';
import { LetterCard } from './LetterCard';
import { ContinueButton } from './ContinueButton';

interface PersonalLetterPageProps {
  onBackToPage5: () => void;
  onContinueToPage7?: () => void;
}

export const PersonalLetterPage: React.FC<PersonalLetterPageProps> = ({
  onBackToPage5,
  onContinueToPage7,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);

  // Scroll to top smoothly on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080205] text-white overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-100">
      {/* Background Interactive Stardust & Floating Particles Canvas */}
      <RomanticBackgroundCanvas />

      {/* Persistent Audio Ambience */}
      <RomanticAudioPlayer />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Warm Centered Spotlight around Letter when opened */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-500/20 via-pink-500/30 to-purple-600/20 rounded-full blur-[160px] pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>

      {/* Main Page Container */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Intro Section */}
        <LetterIntro onOpen={handleOpenEnvelope} isOpen={isOpen} />

        {/* Envelope Animation Graphic */}
        <EnvelopeAnimation isOpen={isOpen} onOpen={handleOpenEnvelope} />

        {/* Letter Card (Slides open when envelope is opened) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <LetterCard
                isOpen={isOpen}
                onFullyRevealed={() => setIsFullyRevealed(true)}
                isFullyRevealed={isFullyRevealed}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Transition Section to Page 7 */}
        {isOpen && (
          <ContinueButton
            onBackToPage5={onBackToPage5}
            onContinueToPage7={onContinueToPage7}
          />
        )}
      </main>
    </div>
  );
};
