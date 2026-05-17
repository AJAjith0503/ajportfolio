import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Internships', href: '#internships' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || isOpen ? 'bg-[#121212]/80 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="z-50 flex items-center group">
            <img 
              src="/images/logo.png" 
              alt="AJ Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="h-4 w-px bg-neutral-700" />
            <a
              href="https://drive.google.com/file/d/1vk7wMwu0GBnxhMGTzD1ld2_tDmLaf2Fd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold px-4 py-2 bg-white text-black rounded-full hover:scale-105 transition-transform"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 z-50 hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#121212] z-[55] md:hidden flex flex-col items-center justify-center p-8"
          >
            <ul className="flex flex-col items-center gap-8 mb-12">
              {links.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold text-white hover:text-neutral-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.1 + 0.2 }}
              href="https://drive.google.com/file/d/1vk7wMwu0GBnxhMGTzD1ld2_tDmLaf2Fd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs text-center text-lg font-bold py-4 bg-white text-black rounded-2xl"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
