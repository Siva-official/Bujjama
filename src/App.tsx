/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BirthdayWelcomePage } from './components/BirthdayWelcomePage';
import { BirthdayRevealPage } from './components/BirthdayRevealPage';
import { LifeChaptersPage } from './components/LifeChaptersPage';
import { MemoriesPage } from './components/MemoriesPage';
import { WhatILovePage } from './components/WhatILovePage';
import { PersonalLetterPage } from './components/PersonalLetterPage';
import { FinalSurprisePage } from './components/FinalSurprisePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#080205] text-white">
      {/* 7-Page Main Flow */}
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page-1"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <BirthdayWelcomePage onEnterPage2={() => goToPage(2)} />
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page-2"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <BirthdayRevealPage
              onBackToPage1={() => goToPage(1)}
              onContinueToPage3={() => goToPage(3)}
            />
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="page-3"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <LifeChaptersPage
              onBackToPage2={() => goToPage(2)}
              onContinueToPage4={() => goToPage(4)}
            />
          </motion.div>
        )}

        {currentPage === 4 && (
          <motion.div
            key="page-4"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <MemoriesPage
              onBackToPage3={() => goToPage(3)}
              onContinueToPage5={() => goToPage(5)}
            />
          </motion.div>
        )}

        {currentPage === 5 && (
          <motion.div
            key="page-5"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <WhatILovePage
              onBackToPage4={() => goToPage(4)}
              onContinueToPage6={() => goToPage(6)}
            />
          </motion.div>
        )}

        {currentPage === 6 && (
          <motion.div
            key="page-6"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <PersonalLetterPage
              onBackToPage5={() => goToPage(5)}
              onContinueToPage7={() => goToPage(7)}
            />
          </motion.div>
        )}

        {currentPage === 7 && (
          <motion.div
            key="page-7"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <FinalSurprisePage
              onBackToPage6={() => goToPage(6)}
              onRestartJourney={() => goToPage(1)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
