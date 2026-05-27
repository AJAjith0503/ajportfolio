'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Import all sections
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Internships from './Internships';
import Contact from './Contact';

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = totalHeight * 0.952;
    const startScroll = window.scrollY;
    const distance = targetScroll - startScroll;
    const duration = 1800; // ms — longer = smoother feel
    let startTime: number | null = null;

    // Ease in-out cubic for a natural deceleration
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startScroll + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ── Transition windows (strictly non-overlapping) ──────────────────────────
  // Hero:        0.00 → 0.08  (fade out by 0.08)
  // Education:   0.10 → 0.28  (fade in 0.10-0.14, hold, fade out 0.24-0.28)
  // Skills:      0.30 → 0.46  (fade in 0.30-0.34, hold, fade out 0.42-0.46)
  // Projects:    0.48 → 0.72  (fade in 0.48-0.52, hold, fade out 0.68-0.72)
  // Internships: 0.74 → 0.88  (fade in 0.74-0.78, hold, fade out 0.84-0.88)
  // Contact:     0.90 → 1.00  (fade in 0.90-0.95)
  // ───────────────────────────────────────────────────────────────────────────

  // Hero
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.08], [0, -80]);
  const pointerEvents1 = useTransform(scrollYProgress, [0, 0.08], ['auto', 'none']) as unknown as "auto" | "none";

  // Education — smooth fade + slide only (no scale/blur pop)
  const eduOpacity = useTransform(scrollYProgress, [0.10, 0.14, 0.24, 0.28], [0, 1, 1, 0]);
  const eduY = useTransform(scrollYProgress, [0.10, 0.28], [40, -40]);
  const eduPointer = useTransform(scrollYProgress, [0.10, 0.14, 0.24, 0.28], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Skills
  const skillsOpacity = useTransform(scrollYProgress, [0.30, 0.34, 0.42, 0.46], [0, 1, 1, 0]);
  const skillsY = useTransform(scrollYProgress, [0.30, 0.46], [40, -40]);
  const skillsPointer = useTransform(scrollYProgress, [0.30, 0.34, 0.42, 0.46], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Projects
  const projOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.68, 0.72], [0, 1, 1, 0]);
  const projY = useTransform(scrollYProgress, [0.48, 0.72], [40, -40]);
  const projPointer = useTransform(scrollYProgress, [0.48, 0.52, 0.68, 0.72], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Internships
  const intOpacity = useTransform(scrollYProgress, [0.74, 0.78, 0.84, 0.88], [0, 1, 1, 0]);
  const intY = useTransform(scrollYProgress, [0.74, 0.88], [40, -40]);
  const intPointer = useTransform(scrollYProgress, [0.74, 0.78, 0.84, 0.88], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Contact
  const contactOpacity = useTransform(scrollYProgress, [0.90, 0.95], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.90, 1], [40, -20]);
  const contactPointer = useTransform(scrollYProgress, [0.90, 1], ['none', 'auto']) as unknown as "auto" | "none";

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[2500vh] pointer-events-none" id="home">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Section 1: Hero Text */}
        <motion.div
          style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto"
        >
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-xl text-left">
              AJITH K V<br />
            </h1>
            <p className="text-lg md:text-2xl text-neutral-300 font-light tracking-wide text-left max-w-sm md:max-w-xl">
              Creative Frontend Developer & Design Enthusiast
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="https://drive.google.com/file/d/1vk7wMwu0GBnxhMGTzD1ld2_tDmLaf2Fd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform pointer-events-auto text-sm md:text-base">
                Resume
              </a>
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-neutral-900/50 backdrop-blur-md border border-neutral-700 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors pointer-events-auto text-sm md:text-base cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </div>
        </motion.div>

        {/* NEW SCROLL SECTIONS */}

        {/* Education */}
        <motion.div
          style={{ opacity: eduOpacity, y: eduY, pointerEvents: eduPointer }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto overflow-y-auto scrollbar-hide pt-20 md:pt-0"
        >
          <div className="w-full max-w-4xl">
            <Education />
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          style={{ opacity: skillsOpacity, y: skillsY, pointerEvents: skillsPointer }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto"
        >
          <div className="w-full max-w-7xl">
            <Skills />
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          style={{ opacity: projOpacity, y: projY, pointerEvents: projPointer }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto"
        >
          <div className="w-full max-w-7xl">
            <Projects />
          </div>
        </motion.div>

        {/* Internships */}
        <motion.div
          style={{ opacity: intOpacity, y: intY, pointerEvents: intPointer }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto overflow-y-auto scrollbar-hide pt-20 md:pt-0"
        >
          <div className="w-full max-w-7xl">
            <Internships />
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          style={{ opacity: contactOpacity, y: contactY, pointerEvents: contactPointer }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto"
        >
          <div className="w-full max-w-5xl">
            <Contact />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
