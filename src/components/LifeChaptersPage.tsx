import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { birthdayConfig } from '../config/birthdayConfig';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { ChaptersIntro } from './ChaptersIntro';
import { ChapterTimeline } from './ChapterTimeline';
import { AgeMilestones } from './AgeMilestones';
import { SharedStoryMilestone } from './SharedStoryMilestone';
import { ChaptersContinueButton } from './ChaptersContinueButton';
import { Heart } from 'lucide-react';

interface LifeChaptersPageProps {
  onBackToPage2: () => void;
  onContinueToPage4?: () => void;
}

export const LifeChaptersPage: React.FC<LifeChaptersPageProps> = ({
  onBackToPage2,
  onContinueToPage4,
}) => {
  // Default first chapter expanded
  const [activeChapterId, setActiveChapterId] = useState<string>('chapter-01');

  // Scroll to top upon mounting Page 3
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full bg-[#0a0502] text-slate-100 overflow-x-hidden flex flex-col items-center select-none"
    >
      {/* 1. Romantic Canvas Background Animation */}
      <RomanticBackgroundCanvas />

      {/* 2. Ambient Color Aura Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-pink-900/20 via-purple-900/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[45%] -left-32 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[130px]" />
        <div className="absolute top-[70%] -right-32 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[130px]" />
      </div>

      {/* 3. Romantic Audio Player */}
      <RomanticAudioPlayer />

      {/* 4. Page Content Structure */}
      <main className="relative z-10 w-full flex flex-col items-center pb-16">
        {/* Intro Section */}
        <ChaptersIntro onBackToPage2={onBackToPage2} />

        {/* Age Milestones Overview */}
        <AgeMilestones
          activeChapterId={activeChapterId}
          onSelectChapter={handleSelectChapter}
        />

        {/* Central Interactive Life Chapters Timeline (NO photos, symbolic journey) */}
        <ChapterTimeline
          chapters={birthdayConfig.page3.chapters}
          activeChapterId={activeChapterId}
          onSelectChapter={handleSelectChapter}
        />

        {/* Shared Story Milestone: March 2, 2023 - "And somewhere along the way... our story began." */}
        <SharedStoryMilestone />

        {/* Final Transition to Memories Page */}
        <ChaptersContinueButton onContinueToPage4={onContinueToPage4} />

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-pink-300/40 flex items-center justify-center gap-1.5 font-mono">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400 animate-pulse inline" />
          <span>for {birthdayConfig.herName}</span>
        </footer>
      </main>
    </motion.div>
  );
};
