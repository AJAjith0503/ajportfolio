'use client';

import { 
  SiPython, 
  SiReact, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiFlutter, 
  SiNodedotjs, 
  SiMysql, 
  SiGithub, 
  SiFirebase,
  SiOpenjdk,
  SiPostgresql
} from 'react-icons/si';
import { 
  useScroll, 
  useVelocity, 
  useTransform, 
  useSpring,
  motion,
  Variants
} from 'framer-motion';
import { useRef } from 'react';
import LogoLoop from './LogoLoop';

const skillsLogos = [
  { node: <SiOpenjdk />, title: "Java" },
  { node: <SiPython />, title: "Python" },
  { node: <SiReact />, title: "React" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiHtml5 />, title: "HTML" },
  { node: <SiCss />, title: "CSS" },
  { node: <SiFlutter />, title: "Flutter" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiMysql />, title: "SQL" },
  { node: <SiGithub />, title: "Git & GitHub" },
  { node: <SiFirebase />, title: "Firebase" },
  { node: <SiPostgresql />, title: "Database Concepts" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function Skills() {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  return (
    <section id="skills" ref={scrollRef} className="relative w-full z-20">
      <div className="max-w-7xl">
        <div className="mb-8 md:mb-12">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-neutral-500 font-medium tracking-widest uppercase text-xs mb-2 block"
          >
            Technical Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6"
          >
            Skills
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full h-[1px] bg-neutral-800 origin-left" 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ skewX: skewVelocity }}
          className="relative py-10"
        >
          <LogoLoop
            logos={skillsLogos}
            speed={40}
            direction="left"
            logoHeight={60}
            gap={80}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="transparent"
            ariaLabel="Technical Skills"
          />
        </motion.div>
      </div>
    </section>
  );
}
