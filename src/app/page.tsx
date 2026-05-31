'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Internships from '@/components/Internships';
import Contact from '@/components/Contact';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  // Parallax effect: image moves up slightly slower than the scroll speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      const savedY = sessionStorage.getItem('portfolioScrollY');
      if (savedY) {
        sessionStorage.removeItem('portfolioScrollY');
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' });
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-[#121212] min-h-screen selection:bg-neutral-800 selection:text-white flex flex-col relative">
      
      {/* Global Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed top-0 left-0 w-full h-[125vh] pointer-events-none z-0 opacity-100"
      >
        {/* Replace this src with your actual image path */}
        <img 
          src="/images/background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Light overlay to ensure text remains readable without hiding the image */}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full">
        <Preloader />
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-start p-6 md:p-8 md:pl-24" id="home">
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-xl text-left">
            AJITH K V<br />
          </h1>
          <p className="text-lg md:text-2xl text-neutral-300 font-light tracking-wide text-left max-w-sm md:max-w-xl">
            Building Autonomous AI Agents & Intelligent Automation
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="https://drive.google.com/file/d/1vk7wMwu0GBnxhMGTzD1ld2_tDmLaf2Fd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform text-sm md:text-base">
              Resume
            </a>
            <button 
              onClick={scrollToContact}
              className="px-6 py-3 bg-neutral-900/50 backdrop-blur-md border border-neutral-700 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm md:text-base cursor-pointer"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="flex flex-col gap-32 md:gap-48 px-6 md:px-8 pb-32 overflow-hidden w-full max-w-full">
        <Education />
        <Skills />
        <Projects />
        <Internships />
        <div className="flex justify-start md:pl-16">
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-24 border-t border-neutral-800/50 bg-[#121212] flex flex-col items-center justify-center gap-16 px-6 md:px-12 lg:px-24 mt-auto">
        <div className="max-w-7xl w-full flex flex-col gap-12 justify-between items-start">
          <div className="flex flex-col">
            <span className="text-neutral-500 font-medium tracking-widest uppercase text-xs mb-2 block">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
              Let&apos;s craft the future.
            </h2>
            <p className="text-neutral-300 text-base mb-8 max-w-md">
              Whether you have a project in mind, an opportunity to discuss, or just want to connect, feel free to reach out.
            </p>

            <div className="flex flex-col gap-4">
              <a href="mailto:ajajithm1781@gmail.com" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">ajajithm1781@gmail.com</span>
              </a>

              <a href="tel:+916363753476" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+91 6363 753 476</span>
              </a>

              <div className="flex items-center gap-3 mt-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:scale-110 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/AJAjith0503" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:scale-110 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl h-[1px] bg-neutral-800" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center max-w-7xl gap-4">
          <p className="text-neutral-600 text-sm tracking-widest uppercase text-center md:text-left">
            © {new Date().getFullYear()} Ajith K V — Creative Developer
          </p>
          <a href="#home" className="text-neutral-300 hover:text-white transition-colors text-sm">Back to top ↑</a>
        </div>
      </footer>
      </div>
    </main>
  );
}
