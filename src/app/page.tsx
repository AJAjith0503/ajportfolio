import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-neutral-800 selection:text-white">
      {/* Hero section containing the canvas and the synchronized scroll text, along with all content */}
      <section className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* Footer */}
      <footer className="w-full py-24 border-t border-neutral-800/50 bg-[#121212] flex flex-col items-center justify-center gap-16 px-6 md:px-12 lg:px-24">
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
    </main>
  );
}
