import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Maximize2, Sparkles, Image as ImageIcon, Camera } from 'lucide-react';
import { PhotoItem } from '../types';
import { getStoredPhoto, setStoredPhoto } from '../utils/photoStorage';

interface PhotoCardProps {
  photo: PhotoItem;
  index: number;
  onOpenViewer: (photo: PhotoItem) => void;
  aspectClass?: string;
  isProminent?: boolean;
  theme?: 'her' | 'me' | 'together';
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  onOpenViewer,
  aspectClass = 'aspect-[4/5]',
  isProminent = false,
  theme = 'her',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [storedUrl, setStoredUrl] = useState<string | null>(() => getStoredPhoto(photo.id));
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ slotId: string; dataUrl: string | null }>;
      if (customEvent.detail && customEvent.detail.slotId === photo.id) {
        setStoredUrl(customEvent.detail.dataUrl);
        setImageError(false);
      }
    };
    window.addEventListener('photo-updated', handleUpdate);
    return () => window.removeEventListener('photo-updated', handleUpdate);
  }, [photo.id]);

  const effectiveImage = storedUrl || photo.image;

  // Check if image is a raw placeholder string like [HER_PHOTO_01]
  const isPlaceholderKey =
    !effectiveImage ||
    effectiveImage.startsWith('[') ||
    effectiveImage.includes('PHOTO_');

  const themeGlow = {
    her: 'group-hover:shadow-[0_0_35px_rgba(236,72,153,0.35)] border-pink-400/20 group-hover:border-pink-400/60',
    me: 'group-hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] border-purple-400/20 group-hover:border-purple-400/60',
    together:
      'shadow-[0_0_30px_rgba(236,72,153,0.25)] group-hover:shadow-[0_0_45px_rgba(236,72,153,0.45)] border-pink-400/40 group-hover:border-pink-300',
  }[theme];

  const themeGradient = {
    her: 'from-pink-900/30 via-purple-900/20 to-pink-950/40',
    me: 'from-purple-900/30 via-indigo-900/20 to-purple-950/40',
    together: 'from-pink-900/40 via-purple-950/40 to-rose-950/50',
  }[theme];

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.upload-trigger')) {
      return;
    }
    onOpenViewer({
      ...photo,
      image: effectiveImage,
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setStoredPhoto(photo.id, reader.result);
          setStoredUrl(reader.result);
          setImageError(false);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5 }}
      className={`group relative w-full rounded-[22px] sm:rounded-[28px] overflow-hidden cursor-pointer select-none border backdrop-blur-md transition-all duration-500 ${themeGlow} ${
        isProminent ? 'p-1.5 sm:p-2 bg-white/[0.04]' : 'bg-white/[0.02]'
      }`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View photo: ${photo.caption || photo.title || 'Memory'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenViewer({ ...photo, image: effectiveImage });
        }
      }}
    >
      {/* Aspect Ratio Container */}
      <div
        className={`relative w-full ${aspectClass} rounded-[18px] sm:rounded-[24px] overflow-hidden bg-gradient-to-br ${themeGradient} flex items-center justify-center`}
      >
        {/* Actual Image if available and not error */}
        {!isPlaceholderKey && !imageError ? (
          <img
            src={effectiveImage}
            alt={photo.caption || photo.title || 'Birthday memory'}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          /* Elegant Styled Placeholder Frame when actual photo file is not yet attached */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center transition-transform duration-700 ease-out group-hover:scale-105">
            {/* Soft background pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.4),transparent_70%)]" />
            
            {/* Animated heart/icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-pink-300 mb-3 shadow-inner group-hover:border-pink-400/50 group-hover:bg-pink-500/20 transition-colors">
              {theme === 'together' ? (
                <Heart className="w-6 h-6 fill-pink-500 text-pink-400 animate-pulse" />
              ) : theme === 'her' ? (
                <Sparkles className="w-6 h-6 text-pink-300" />
              ) : (
                <ImageIcon className="w-6 h-6 text-purple-300" />
              )}
            </div>

            <span className="font-mono text-[11px] sm:text-xs text-pink-200/70 tracking-wider uppercase">
              {photo.id.toUpperCase()}
            </span>
            <span className="font-serif italic text-xs sm:text-sm text-pink-100/90 mt-1 line-clamp-2 px-2">
              "{photo.caption}"
            </span>
          </div>
        )}

        {/* Floating Quick Upload Button on Card */}
        <div className="upload-trigger absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 sm:opacity-75 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="p-2 rounded-full bg-black/60 hover:bg-pink-600 border border-white/20 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
            title="Upload or change this photo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {/* Hover / Tap Dark Transparent Overlay with Heart & Zoom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 pointer-events-none">
          {/* Top Left Title Badge */}
          <div className="self-start">
            <div className="px-2.5 py-1 rounded-full bg-pink-500/30 border border-pink-400/40 backdrop-blur-md text-[11px] text-pink-100 font-sans shadow-lg">
              {photo.title || 'Special Moment'}
            </div>
          </div>

          {/* Bottom Caption & Maximize Hint */}
          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-1">
            <p className="text-sm sm:text-base font-serif text-white font-medium drop-shadow-md line-clamp-2">
              {photo.caption}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-pink-300/90 font-mono mt-1">
              <Maximize2 className="w-3 h-3" />
              <span>Tap to expand full screen</span>
            </div>
          </div>
        </div>

        {/* Mobile Persistent Bottom Caption Pill */}
        <div className="sm:hidden absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 group-hover:hidden transition-all">
          <p className="text-xs font-serif text-white text-center truncate px-1">
            {photo.caption}
          </p>
        </div>
      </div>
    </motion.article>
  );
};
