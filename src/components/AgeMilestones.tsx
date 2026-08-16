import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface AgeMilestonesProps {
  activeChapterId?: string;
  onSelectChapter?: (chapterId: string) => void;
}

export const AgeMilestones: React.FC<AgeMilestonesProps> = ({
  onSelectChapter,
}) => {
  const milestones = birthdayConfig.page3.milestones;

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12 z-10">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-pink-300 text-xs uppercase tracking-widest font-sans">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
          <span>Milestone Reflections</span>
        </div>
      </motion.div>

      {/* Milestone Flow */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
        {milestones.map((milestone, idx) => {
          const isLast = idx === milestones.length - 1;
          const isToday = milestone.ageLabel === 'TODAY';
          const isFuture = milestone.ageLabel.includes('FUTURE');

          return (
            <React.Fragment key={milestone.ageLabel}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ scale: 1.05 }}
                className={`relative p-2.5 sm:p-3.5 rounded-2xl border flex flex-col items-center justify-center min-w-[72px] sm:min-w-[90px] transition-all duration-300 select-none ${
                  isToday
                    ? 'bg-gradient-to-b from-pink-600/30 via-purple-600/25 to-pink-900/40 border-pink-400/70 shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                    : isFuture
                    ? 'bg-gradient-to-b from-amber-600/25 via-purple-600/20 to-amber-900/30 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'glass-card-immersive border-white/10'
                }`}
              >
                {/* Milestone Icon */}
                <span className="text-base sm:text-lg mb-0.5">
                  {milestone.icon || '✨'}
                </span>

                {/* Age Label */}
                <span
                  className={`font-mono text-xs sm:text-sm font-bold ${
                    isToday
                      ? 'text-pink-100'
                      : isFuture
                      ? 'text-amber-200'
                      : 'text-white'
                  }`}
                >
                  {milestone.ageLabel}
                </span>

                {/* Subtitle */}
                <span className="text-[10px] font-sans text-pink-200/70 text-center line-clamp-1">
                  {milestone.subtitle}
                </span>
              </motion.div>

              {/* Connecting arrow if not last */}
              {!isLast && (
                <div className="text-pink-400/40 font-mono text-xs px-0.5 hidden xs:inline">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
