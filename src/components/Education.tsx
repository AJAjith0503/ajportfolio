import { motion, Variants } from 'framer-motion';

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'REVA University, Bengaluru',
    duration: '2024 – 2026',
    score: 'CGPA: 7.95',
  },
  {
    degree: 'Bachelor of Science',
    institution: 'Government First Grade College, Bengaluru',
    duration: '2021 – 2024',
    score: 'CGPA: 7.54',
  },
  {
    degree: 'Pre-University College (PUC)',
    institution: 'Govt PU College, Devalapura, Karnataka',
    duration: '2019 – 2021',
    score: 'Percentage: 69.76%',
  },
  {
    degree: 'SSLC (Metric)',
    institution: 'SSRHS School, SS Math, Tumakur',
    duration: '2018 – 2019',
    score: 'Percentage: 67.86%',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    },
  },
};

export default function Education() {
  return (
    <section id="education" className="relative w-full z-20">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <span className="text-neutral-500 font-medium tracking-widest uppercase text-xs mb-2 block">Academic Background</span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Education
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-[1px] bg-neutral-800 origin-left" 
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative border-l border-neutral-800 ml-4 md:ml-8 pl-8 md:pl-12 py-4 space-y-8 md:space-y-10"
        >
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: index * 0.1 
                }}
                className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full border-2 border-[#121212] bg-white group-hover:bg-blue-400 transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
              />
              
              <div className="flex flex-col gap-1">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-neutral-500 text-xs font-semibold tracking-wider font-mono"
                >
                  {item.duration}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-lg md:text-2xl font-bold text-white leading-snug group-hover:text-blue-400 transition-colors duration-300"
                >
                  {item.degree}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="text-base text-neutral-300"
                >
                  {item.institution}
                </motion.p>
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="inline-block mt-1 px-3 py-1 bg-neutral-900 text-neutral-300 text-xs font-medium rounded-md w-fit border border-neutral-800 group-hover:border-neutral-600 transition-colors"
                >
                  {item.score}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
