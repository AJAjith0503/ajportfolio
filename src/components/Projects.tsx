'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { projects } from '@/data/projects';

export default function Projects() {
  const [cards, setCards] = useState(projects);
  const [isHovered, setIsHovered] = useState(false);
  const total = projects.length;

  // Auto-swap feature
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleSwap();
    }, 4000); // Swap every 4 seconds
    return () => clearInterval(interval);
  }, [isHovered, cards]);

  const handleSwap = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  return (
    <section id="projects" className="relative w-full z-20 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-4 md:mb-6 text-center md:text-left">
          <span className="text-neutral-500 font-medium tracking-widest uppercase text-xs mb-2 block">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
            Projects
          </h2>
          <div className="w-full max-w-2xl h-[1px] bg-neutral-800 mx-auto md:mx-0" />
        </div>

        {/* Card Swap Container */}
        <div
          className="relative w-full h-[550px] md:h-[600px] flex items-center justify-center md:justify-start [perspective:1000px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {cards.map((project, index) => {
                const isFront = index === 0;

                return (
                  <motion.div
                    key={project.id}
                    layoutId={project.id.toString()}
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{
                      opacity: 1 - index * 0.15,
                      scale: 1 - index * 0.05,
                      y: index * 30,
                      x: index * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 30),
                      zIndex: cards.length - index,
                      rotateZ: index % 2 === 0 ? index * 1.5 : -index * 1.5,
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -100 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className={`absolute w-full h-[460px] md:h-[480px] rounded-[24px] p-[1px] overflow-hidden ${isFront ? 'cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.6)]' : 'pointer-events-none'}`}
                    onClick={() => isFront && handleSwap()}
                  >
                    {/* Electric Border Background for Front Card */}
                    {isFront && (
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#3b82f6_20%,#93c5fd_25%,#3b82f6_30%,transparent_50%,#3b82f6_70%,#93c5fd_75%,#3b82f6_80%,transparent_100%)]" />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className={`relative z-10 w-full h-full p-6 md:p-10 rounded-[23px] bg-[#141414] border border-neutral-800/50 flex flex-col justify-between overflow-hidden backdrop-blur-xl transition-all duration-500 ${isFront ? 'hover:bg-[#1a1a1a] hover:border-neutral-700' : ''}`}>

                      {/* Depth Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />

                      {/* Project Number — large watermark centered in card, behind content */}
                      <div className={`absolute inset-0 flex items-center justify-center gap-2 select-none pointer-events-none z-0 transition-opacity duration-300 ${isFront ? 'opacity-100' : 'opacity-20'}`}>
                        <span className="text-[8rem] md:text-[10rem] font-black tabular-nums leading-none text-white/[0.05]">
                          {String(projects.findIndex((p) => p.id === project.id) + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-white/[0.04] text-2xl md:text-3xl font-light leading-none">/</span>
                          <span className="text-white/[0.04] text-xl md:text-2xl font-medium tabular-nums leading-none">
                            {String(total).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex items-start justify-between mb-4 md:mb-6">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="text-[10px] font-bold text-blue-400/90 mb-2 md:mb-3 block uppercase tracking-[0.2em]">{project.type}</span>
                            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2 md:mb-3 leading-tight">
                              {project.title}
                            </h3>
                          </motion.div>
                          <div className="flex gap-2 md:gap-3">
                            {project.liveLink && project.liveLink !== '#' && (
                              <motion.a
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 md:p-2.5 bg-neutral-900 border border-white/5 rounded-xl text-neutral-400 hover:text-white hover:border-white/20 transition-all shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                              </motion.a>
                            )}
                            <motion.a
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 md:p-2.5 bg-neutral-900 border border-white/5 rounded-xl text-neutral-400 hover:text-white hover:border-white/20 transition-all shadow-xl"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.a>
                          </div>
                        </div>

                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-neutral-400 text-sm md:text-base leading-relaxed font-light line-clamp-3 md:line-clamp-4"
                        >
                          {project.description}
                        </motion.p>
                      </div>

                      <div className="relative pt-4 md:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tIndex) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + tIndex * 0.1 }}
                              className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase bg-white/5 text-neutral-400 border border-white/5 rounded-lg whitespace-nowrap"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        
                        {isFront && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            className="shrink-0"
                          >
                            <Link
                              href={`/projects/${project.id}`}
                              className="group/btn relative px-6 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest overflow-hidden transition-all duration-300 hover:pr-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="relative z-10">View Case Study</span>
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 translate-x-2 group-hover/btn:translate-x-0">
                                →
                              </span>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex flex-col justify-center ml-20 max-w-md opacity-30 md:opacity-100 transition-opacity">
            <h3 className="text-3xl font-light text-white mb-4">Interactive Portfolio</h3>
            <p className="text-neutral-400 mb-6">Click on the top card to seamlessly cycle through my recent creative and technical endeavors.</p>

            {/* Dot indicator row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {projects.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => {
                    // Rotate cards until desired project is at front
                    setCards((prev) => {
                      const idx = prev.findIndex((c) => c.id === p.id);
                      return [...prev.slice(idx), ...prev.slice(0, idx)];
                    });
                  }}
                  title={p.title}
                  animate={{
                    width: p.id === cards[0].id ? 28 : 8,
                    backgroundColor: p.id === cards[0].id ? '#ffffff' : '#404040',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSwap}
                className="px-6 py-3 rounded-full border border-neutral-700 hover:border-white text-sm font-medium transition-colors bg-neutral-900/50 hover:bg-white hover:text-black"
              >
                Next Project →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
