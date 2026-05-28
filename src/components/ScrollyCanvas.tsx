'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 500;
const LERP_FACTOR = 0.22;

// Unlock the experience after this fraction of frames are decoded.
// Remaining frames continue loading silently in the background.
const UNLOCK_AT = 0.25; // 25% = ~125 frames
const UNLOCK_THRESHOLD = Math.ceil(FRAME_COUNT * UNLOCK_AT);

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmaps = useRef<(ImageBitmap | null)[]>(Array(FRAME_COUNT).fill(null));

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoadedRef = useRef(false); // avoids stale closure in async callbacks

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Scroll lock + restore
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      const savedY = sessionStorage.getItem('portfolioScrollY');
      if (!savedY) window.scrollTo(0, 0);
    }
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const savedY = sessionStorage.getItem('portfolioScrollY');
      if (savedY) {
        sessionStorage.removeItem('portfolioScrollY');
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' });
        });
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLoaded]);

  // Preload → GPU-decode → store as ImageBitmap
  // Frames load in sequential order (0→499) so early sections get frames first.
  useEffect(() => {
    let decoded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const capturedI = i;
      const index = (i + 1).toString().padStart(3, '0');
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${index}.jpg`;

      img.onload = () => {
        createImageBitmap(img).then((bitmap) => {
          bitmaps.current[capturedI] = bitmap;
          decoded++;
          setLoadedCount(decoded);

          // Unlock early — remaining frames load silently in background
          if (decoded >= UNLOCK_THRESHOLD && !isLoadedRef.current) {
            isLoadedRef.current = true;
            setTimeout(() => setIsLoaded(true), 300);
          }
        });
      };

      img.onerror = () => {
        decoded++;
        setLoadedCount(decoded);
        if (decoded >= UNLOCK_THRESHOLD && !isLoadedRef.current) {
          isLoadedRef.current = true;
          setTimeout(() => setIsLoaded(true), 300);
        }
      };
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0,   0.08, 0.10, 0.28, 0.30, 0.46, 0.48, 0.72, 0.74, 0.88, 0.90, 1.0],
    [0,   50,   62,  142,  157,  235,  250,  360,  375,  453,  468,  499]
  );

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use nearest available frame if this one isn't decoded yet
    let bitmap = bitmaps.current[index];
    if (!bitmap) {
      let lo = index - 1, hi = index + 1;
      while (lo >= 0 || hi < FRAME_COUNT) {
        if (lo >= 0 && bitmaps.current[lo]) { bitmap = bitmaps.current[lo]; break; }
        if (hi < FRAME_COUNT && bitmaps.current[hi]) { bitmap = bitmaps.current[hi]; break; }
        lo--; hi++;
      }
    }
    if (!bitmap) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const hRatio = canvas.width / bitmap.width;
    const vRatio = canvas.height / bitmap.height;
    const ratio = Math.max(hRatio, vRatio);
    const x = (canvas.width - bitmap.width * ratio) / 2;
    const y = (canvas.height - bitmap.height * ratio) / 2;
    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, bitmap.width * ratio, bitmap.height * ratio);
  };

  // rAF lerp loop
  useEffect(() => {
    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.08) {
        currentFrameRef.current += diff * LERP_FACTOR;
        renderFrame(Math.round(currentFrameRef.current));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    targetFrameRef.current = Math.max(0, Math.min(FRAME_COUNT - 1, latest));
  });

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Progress shown as % toward the unlock threshold (reaches 100% at unlock)
  const displayProgress = Math.min(Math.round((loadedCount / UNLOCK_THRESHOLD) * 100), 100);

  return (
    <>
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
              <span className="text-neutral-500 text-xs tracking-widest uppercase font-medium">
                Loading Experience
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="relative w-full h-[2500vh] bg-[#121212]">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );
}
