'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 160;

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }

    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
      const index = i.toString().padStart(3, '0');
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = `/sequence/frame_${index}_delay-0.05s.png`;
      images.current.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Non-linear frame mapping to slow down during sections
  // Hero (0-0.1), Edu (0.1-0.3), Skills (0.28-0.48), Projects (0.46-0.76), Internships (0.74-0.94), Contact (0.92-1.0)
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.25, 0.3, 0.33, 0.43, 0.48, 0.51, 0.71, 0.76, 0.79, 0.89, 0.94, 0.97, 1.0],
    [
      0, 20, 25, 45, 50, 55, 75, 80, 85, 115, 120, 125, 145, 150, 155, 159
    ]
  );

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (images.current[index] && canvas) {
      const ctx = canvas.getContext('2d');
      // Ensure image is loaded before drawing
      if (images.current[index].complete && ctx) {
        drawImage(ctx, images.current[index], canvas);
      } else {
        images.current[index].onload = () => {
          if (ctx) drawImage(ctx, images.current[index], canvas);
        };
      }
    }
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    renderFrame(Math.round(latest));
  });

  // Handle Resize & Initial Draw
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.round(frameIndex.get()));
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Slight delay to ensure first image might be loaded
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
            <div className="flex flex-col items-center gap-8">
              <div className="relative w-32 h-32 md:w-44 md:h-44 mb-4">
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-white/5 to-transparent animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-[3px] rounded-full bg-[#121212]" />
                {/* Logo image in circle */}
                <div className="absolute inset-[3px] rounded-full overflow-hidden flex items-center justify-center bg-neutral-900 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                  <img 
                    src="/images/logo.png" 
                    alt="AJ Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-neutral-500 text-sm tracking-widest uppercase font-medium">
                Loading Experience {Math.round((loadedCount / FRAME_COUNT) * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="relative w-full h-[2000vh] bg-[#121212]">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );
}
