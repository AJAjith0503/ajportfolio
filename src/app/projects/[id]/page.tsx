'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Target, 
  Cpu, 
  Database, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  MessageSquare,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { projects } from '@/data/projects';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <Link 
          href="/#projects" 
          className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Projects</span>
        </Link>
        <div className="flex gap-4">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          {project.liveLink !== '#' && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-white transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            {project.type}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            {project.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 max-w-3xl font-light leading-relaxed mb-10"
          >
            {project.oneLineImpact}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-full text-xs font-medium text-neutral-300">
                {tag}
              </span>
            ))}
          </motion.div>


        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 space-y-32 pb-32">
        
        {/* UI/UX Showcase */}
        {project.uiuxScreens && project.uiuxScreens.some(s => s.image) && (
          <section>
            <motion.div {...fadeIn} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6 text-pink-400">
                <Target className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Interface Design</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">User Experience</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.uiuxScreens.map((screen, i) => (
                screen.image && (
                  <motion.div 
                    key={i} 
                    {...fadeIn}
                    transition={{ delay: i * 0.1 }}
                    className={`group flex flex-col gap-4 ${screen.layout === 'desktop' ? 'md:col-span-2 lg:col-span-3' : ''}`}
                  >
                    <div className={`rounded-[2.5rem] bg-neutral-900 border-[8px] border-neutral-800 overflow-hidden relative shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] ${screen.layout === 'desktop' ? 'aspect-video' : 'aspect-[9/19] max-w-[300px] mx-auto'}`}>
                      <img 
                        src={screen.image} 
                        alt={screen.name} 
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                        <span className="text-white text-sm font-medium">{screen.name}</span>
                      </div>
                    </div>
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest text-center mt-2">{screen.name}</span>
                  </motion.div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Problem & Motivation */}
        {project.problemStatement && (
          <section className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <Target className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Problem Statement</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Real-World Social Impact</h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                {project.problemStatement.text}
              </p>
              <div className="space-y-4">
                {project.problemStatement.stats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5">
                    <span className="text-lg md:text-xl font-bold text-white block tracking-tight">{stat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/10">
              <h3 className="text-xl font-bold mb-6">Research Motivation</h3>
              {project.motivation ? (
                <ul className="space-y-4">
                  {project.motivation.map((m, i) => (
                    <li key={i} className="flex gap-4 text-neutral-400 leading-relaxed">
                      <span className="text-blue-500 font-bold">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-400 leading-relaxed">
                  Most existing AI solutions for food detection are built for general users, ignoring the specific accessibility needs of the visually impaired. This project bridges that gap by integrating high-performance vision with intuitive voice feedback.
                </p>
              )}
            </motion.div>
          </section>
        )}

        {/* Architecture */}
        {project.architecture && (
          <section>
            <motion.div {...fadeIn} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6 text-purple-400">
                <Cpu className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">System Design</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Modern Architecture</h2>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {project.architecture.modules.map((module, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 min-w-[280px] max-w-[320px] p-8 rounded-[2rem] bg-neutral-900/40 border border-white/5 hover:bg-neutral-800/60 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                    {i === 0 && <MessageSquare className="w-6 h-6" />}
                    {i === 1 && <Cpu className="w-6 h-6" />}
                    {i === 2 && <ShieldCheck className="w-6 h-6" />}
                    {i === 3 && <Zap className="w-6 h-6" />}
                    {i > 3 && <Target className="w-6 h-6" />}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{module.name}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{module.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* AI/ML Engineering */}
        {project.aiEngineering && (
          <section className="bg-neutral-900/30 rounded-[3rem] p-8 md:p-16 border border-white/5">
            <motion.div {...fadeIn} className="flex flex-col md:flex-row gap-16">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6 text-green-400">
                  <Database className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI/ML Engineering</span>
                </div>
                <h2 className="text-4xl font-bold mb-8 tracking-tight">Advanced Model Optimization</h2>
                <div className="space-y-6">
                  {project.aiEngineering.models.map((model, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-black/20 border border-white/5">
                      <div className="shrink-0 font-mono text-neutral-600 text-sm">0{i+1}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">{model.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-500 uppercase">{model.optimization}</span>
                        </div>
                        <p className="text-neutral-500 text-sm">{model.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-8">
                <div className="p-8 rounded-[2rem] bg-white/5">
                  <h3 className="text-lg font-bold mb-6">Core Methodology</h3>
                  <ul className="grid grid-cols-1 gap-4">
                    {project.aiEngineering.mentions.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-neutral-400 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.datasetEngineering && (
                  <div className="p-8 rounded-[2rem] bg-blue-500/10 border border-blue-500/20">
                    <h3 className="text-lg font-bold mb-4">Dataset Pipeline</h3>
                    <p className="text-sm text-neutral-400 mb-6">{project.datasetEngineering.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.datasetEngineering.stats.map((stat, i) => (
                        <span key={i} className="px-3 py-1 bg-black/30 rounded-lg text-[10px] text-neutral-300 font-medium">{stat}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        )}

        {/* Metrics & Results */}
        {project.metrics && (
          <section>
            <motion.div {...fadeIn} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6 text-yellow-400">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Results & Metrics</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Performance Benchmarks</h2>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {project.metrics.map((metric, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 min-w-[180px] max-w-[240px] p-8 rounded-[2rem] bg-neutral-900 border border-white/5 text-center group hover:bg-blue-600 transition-all duration-500 flex flex-col justify-center items-center"
                >
                  <span className="block text-4xl font-bold mb-2 tracking-tighter group-hover:scale-110 transition-transform break-words w-full">{metric.result}</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-white/80">{metric.name}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Unique Innovations */}
        {project.innovations && (
          <section className="max-w-4xl mx-auto">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-bold mb-12 tracking-tight text-center">What Makes This Unique</h2>
              <div className="space-y-6">
                {project.innovations.map((inn, i) => {
                  const [title, desc] = inn.split(':');
                  return (
                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-neutral-900/40 border border-white/5 hover:bg-neutral-900 transition-colors h-full">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center text-white font-bold italic">
                        {i+1}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold mb-1">{title}</h3>
                        {desc && <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>
        )}

        {/* Research Section */}
        {project.research && (
          <section className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <motion.div {...fadeIn} className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Publication</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-none">
                {project.research.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                    "{project.research.abstract}"
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {project.research.details.map((detail, i) => (
                      <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-black/20 backdrop-blur-md border border-white/10">
                  <h3 className="font-bold mb-4">Key Contribution</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Introduced the "Two-Side Analysis Strategy" for robust freshness validation, achieving state-of-the-art results for mobile-deployed deep learning models in the assistive technology domain.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Technical Skills Showcase */}
        {project.skills && project.skills.length > 0 && (
          <section className="pt-20 border-t border-white/5">
            <motion.div {...fadeIn} className="flex flex-col md:flex-row gap-16">
              <div className="w-full md:w-1/3">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">Technical Mastery</h2>
                <p className="text-neutral-500">A comprehensive list of skills and technologies leveraged to bring this project to life.</p>
              </div>
              <div className="w-full md:w-2/3 flex flex-wrap gap-3">
                {project.skills.map(skill => (
                  <span key={skill} className="px-5 py-3 bg-neutral-900 border border-white/5 rounded-2xl text-sm font-medium hover:bg-white hover:text-black transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Challenges & Future */}
        {(project.challenges || project.futureImprovements) && (
          <section className={`grid ${project.challenges && project.futureImprovements ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
            {project.challenges && project.challenges.length > 0 && (
              <motion.div {...fadeIn} className="p-12 rounded-[3rem] bg-neutral-900/50 border border-white/5">
                <div className="flex items-center gap-3 mb-8 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Challenges Solved</span>
                </div>
                <ul className="space-y-4">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="flex gap-4 text-neutral-400 text-sm leading-relaxed">
                      <span className="text-blue-500 font-bold">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <motion.div {...fadeIn} className="p-12 rounded-[3rem] bg-neutral-900/50 border border-white/5">
                <div className="flex items-center gap-3 mb-8 text-blue-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Future Roadmap</span>
                </div>
                <ul className="space-y-4">
                  {project.futureImprovements.map((future, i) => (
                    <li key={i} className="flex gap-4 text-neutral-400 text-sm leading-relaxed">
                      <span className="text-blue-500 font-bold">•</span>
                      {future}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </section>
        )}

        {/* Call to Action Footer */}
        <section className="text-center pt-20">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-8">Interested in the full research?</h2>
            <div className="flex justify-center gap-4">
              <a 
                href={project.link} 
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View Repository
              </a>
              <Link 
                href="/#contact" 
                className="px-8 py-4 bg-neutral-900 border border-white/10 text-white rounded-full font-bold hover:bg-neutral-800 transition-colors"
              >
                Let's Discuss
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
