import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Star } from 'lucide-react';
import { LifeChapter } from '../types';
import { ChapterCard } from './ChapterCard';

interface ChapterTimelineProps {
  chapters: LifeChapter[];
  activeChapterId: string;
  onSelectChapter: (chapterId: string) => void;
}

export const ChapterTimeline: React.FC<ChapterTimelineProps> = ({
  chapters,
  activeChapterId,
  onSelectChapter,
}) => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-3 sm:px-6 my-8 sm:my-14 z-10">
      {/* ---------------------------------------------------- */}
      {/* DESKTOP VIEW (md: and up): Centered Timeline Spine  */}
      {/* ---------------------------------------------------- */}
      <div className="hidden md:block relative w-full">
        {/* Central Glowing Vertical Spine */}
        <div className="absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[2px] bg-gradient-to-b from-pink-500/20 via-purple-500/40 to-pink-500/20 pointer-events-none" />
        <div className="absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[6px] bg-gradient-to-b from-pink-500/10 via-pink-400/25 to-pink-500/10 blur-sm pointer-events-none" />

        {/* Animated Flowing Light Beam traveling down the spine */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] overflow-hidden pointer-events-none">
          <div className="w-full h-32 bg-gradient-to-b from-transparent via-pink-300 to-transparent animate-beam" />
        </div>

        <div className="flex flex-col gap-12 sm:gap-16 relative">
          {chapters.map((chapter, idx) => {
            const isEven = idx % 2 === 0;
            const isActive = activeChapterId === chapter.id;

            return (
              <div
                key={chapter.id}
                id={chapter.id}
                className={`relative flex items-center justify-between w-full ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* 1. Chapter Card Column (Left or Right) */}
                <div className="w-[45%]">
                  <ChapterCard
                    chapter={chapter}
                    index={idx}
                    isActive={isActive}
                    onToggle={() =>
                      onSelectChapter(isActive ? '' : chapter.id)
                    }
                  />
                </div>

                {/* 2. Central Node Hub */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => onSelectChapter(chapter.id)}
                    className={`group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-tr from-pink-600 to-purple-600 border-2 border-pink-300 scale-125 shadow-[0_0_25px_rgba(236,72,153,0.6)]'
                        : 'bg-[#18091d] border border-pink-400/40 hover:border-pink-400 hover:scale-110 text-pink-300'
                    }`}
                    title={`Go to ${chapter.chapter}: ${chapter.title}`}
                  >
                    {chapter.isSpecial ? (
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'fill-white text-white animate-pulse'
                            : 'fill-pink-500 text-pink-400'
                        }`}
                      />
                    ) : (
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? 'text-white' : 'text-pink-300'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    )}
                  </button>

                  {/* Connecting indicator */}
                  <span
                    className={`text-[10px] font-mono mt-1 transition-opacity ${
                      isActive ? 'text-pink-300 opacity-100' : 'opacity-0'
                    }`}
                  >
                    {chapter.age}
                  </span>
                </div>

                {/* 3. Empty Balanced Opposite Column */}
                <div className="w-[45%] hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex items-center gap-3 ${
                      isEven ? 'text-left' : 'text-right'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-pink-300/50 font-sans">
                        Milestone {idx + 1}
                      </span>
                      <span className="text-sm font-serif italic text-pink-200/80">
                        {chapter.tag || chapter.title}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MOBILE / TABLET VIEW: Left Spine + Right-Stacked Cards */}
      {/* ---------------------------------------------------- */}
      <div className="block md:hidden relative w-full pl-6 sm:pl-8">
        {/* Left Vertical Glowing Spine */}
        <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-pink-500/30 via-purple-500/40 to-pink-500/20 pointer-events-none" />

        <div className="flex flex-col gap-6 sm:gap-8">
          {chapters.map((chapter, idx) => {
            const isActive = activeChapterId === chapter.id;

            return (
              <div
                key={chapter.id}
                id={`mobile-${chapter.id}`}
                className="relative flex flex-col gap-2"
              >
                {/* Node on left spine */}
                <button
                  type="button"
                  onClick={() => onSelectChapter(chapter.id)}
                  className={`absolute -left-[30px] sm:-left-[34px] top-6 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 cursor-pointer shadow-md ${
                    isActive
                      ? 'bg-gradient-to-tr from-pink-600 to-purple-600 border-2 border-pink-300 scale-110 shadow-[0_0_20px_rgba(236,72,153,0.5)]'
                      : 'bg-[#18091d] border border-pink-400/40 text-pink-300'
                  }`}
                  title={`View ${chapter.title}`}
                >
                  {chapter.isSpecial ? (
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? 'fill-white text-white'
                          : 'fill-pink-500 text-pink-400'
                      }`}
                    />
                  ) : (
                    <span className="font-mono text-[11px] font-bold">
                      {idx + 1}
                    </span>
                  )}
                </button>

                {/* Chapter Card */}
                <div className="w-full">
                  <ChapterCard
                    chapter={chapter}
                    index={idx}
                    isActive={isActive}
                    onToggle={() =>
                      onSelectChapter(isActive ? '' : chapter.id)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
