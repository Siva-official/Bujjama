import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { SectionHeader } from './SectionHeader';
import { QualityCard } from './QualityCard';

export const QualityCards: React.FC = () => {
  const qualities = birthdayConfig.qualities;
  // Initialize with first card open
  const [expandedId, setExpandedId] = useState<string | null>(qualities[0]?.id || null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-10 sm:my-16 z-10">
      {/* Section Header */}
      <SectionHeader
        badge="Qualities • 01 to 09"
        badgeIcon={<Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400" />}
        heading={`Things I Appreciate About ${birthdayConfig.herName}`}
        subtext="Every little detail that makes you who you are."
        highlightColor="pink"
      />

      {/* Grid of 9 Interactive Quality Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {qualities.map((quality, idx) => (
          <QualityCard
            key={quality.id}
            quality={quality}
            index={idx}
            isExpanded={expandedId === quality.id}
            onToggle={() => handleToggle(quality.id)}
          />
        ))}
      </div>
    </section>
  );
};
