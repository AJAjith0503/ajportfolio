'use client';

import { motion, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useState } from 'react';

const SECTIONS = [
  { label: 'Home',        progress: 0.04 },
  { label: 'Education',   progress: 0.19 },
  { label: 'Skills',      progress: 0.38 },
  { label: 'Projects',    progress: 0.60 },
  { label: 'Internships', progress: 0.81 },
  { label: 'Contact',     progress: 0.95 },
];

const RANGES = [
  [0.00, 0.09],
  [0.09, 0.29],
  [0.29, 0.47],
  [0.47, 0.73],
  [0.73, 0.89],
  [0.89, 1.00],
];

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function SectionNav({ scrollYProgress }: Props) {
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = RANGES.findIndex(([a, b]) => v >= a && v < b);
    if (idx !== -1) setActive(idx);
  });

  const scrollTo = (progress: number) => {
    const containerHeight = 1800 * window.innerHeight;
    const target = Math.min(
      progress * containerHeight,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const start = window.scrollY;
    const dist = target - start;
    const dur = 1200;
    let t0: number | null = null;
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      window.scrollTo(0, start + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end">
      {SECTIONS.map((s, i) => (
        <button
          key={s.label}
          onClick={() => scrollTo(s.progress)}
          title={s.label}
          className="group relative flex items-center gap-3"
        >
          {/* Label */}
          <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-medium text-white bg-neutral-900/90 border border-neutral-700/60 rounded-md px-2 py-1 whitespace-nowrap pointer-events-none tracking-wide">
            {s.label}
          </span>
          {/* Dot */}
          <motion.div
            animate={{
              scale: active === i ? 1.3 : 1,
              backgroundColor: active === i ? '#ffffff' : 'rgba(255,255,255,0.25)',
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-2 h-2 rounded-full border border-white/30"
          />
        </button>
      ))}
    </div>
  );
}
