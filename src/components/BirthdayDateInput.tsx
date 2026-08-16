import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface BirthdayDateInputProps {
  isUnlocked: boolean;
  onUnlock: () => void;
  onWrongAttempt?: (message: string) => void;
}

export const BirthdayDateInput: React.FC<BirthdayDateInputProps> = ({
  isUnlocked,
  onUnlock,
  onWrongAttempt,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const dateConfig = birthdayConfig.page1.dateUnlock;
  const targetDay = birthdayConfig.birthdayDate?.day ?? 17;
  const targetMonth = birthdayConfig.birthdayDate?.month ?? 8;

  // Normalize input and check if day = 17 and month = 8
  const validateDateInput = (raw: string): boolean => {
    const clean = raw.trim().toLowerCase();
    if (!clean) return false;

    // Direct string matches
    if (clean === '17-08' || clean === '17/08' || clean === '17.08' || clean === '17 08' || clean === '17-8' || clean === '17/8') {
      return true;
    }

    // "17 august", "17th august", "august 17", "aug 17"
    if (
      (clean.includes('17') || clean.includes('17th')) &&
      (clean.includes('aug') || clean.includes('august') || clean.includes('08') || clean.includes('8'))
    ) {
      return true;
    }

    // YYYY-MM-DD format e.g. 2026-08-17 or 2023-08-17
    const isoMatch = clean.match(/^\d{4}[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (isoMatch) {
      const month = parseInt(isoMatch[1], 10);
      const day = parseInt(isoMatch[2], 10);
      if (day === targetDay && month === targetMonth) return true;
    }

    // DD-MM or DD/MM or DD-MM-YYYY format
    const ddmmyyyyMatch = clean.match(/^(\d{1,2})[-/.](\d{1,2})(?:[-/.]\d{2,4})?$/);
    if (ddmmyyyyMatch) {
      const day = parseInt(ddmmyyyyMatch[1], 10);
      const month = parseInt(ddmmyyyyMatch[2], 10);
      if (day === targetDay && month === targetMonth) return true;
    }

    return false;
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isUnlocked) return;

    const isValid = validateDateInput(inputValue);

    if (isValid) {
      setFeedback({
        message: dateConfig.successMessage,
        isError: false,
      });
      onUnlock();
    } else {
      // Pick random playful wrong message
      const wrongList = dateConfig.wrongMessages;
      const randomMsg = wrongList[Math.floor(Math.random() * wrongList.length)];

      setFeedback({
        message: randomMsg,
        isError: true,
      });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);

      if (onWrongAttempt) {
        onWrongAttempt(randomMsg);
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mb-6 px-3 select-none">
      <div
        className={`relative p-5 sm:p-6 rounded-3xl backdrop-blur-xl transition-all duration-500 border ${
          isUnlocked
            ? 'bg-gradient-to-b from-pink-950/40 via-purple-950/30 to-black/60 border-pink-400/50 shadow-[0_0_35px_rgba(236,72,153,0.3)]'
            : 'bg-white/[0.04] border-white/15 hover:border-pink-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Heading */}
        <div className="flex items-center justify-center gap-2 mb-1.5 text-center">
          <Calendar className="w-4 h-4 text-pink-400 shrink-0" />
          <h3 className="font-serif font-semibold text-base sm:text-lg text-white tracking-wide">
            {dateConfig.heading}
          </h3>
        </div>

        <p className="text-xs text-pink-200/70 text-center mb-4 font-sans">
          {dateConfig.supportingText}
        </p>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="flex flex-col gap-3">
          <motion.div
            animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <input
              id="birthday-date-unlock-input"
              type="text"
              disabled={isUnlocked}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (feedback?.isError) setFeedback(null);
              }}
              placeholder={dateConfig.placeholder}
              className={`w-full px-4 py-3 rounded-2xl text-center font-serif text-base sm:text-lg tracking-widest transition-all duration-300 focus:outline-none ${
                isUnlocked
                  ? 'bg-pink-500/20 text-pink-100 border border-pink-400/60 cursor-default'
                  : feedback?.isError
                  ? 'bg-rose-950/40 text-rose-200 border border-rose-500/60 focus:ring-2 focus:ring-rose-400'
                  : 'bg-white/[0.07] text-white placeholder:text-slate-400/60 border border-white/15 focus:border-pink-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-pink-400/30'
              }`}
            />
          </motion.div>

          {/* Action Button */}
          {!isUnlocked ? (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600/60 via-purple-600/50 to-pink-600/60 border border-pink-400/40 hover:border-pink-300 text-pink-50 font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{dateConfig.checkButtonText}</span>
            </motion.button>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-medium animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{dateConfig.successSubtext}</span>
            </div>
          )}
        </form>

        {/* Dynamic Feedback Message */}
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs"
            >
              {feedback.isError ? (
                <div className="flex items-center gap-1.5 text-rose-300 font-sans">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-pink-300 font-medium font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
