import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon, Camera, Upload } from 'lucide-react';
import { PhotoItem } from '../types';
import { getStoredPhoto, setStoredPhoto } from '../utils/photoStorage';

interface PhotoViewerProps {
  photo: PhotoItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
  photo,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex = 0,
  totalCount = 0,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard listeners for Esc and Left / Right arrows
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !photo) return null;

  const storedImage = getStoredPhoto(photo.id);
  const effectiveImage = storedImage || photo.image;

  const isPlaceholder =
    !effectiveImage ||
    effectiveImage.startsWith('[') ||
    effectiveImage.includes('PHOTO_');

  const categoryLabel =
    photo.category === 'her'
      ? 'The Girl Behind The Smile ❤️'
      : photo.category === 'me'
      ? 'Just Me 😄'
      : 'Moments & Special Memories 💫';

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setStoredPhoto(photo.id, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Top Control Bar */}
        <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-auto">
          {/* Category Tag & Counter */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-sans font-medium uppercase tracking-wider bg-white/10 border border-white/20 text-pink-200 backdrop-blur-md">
              {categoryLabel}
            </span>
            {totalCount > 0 && (
              <span className="text-xs text-white/60 font-mono">
                {currentIndex + 1} / {totalCount}
              </span>
            )}
          </div>

          {/* Right Action: Upload / Change & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-600/40 hover:bg-pink-600 border border-pink-400/50 text-xs text-pink-100 backdrop-blur-md transition-all cursor-pointer"
              title="Upload photo for this frame"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Change Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md z-20 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md z-20 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Modal Container */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl w-full max-h-[85vh] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-pink-500/30 bg-black/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(236,72,153,0.35)] flex flex-col justify-between z-10 pointer-events-auto"
        >
          {/* Main Visual Display Area */}
          <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[480px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-950/20 via-black to-pink-950/20">
            {!isPlaceholder ? (
              <img
                src={effectiveImage}
                alt={photo.caption || photo.title || 'Memory'}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain mx-auto transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Fallback Art Frame */
              <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg">
                <div className="w-20 h-20 rounded-3xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 mb-5 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                  {photo.category === 'together' ? (
                    <Heart className="w-10 h-10 fill-pink-500 text-pink-400 animate-pulse" />
                  ) : (
                    <Sparkles className="w-10 h-10 text-pink-300" />
                  )}
                </div>
                <span className="font-mono text-xs text-pink-300/80 tracking-widest uppercase mb-2">
                  {photo.id.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold mb-2">
                  {photo.title || 'Special Memory'}
                </h3>
                <p className="text-sm sm:text-base text-pink-100/90 font-serif italic mb-4">
                  "{photo.caption}"
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo for This Frame</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Caption Bar */}
          <div className="p-5 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-base sm:text-xl font-serif text-white font-medium drop-shadow-md">
                "{photo.caption}"
              </p>
              {photo.title && (
                <p className="text-xs text-pink-300/70 font-sans tracking-wide mt-0.5">
                  {photo.title} {photo.location && `• ${photo.location}`}
                </p>
              )}
            </div>

            {/* Mobile Prev / Next Buttons */}
            <div className="flex sm:hidden items-center gap-3 mt-2">
              <button
                type="button"
                onClick={onPrev}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                type="button"
                onClick={onNext}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
