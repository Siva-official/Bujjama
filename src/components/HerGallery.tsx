import React from 'react';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { PhotoItem } from '../types';
import { SectionHeader } from './SectionHeader';
import { PhotoCard } from './PhotoCard';

interface HerGalleryProps {
  onOpenViewer: (photo: PhotoItem) => void;
}

export const HerGallery: React.FC<HerGalleryProps> = ({ onOpenViewer }) => {
  const photos = birthdayConfig.herPhotos;

  const smilePhotos = photos.filter((p) => p.section === 'smile' || !p.section);
  const momentPhotos = photos.filter((p) => p.section === 'moments');
  const versionPhotos = photos.filter((p) => p.section === 'versions');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 z-10">
      {/* Section 1: The Girl Behind The Smile ❤️ */}
      <section className="relative w-full">
        <SectionHeader
          badge="Gallery • 01"
          badgeIcon={<Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400" />}
          heading={birthdayConfig.page4.sectionSmileTitle}
          subtext="Moments where your smile says everything."
          highlightColor="pink"
        />

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-7 max-w-4xl mx-auto">
          {smilePhotos.map((photo, idx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={idx}
              onOpenViewer={onOpenViewer}
              aspectClass="aspect-[4/5]"
              theme="her"
            />
          ))}
        </div>
      </section>

      {/* Section 2: Little Moments */}
      {momentPhotos.length > 0 && (
        <section className="relative w-full">
          <SectionHeader
            badge="Gallery • 02"
            badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
            heading={birthdayConfig.page4.sectionMomentsTitle}
            subtext="Simple, quiet, everyday beauty."
            highlightColor="pink"
          />

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-7 max-w-4xl mx-auto">
            {momentPhotos.map((photo, idx) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={idx}
                onOpenViewer={onOpenViewer}
                aspectClass="aspect-[4/5]"
                theme="her"
              />
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Different Versions of You */}
      {versionPhotos.length > 0 && (
        <section className="relative w-full">
          <SectionHeader
            badge="Gallery • 03"
            badgeIcon={<ImageIcon className="w-3.5 h-3.5 text-pink-400" />}
            heading={birthdayConfig.page4.sectionVersionsTitle}
            subtext="Every expression, mood, and side of who you are."
            highlightColor="pink"
          />

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-7 max-w-4xl mx-auto">
            {versionPhotos.map((photo, idx) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={idx}
                onOpenViewer={onOpenViewer}
                aspectClass="aspect-[4/5]"
                theme="her"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
