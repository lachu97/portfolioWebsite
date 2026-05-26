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

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar({ onCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // iOS-safe scroll lock: freezes page position while menu is open
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (top) window.scrollTo(0, parseInt(top) * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Small delay lets exit animation start before scroll fires
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 120);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-[rgba(99,102,241,0.15)] py-3' : 'py-4 sm:py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
              <img src={profilePic} alt={CONFIG.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="font-['Syne'] font-bold text-white text-sm sm:text-base hidden sm:block">
              {CONFIG.name}<span className="text-gradient">.</span>
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

          {/* Desktop right actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onCommandPalette}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
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
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-['DM_Sans'] font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
            >
              <Download size={14} />
              Resume
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen(v => !v)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 -mr-1.5 text-[var(--text-secondary)] hover:text-white transition-colors rounded-lg"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.14 }}><X    size={18} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.14 }}><Menu size={18} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/55 backdrop-blur-[2px] md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel — slides in from right */}
            <motion.div
              key="mob-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-[272px] flex flex-col md:hidden"
              style={{
                background: 'rgba(7,10,20,0.98)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(99,102,241,0.14)',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-[rgba(99,102,241,0.09)] shrink-0">
                <span className="font-['DM_Mono'] text-[10px] text-[var(--text-muted)] uppercase tracking-[0.22em]">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 -mr-1.5 text-[var(--text-muted)] hover:text-white transition-colors rounded-lg"
                  aria-label="Close menu"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 px-3 py-3 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2, ease: EASE }}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center justify-between w-full px-3 py-3.5 rounded-xl text-left text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.04] transition-all duration-200 font-['DM_Sans'] text-base group"
                  >
                    {item.label}
                    <span className="text-[var(--text-muted)] text-sm opacity-0 group-hover:opacity-60 transition-opacity duration-200" aria-hidden="true">
                      →
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <div className="px-4 pt-3 border-t border-[rgba(99,102,241,0.09)] space-y-2.5 shrink-0 pb-safe">
                <a
                  href={resumeUrl}
                  download="Lakshmi_Narasimhan_Resume.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-['DM_Sans'] font-medium text-sm"
                >
                  <Download size={13} strokeWidth={2.2} />
                  Download Resume
                </a>
                <button
                  onClick={() => { setMobileOpen(false); onCommandPalette(); }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[rgba(99,102,241,0.18)] text-[var(--text-muted)] font-['DM_Mono'] text-xs hover:text-white hover:border-indigo-500/30 transition-all duration-200"
                >
                  <Terminal size={11} />
                  ⌘K Command Palette
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
