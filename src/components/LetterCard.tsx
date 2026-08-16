import React from 'react';
import { LetterContent } from './LetterContent';

interface LetterCardProps {
  isOpen: boolean;
  onFullyRevealed: () => void;
  isFullyRevealed: boolean;
}

export const LetterCard: React.FC<LetterCardProps> = (props) => {
  return <LetterContent {...props} />;
};
