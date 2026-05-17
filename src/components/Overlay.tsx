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
    const targetScroll = totalHeight * 0.935;
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

  // Hero Section components (0 to 0.3)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  const pointerEvents1 = useTransform(scrollYProgress, [0, 0.1], ['auto', 'none']) as unknown as "auto" | "none";

  // New Sections timings
  // Education
  const eduOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const eduY = useTransform(scrollYProgress, [0.1, 0.3], [400, -100]);
  const eduScale = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0.8, 1, 1, 0.8]);
  const eduRotateX = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [20, 0, 0, -20]);
  const eduFilter = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const eduPointer = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Skills
  const skillsOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [0, 1, 1, 0]);
  const skillsY = useTransform(scrollYProgress, [0.28, 0.48], [0, -200]);
  const skillsScale = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [0.8, 1, 1, 0.8]);
  const skillsRotateX = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [20, 0, 0, -20]);
  const skillsFilter = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const skillsPointer = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Projects
  const projOpacity = useTransform(scrollYProgress, [0.46, 0.51, 0.71, 0.76], [0, 1, 1, 0]);
  const projY = useTransform(scrollYProgress, [0.46, 0.76], [100, -300]);
  const projScale = useTransform(scrollYProgress, [0.46, 0.51, 0.71, 0.76], [0.8, 1, 1, 0.8]);
  const projRotateX = useTransform(scrollYProgress, [0.46, 0.51, 0.71, 0.76], [20, 0, 0, -20]);
  const projFilter = useTransform(scrollYProgress, [0.46, 0.51, 0.71, 0.76], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const projPointer = useTransform(scrollYProgress, [0.46, 0.51, 0.71, 0.76], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Internships — fade out faster before Contact section (0.92)
  const intOpacity = useTransform(scrollYProgress, [0.74, 0.79, 0.83, 0.88], [0, 1, 1, 0]);
  const intY = useTransform(scrollYProgress, [0.74, 0.88], [200, -200]);
  const intScale = useTransform(scrollYProgress, [0.74, 0.79, 0.83, 0.88], [0.8, 1, 1, 0.8]);
  const intRotateX = useTransform(scrollYProgress, [0.74, 0.79, 0.83, 0.88], [20, 0, 0, -20]);
  const intFilter = useTransform(scrollYProgress, [0.74, 0.79, 0.83, 0.88], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const intPointer = useTransform(scrollYProgress, [0.74, 0.79, 0.83, 0.88], ['none', 'auto', 'auto', 'none']) as unknown as "auto" | "none";

  // Contact
  const contactOpacity = useTransform(scrollYProgress, [0.92, 0.97], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.92, 1], [50, -50]);
  const contactScale = useTransform(scrollYProgress, [0.92, 0.97], [0.9, 1]);
  const contactFilter = useTransform(scrollYProgress, [0.92, 0.97], ["blur(5px)", "blur(0px)"]);
  const contactPointer = useTransform(scrollYProgress, [0.92, 1], ['none', 'auto']) as unknown as "auto" | "none";

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[2000vh] pointer-events-none" id="home">
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
          style={{ 
            opacity: eduOpacity, 
            y: eduY, 
            pointerEvents: eduPointer,
          }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto overflow-y-auto scrollbar-hide pt-20 md:pt-0"
        >
          <div className="w-full max-w-4xl">
            <Education />
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          style={{ 
            opacity: skillsOpacity, 
            y: skillsY, 
            pointerEvents: skillsPointer,
          }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto"
        >
          <div className="w-full max-w-7xl">
            <Skills />
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          style={{ 
            opacity: projOpacity, 
            y: projY, 
            pointerEvents: projPointer,
          }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto"
        >
          <div className="w-full max-w-7xl">
            <Projects />
          </div>
        </motion.div>

        {/* Internships */}
        <motion.div
          style={{ 
            opacity: intOpacity, 
            y: intY, 
            pointerEvents: intPointer,
          }}
          className="absolute inset-0 flex items-center justify-start p-6 md:p-8 md:pl-24 pointer-events-auto overflow-y-auto scrollbar-hide pt-20 md:pt-0"
        >
          <div className="w-full max-w-7xl" style={{ marginTop: '-100px' }}>
            <Internships />
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          style={{ 
            opacity: contactOpacity, 
            y: contactY, 
            pointerEvents: contactPointer 
          }}
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
