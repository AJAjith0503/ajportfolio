'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 500;

// Higher = snappier catch-up, lower = dreamier lag. 0.22 feels responsive without being jumpy.
const LERP_FACTOR = 0.22;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ImageBitmap is GPU-decoded — drawImage is ~5-10x faster vs HTMLImageElement
  const bitmaps = useRef<(ImageBitmap | null)[]>(Array(FRAME_COUNT).fill(null));

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lerp state
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Scroll lock + scroll restore
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
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

  // Preload → decode → store as ImageBitmap
  useEffect(() => {
    let decoded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const index = (i + 1).toString().padStart(3, '0');
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${index}.jpg`;

      const capturedI = i;
      img.onload = () => {
        // createImageBitmap decodes the JPEG on a background thread
        // and returns a GPU-ready handle — zero CPU cost at draw time
        createImageBitmap(img).then((bitmap) => {
          bitmaps.current[capturedI] = bitmap;
          decoded++;
          setLoadedCount(decoded);
          if (decoded === FRAME_COUNT) {
            setTimeout(() => setIsLoaded(true), 400);
          }
        });
      };
      img.onerror = () => {
        decoded++;
        setLoadedCount(decoded);
        if (decoded === FRAME_COUNT) {
          setTimeout(() => setIsLoaded(true), 400);
        }
      };
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
    const bitmap = bitmaps.current[index];
    if (!canvas || !bitmap) return;

    // alpha:false + desynchronized:true set during resize setup — reuse the same ctx
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Cover-fit the bitmap to the canvas
    const hRatio = canvas.width / bitmap.width;
    const vRatio = canvas.height / bitmap.height;
    const ratio = Math.max(hRatio, vRatio);
    const x = (canvas.width - bitmap.width * ratio) / 2;
    const y = (canvas.height - bitmap.height * ratio) / 2;

    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, bitmap.width * ratio, bitmap.height * ratio);
  };

  // rAF lerp loop — smoothly chases the scroll target
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

  // Update lerp target on scroll
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    targetFrameRef.current = Math.max(0, Math.min(FRAME_COUNT - 1, latest));
  });

  // Resize + initial draw
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
                    transition={{ duration: 0.15, ease: 'linear' }}
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
