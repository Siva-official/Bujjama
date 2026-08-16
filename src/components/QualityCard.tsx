import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Smile,
  Shield,
  Compass,
  Gift,
  Star,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { LoveQuality } from '../types';

interface QualityCardProps {
  quality: LoveQuality;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export const QualityCard: React.FC<QualityCardProps> = ({
  quality,
  isExpanded,
  onToggle,
  index,
}) => {
  // Render corresponding icon
  const renderIcon = (iconName: string) => {
    const iconClass = `w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
      isExpanded ? 'scale-110 text-pink-300' : 'text-pink-400'
    }`;

    switch (iconName) {
      case 'smile':
      case 'laugh':
        return <Smile className={iconClass} />;
      case 'heart':
        return <Heart className={`${iconClass} fill-pink-500`} />;
      case 'message':
        return <MessageCircle className={iconClass} />;
      case 'shield':
        return <Shield className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'compass':
        return <Compass className={iconClass} />;
      case 'gift':
        return <Gift className={iconClass} />;
      case 'star':
        return <Star className={`${iconClass} fill-amber-400/80 text-amber-300`} />;
      default:
        return <Heart className={`${iconClass} fill-pink-500`} />;
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative w-full rounded-[24px] sm:rounded-[30px] transition-all duration-500 overflow-hidden cursor-pointer select-none border backdrop-blur-xl ${
        isExpanded
          ? 'bg-gradient-to-b from-pink-950/40 via-purple-950/30 to-black/80 border-pink-400/70 shadow-[0_0_45px_rgba(236,72,153,0.35)]'
          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-pink-400/40 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]'
      }`}
      onClick={onToggle}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`Toggle details for ${quality.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Top ambient highlight line */}
      <div
        className={`absolute top-0 inset-x-0 h-[1.5px] transition-opacity duration-500 ${
          isExpanded
            ? 'opacity-100 bg-gradient-to-r from-transparent via-pink-400 to-transparent'
            : 'opacity-0'
        }`}
      />

      {/* Floating mini heart particle when expanded */}
      {isExpanded && (
        <div className="absolute top-4 right-4 pointer-events-none text-pink-400/60 animate-pulse">
          <Sparkles className="w-4 h-4" />
        </div>
      )}

      {/* Main card body */}
      <div className="p-5 sm:p-7 flex flex-col justify-between">
        {/* Header bar: Number / Icon + Tag + Expand toggle */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* Animated Icon Avatar */}
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                isExpanded
                  ? 'bg-pink-500/25 border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                  : 'bg-white/[0.05] border-white/10'
              }`}
            >
              {renderIcon(quality.icon)}
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs text-pink-300/80 font-bold">
                {quality.number}
              </span>
              {quality.shortTag && (
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-pink-200/70">
                  {quality.shortTag}
                </span>
              )}
            </div>
          </div>

          {/* Toggle Indicator Arrow */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-500 ${
              isExpanded
                ? 'rotate-180 bg-pink-500/20 border-pink-400/40 text-pink-200'
                : 'rotate-0 bg-white/[0.04] border-white/10 text-white/50'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Card Title */}
        <h3
          className={`text-lg sm:text-xl font-serif font-semibold tracking-tight transition-colors duration-300 ${
            isExpanded ? 'text-pink-100 text-shimmer' : 'text-white'
          }`}
        >
          {quality.title}
        </h3>

        {/* Collapsed Hint vs Expanded Message Area */}
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3.5 mt-3 border-t border-pink-500/20">
                <p className="text-sm sm:text-base font-serif italic text-pink-100/95 leading-relaxed">
                  "{quality.message}"
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-pink-300/80 font-mono">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-400" />
                  <span>Personal note</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-2 text-[11px] sm:text-xs text-pink-200/50 font-sans italic flex items-center gap-1"
            >
              <span>Tap to expand message...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
