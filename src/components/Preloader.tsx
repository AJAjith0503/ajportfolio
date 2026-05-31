'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Artificial progress loop
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // Random increment
      if (progress >= 100) {
        progress = 100;
        setDisplayProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 400); // Hold at 100% for a moment before fading out
      } else {
        setDisplayProgress(progress);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#121212] flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-36 h-36 md:w-48 md:h-48">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="92" fill="none" stroke="#262626" strokeWidth="4" />
                <motion.circle
                  cx="100" cy="100" r="92"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={578.05}
                  initial={{ strokeDashoffset: 578.05 }}
                  animate={{ strokeDashoffset: 578.05 * (1 - displayProgress / 100) }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </svg>
              <div className="absolute inset-[10px] rounded-full overflow-hidden flex items-center justify-center bg-neutral-900 shadow-[0_0_40px_rgba(255,255,255,0.06)]">
                <img src="/images/logo.png" alt="AJ Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-neutral-500 text-xs tracking-widest uppercase font-medium">
                Loading Experience
              </span>
              <span className="text-white text-sm font-bold tracking-widest tabular-nums">
                {displayProgress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
