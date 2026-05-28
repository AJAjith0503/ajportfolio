'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 500;

// Lerp factor: higher = snappier, lower = more lag/smoothness (0.12–0.2 is ideal)
const LERP_FACTOR = 0.15;

const drawImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // For smooth lerp animation
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Only reset scroll if there's no saved position to restore
      const savedY = sessionStorage.getItem('portfolioScrollY');
      if (!savedY) {
        window.scrollTo(0, 0);
      }
    }

    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Restore scroll position if user came back from a case study
      const savedY = sessionStorage.getItem('portfolioScrollY');
      if (savedY) {
        sessionStorage.removeItem('portfolioScrollY');
        // Use requestAnimationFrame to ensure DOM is fully painted before scrolling
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' });
        });
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoaded]);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const handleImageLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === FRAME_COUNT) {
        setTimeout(() => setIsLoaded(true), 500);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const index = (i + 1).toString().padStart(3, '0');
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = `/sequence/ezgif-frame-${index}.jpg`;
      images.current.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Non-linear frame mapping — proportionally scaled to 500 frames.
  // Synced with Overlay.tsx section windows:
  // Hero (0-0.08), Edu (0.10-0.28), Skills (0.30-0.46), Projects (0.48-0.72), Internships (0.74-0.88), Contact (0.90-1.0)
  const frameIndex = useTransform(
    scrollYProgress,
    [0,   0.08, 0.10, 0.28, 0.30, 0.46, 0.48, 0.72, 0.74, 0.88, 0.90, 1.0],
    [0,   50,   62,  142,  157,  235,  250,  360,  375,  453,  468,  499]
  );

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = images.current[index];
    if (!img || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (img.complete && img.naturalWidth > 0) {
      drawImage(ctx, img, canvas);
    }
  };

  // Smooth lerp loop — runs on rAF, interpolates current → target frame
  useEffect(() => {
    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Only re-render if the frame actually changes
      if (Math.abs(diff) > 0.1) {
        currentFrameRef.current = current + diff * LERP_FACTOR;
        renderFrame(Math.round(currentFrameRef.current));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update target frame on scroll
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    targetFrameRef.current = Math.max(0, Math.min(FRAME_COUNT - 1, latest));
  });

  // Handle Resize & Initial Draw
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.round(currentFrameRef.current));
      }
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#121212] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Logo + circular progress ring */}
              <div className="relative w-36 h-36 md:w-48 md:h-48">
                {/* SVG circular progress ring — starts at 12 o'clock (-90° rotation) */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 200 200"
                >
                  {/* Background track */}
                  <circle
                    cx="100" cy="100" r="92"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="4"
                  />
                  {/* Animated progress arc */}
                  <motion.circle
                    cx="100" cy="100" r="92"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={578.05}
                    initial={{ strokeDashoffset: 578.05 }}
                    animate={{ strokeDashoffset: 578.05 * (1 - loadedCount / FRAME_COUNT) }}
                    transition={{ duration: 0.15, ease: "linear" }}
                  />
                </svg>

                {/* Logo image centered inside the ring */}
                <div className="absolute inset-[10px] rounded-full overflow-hidden flex items-center justify-center bg-neutral-900 shadow-[0_0_40px_rgba(255,255,255,0.06)]">
                  <img
                    src="/images/logo.png"
                    alt="AJ Logo"
                    className="w-full h-full object-cover"
                  />
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
