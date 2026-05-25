import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Terminal } from 'lucide-react';
import { NAV_ITEMS, CONFIG } from '../../constants';
import { useScrollProgress } from '../../hooks';
import profilePic from '../../pic/pic.png';
import resumeUrl from '../../resume/myresume.pdf?url';

interface NavbarProps {
  onCommandPalette: () => void;
}

export default function Navbar({ onCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-[rgba(99,102,241,0.15)] py-3'
            : 'py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
              <img src={profilePic} alt={CONFIG.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="font-['Syne'] font-700 text-white hidden sm:block">
              {CONFIG.name.split(' ')[0]}
              <span className="text-gradient">.</span>
            </span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.05 }}
                className="relative px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors duration-200 font-['DM_Sans'] group"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-indigo-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </motion.button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onCommandPalette}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-[rgba(99,102,241,0.2)] text-[var(--text-secondary)] text-xs font-['DM_Mono'] hover:text-white hover:border-indigo-500/40 transition-all duration-200"
            >
              <Terminal size={12} />
              <span>⌘K</span>
            </motion.button>

            <motion.a
              href={resumeUrl}
              download="Lakshmi_Narasimhan_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-['DM_Sans'] font-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
            >
              <Download size={14} />
              Resume
            </motion.a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden glass border-t border-[rgba(99,102,241,0.15)] overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="py-3 text-left text-[var(--text-secondary)] hover:text-white transition-colors font-['DM_Sans'] border-b border-[rgba(99,102,241,0.08)]"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); onCommandPalette(); }}
                  className="py-3 text-left text-indigo-400 font-['DM_Mono'] text-sm"
                >
                  ⌘ Command Palette
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
