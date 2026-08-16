import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  BookOpen,
  Star,
  Moon,
  Compass,
  ChevronDown,
  Quote,
  Smile,
  Crown
} from 'lucide-react';
import { LifeChapter } from '../types';
import { birthdayConfig } from '../config/birthdayConfig';

interface ChapterCardProps {
  chapter: LifeChapter;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

// Icon helper function for storybook illustration
const renderChapterIcon = (iconName: string, isSpecial?: boolean) => {
  switch (iconName) {
    case 'baby':
      return <span className="text-2xl sm:text-3xl">👶</span>;
    case 'book':
      return <span className="text-2xl sm:text-3xl">🌱</span>;
    case 'flower':
      return <span className="text-2xl sm:text-3xl">🌸</span>;
    case 'star':
      return <span className="text-2xl sm:text-3xl">✨</span>;
    case 'moon':
      return <span className="text-2xl sm:text-3xl">🌙</span>;
    case 'heart':
      return <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-pink-500 text-pink-400 animate-pulse" />;
    case 'sparkles':
      return <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-amber-400/80 text-amber-300 animate-spin" />;
    default:
      return <Sparkles className="w-6 h-6 text-pink-400" />;
  }
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  index,
  isActive,
  onToggle,
}) => {
  const isSpecialToday = chapter.id === 'chapter-06';
  const isSpecialFuture = chapter.id === 'chapter-07';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-[26px] sm:rounded-[32px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
        isActive
          ? isSpecialToday
            ? 'glass-card-immersive border-pink-400/60 shadow-[0_0_50px_rgba(236,72,153,0.35)] scale-[1.01]'
            : isSpecialFuture
            ? 'glass-card-immersive border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.3)] scale-[1.01]'
            : 'glass-card-immersive border-pink-400/50 shadow-[0_0_35px_rgba(236,72,153,0.25)] scale-[1.01]'
          : 'glass-card-subtle hover:border-pink-400/30 hover:bg-white/[0.04]'
      } border`}
      onClick={onToggle}
    >
      {/* Top Border Glowing Highlight */}
      <div
        className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r ${
          isSpecialToday
            ? 'from-transparent via-pink-400 to-transparent'
            : isSpecialFuture
            ? 'from-transparent via-amber-400 to-transparent'
            : 'from-transparent via-pink-400/50 to-transparent'
        }`}
      />

      {/* Outer Ambient Glow Blob for expanded special chapters */}
      {isActive && (
        <div
          className={`absolute -inset-10 ${
            isSpecialToday
              ? 'bg-pink-600/15'
              : isSpecialFuture
              ? 'bg-amber-600/15'
              : 'bg-purple-600/10'
          } blur-3xl pointer-events-none -z-10`}
        />
      )}

      {/* Main Card Content */}
      <div className="p-5 sm:p-7 flex flex-col gap-4">
        {/* Card Header: Badge + Age + Expand Indicator */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-sans ${
                isSpecialToday
                  ? 'bg-pink-500/25 border border-pink-400/60 text-pink-100 shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                  : isSpecialFuture
                  ? 'bg-amber-500/25 border border-amber-400/60 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'bg-white/[0.06] border border-white/10 text-pink-200'
              }`}
            >
              {chapter.chapter}
            </span>

            <span className="text-xs sm:text-sm font-mono text-pink-300/80 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
              {chapter.age}
            </span>
          </div>

          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
              isActive
                ? 'bg-pink-500/20 text-pink-300'
                : 'bg-white/[0.04] text-slate-400 group-hover:text-white'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Title & Stage Icon Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3
              className={`font-serif text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight ${
                isSpecialToday
                  ? 'text-pink-50 text-shimmer font-bold'
                  : isSpecialFuture
                  ? 'text-amber-100 font-bold'
                  : 'text-white'
              }`}
            >
              {chapter.title}
            </h3>

            {chapter.tag && (
              <p className="text-xs sm:text-sm font-serif italic text-pink-300/75 mt-0.5">
                {chapter.tag}
              </p>
            )}
          </div>

          {/* Icon Badge */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 shadow-md ${
              isSpecialToday
                ? 'bg-pink-500/20 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                : isSpecialFuture
                ? 'bg-amber-500/20 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                : 'bg-white/[0.05] border-white/15'
            }`}
          >
            {renderChapterIcon(chapter.icon, chapter.isSpecial)}
          </div>
        </div>

        {/* Expandable Story Content */}
        <AnimatePresence initial={false}>
          {isActive ? (
            <motion.div
              key="content-expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden flex flex-col gap-4 pt-2 border-t border-white/[0.08]"
            >
              {/* Detailed Chapter Story Narrative */}
              <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed font-sans font-light">
                {chapter.description}
              </p>

              {/* Special Chapter 6 Highlight: "Bujjama ❤️" */}
              {isSpecialToday && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-pink-950/40 border border-pink-400/40 text-center flex flex-col items-center gap-2 shadow-inner">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-400 animate-pulse" />
                  </div>
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-pink-100 font-bold tracking-wide text-shimmer">
                    {birthdayConfig.herName} ❤️
                  </span>
                  <span className="text-xs sm:text-sm font-serif italic text-pink-200/90">
                    "This is the chapter I'm celebrating today."
                  </span>
                </div>
              )}

              {/* Special Chapter 7 Highlight: "It's only getting started. ✨" */}
              {isSpecialFuture && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-pink-950/40 border border-amber-400/40 text-center flex flex-col items-center gap-2 shadow-inner">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  </div>
                  <span className="font-serif text-lg sm:text-xl text-amber-100">
                    Your story isn't finished.
                  </span>
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-amber-300 font-bold tracking-wide">
                    It's only getting started. ✨
                  </span>
                </div>
              )}

              {/* Romantic Quote Box */}
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
                <Quote className="w-4 h-4 text-pink-400 shrink-0 mt-0.5 opacity-80" />
                <p className="text-xs sm:text-sm font-serif italic text-pink-200/95 leading-relaxed">
                  "{chapter.quote}"
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content-collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-1 flex items-center justify-between text-xs text-pink-300/60 font-sans"
            >
              <span className="truncate max-w-[85%] font-serif italic">
                "{chapter.quote}"
              </span>
              <span className="text-[11px] underline decoration-pink-500/40 text-pink-300/80 shrink-0">
                Tap to read
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
