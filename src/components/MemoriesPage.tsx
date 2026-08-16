import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { birthdayConfig } from '../config/birthdayConfig';
import { PhotoItem } from '../types';
import { RomanticBackgroundCanvas } from './RomanticBackgroundCanvas';
import { RomanticAudioPlayer } from './RomanticAudioPlayer';
import { MemoriesIntro } from './MemoriesIntro';
import { HerGallery } from './HerGallery';
import { MemoriesContinueSection } from './MemoriesContinueSection';
import { PhotoViewer } from './PhotoViewer';

interface MemoriesPageProps {
  onBackToPage3: () => void;
  onContinueToPage5?: () => void;
}

export const MemoriesPage: React.FC<MemoriesPageProps> = ({
  onBackToPage3,
  onContinueToPage5,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ONLY Bujjama's photos
  const allPhotos = useMemo<PhotoItem[]>(() => {
    return birthdayConfig.herPhotos;
  }, []);

  // Handle open viewer
  const handleOpenViewer = useCallback((photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setIsViewerOpen(true);
  }, []);

  // Handle close viewer
  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  // Current photo index in list
  const currentPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return 0;
    const index = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    return index >= 0 ? index : 0;
  }, [allPhotos, selectedPhoto]);

  // Navigate viewer next
  const handleNextPhoto = useCallback(() => {
    if (allPhotos.length === 0) return;
    const nextIndex = (currentPhotoIndex + 1) % allPhotos.length;
    setSelectedPhoto(allPhotos[nextIndex]);
  }, [allPhotos, currentPhotoIndex]);

  // Navigate viewer prev
  const handlePrevPhoto = useCallback(() => {
    if (allPhotos.length === 0) return;
    const prevIndex =
      (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[prevIndex]);
  }, [allPhotos, currentPhotoIndex]);

  return (
    <main className="relative w-full min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#090308] flex flex-col justify-between items-center select-none text-white font-sans py-4 sm:py-8 px-2 sm:px-4">
      {/* Immersive Atmospheric Canvas */}
      <div className="atmosphere" aria-hidden="true" />
      <RomanticBackgroundCanvas />

      {/* Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute top-[75%] left-[20%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-rose-600/10 blur-3xl" />
      </div>

      {/* Sticky Atmospheric Audio Player */}
      <RomanticAudioPlayer />

      {/* Page Content Stream */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Intro */}
        <MemoriesIntro />

        {/* Bujjama's Photo Gallery */}
        <HerGallery onOpenViewer={handleOpenViewer} />

        {/* Navigation to Page 5 */}
        <MemoriesContinueSection
          onBackToPage3={onBackToPage3}
          onContinueToPage5={onContinueToPage5}
        />
      </div>

      {/* Lightbox / Fullscreen Modal Photo Viewer */}
      <PhotoViewer
        photo={selectedPhoto}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        currentIndex={currentPhotoIndex}
        totalCount={allPhotos.length}
      />
    </main>
  );
};
