import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const internships = [
  {
    title: 'Software Developer Intern @ Infiposts',
    duration: 'Dec 2025 – Present',
    description: 'Working as a Software Developer Intern at Infiposts Private Limited. Focused on building responsive web interfaces and reusable UI components using React.js.',
    features: [
      'Built responsive web apps using React.js, JSX, and reusable components.',
      'Managed state with useState and props across 10+ UI components.',
      'Improved UI performance, reducing layout issues by 30% through CSS optimization.',
    ],
    tags: ['React.js', 'JavaScript', 'CSS', 'State Management'],
    source: '#',
    certificate: '#',
  },
  {
    title: 'Full Stack Developer Intern @ Edunet Foundation',
    duration: 'Feb 10, 2025 – Mar 21, 2025',
    description: 'A full-stack crowdfunding web application. Designed and developed the system including campaign creation, funding operations, user authentication, payment integration, and real-time interactions.',
    features: [
      'Campaign creation and funding',
      'User authentication',
      'Payment integration',
      'Real-time comments and notifications',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe / PayPal'],
    source: 'https://github.com/AJAjith0503/crowd_found',
    certificate: 'https://drive.google.com/file/d/1KdcKA75kefTPAVG8InFgCFwW7u4VvFuC/view',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    },
  },
};

export default function Internships() {
  return (
    <section id="internships" className="relative w-full z-20">
      <div className="max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <span className="text-neutral-500 font-medium tracking-widest uppercase text-xs mb-2 block">Work Experience</span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Internships
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full h-[1px] bg-neutral-800 origin-left" 
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {internships.map((internship, index) => (
            <motion.div
              key={internship.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="group flex flex-col gap-6 p-5 md:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-colors duration-500 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col gap-3">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-neutral-500 font-mono text-xs tracking-widest"
                >
                  {internship.duration}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors duration-300"
                >
                  {internship.title}
                </motion.h3>
                <div className="flex gap-4 mt-1">
                  <a
                    href={internship.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Source Code
                  </a>
                  <a
                    href={internship.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> Certificate
                  </a>
                </div>
              </div>

              <div className="relative z-10 flex flex-col">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-neutral-300 text-sm md:text-base mb-6 leading-relaxed"
                >
                  {internship.description}
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {internship.features.map((feature, fIndex) => (
                    <motion.div 
                      key={feature} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + fIndex * 0.05 + index * 0.1 }}
                      className="flex items-start gap-2 text-xs text-neutral-300"
                    >
                      <div className="w-1.5 h-1.5 mt-1 rounded-full bg-neutral-600 flex-shrink-0 group-hover:bg-blue-400 transition-colors" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {internship.tags.map((tag, tIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + tIndex * 0.05 + index * 0.1 }}
                      className="px-2.5 py-1 text-[10px] font-semibold bg-white/5 text-neutral-300 rounded-md group-hover:bg-blue-400/10 group-hover:text-blue-300 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
