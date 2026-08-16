import React from 'react';
import { RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface ReplayButtonProps {
  onReplay: () => void;
}

export const ReplayButton: React.FC<ReplayButtonProps> = ({ onReplay }) => {
  return (
    <button
      onClick={onReplay}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-pink-500/20 border border-white/15 hover:border-pink-400/60 text-pink-200 hover:text-white font-sans text-sm font-medium transition-all duration-300 shadow-md cursor-pointer group"
      aria-label="Experience the final surprise again"
    >
      <RotateCcw className="w-4 h-4 text-pink-300 group-hover:-rotate-90 transition-transform duration-300" />
      <span>{birthdayConfig.finalSurprise.replayButtonText}</span>
    </button>
  );
};
