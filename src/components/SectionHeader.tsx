import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  heading: string;
  subtext?: string;
  align?: 'center' | 'left';
  highlightColor?: 'pink' | 'amber' | 'purple';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  heading,
  subtext,
  align = 'center',
  highlightColor = 'pink',
}) => {
  const isLeft = align === 'left';

  const badgeColorClasses = {
    pink: 'bg-pink-500/10 border-pink-500/25 text-pink-300',
    amber: 'bg-amber-500/10 border-amber-500/25 text-amber-300',
    purple: 'bg-purple-500/10 border-purple-500/25 text-purple-300',
  }[highlightColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-3xl mb-6 sm:mb-10 ${
        isLeft ? 'text-left' : 'text-center mx-auto'
      }`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] sm:text-xs uppercase tracking-[0.2em] font-sans mb-3.5 backdrop-blur-md shadow-sm ${badgeColorClasses}`}
        >
          {badgeIcon || <Sparkles className="w-3.5 h-3.5 text-pink-400" />}
          <span className="font-medium whitespace-nowrap">{badge}</span>
        </div>
      )}

      <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight text-shimmer mb-2.5">
        {heading}
      </h2>

      {subtext && (
        <p className="text-xs sm:text-sm md:text-base text-pink-200/80 font-serif italic max-w-xl leading-relaxed mx-auto">
          "{subtext}"
        </p>
      )}
    </motion.div>
  );
};
