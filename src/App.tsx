import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollProgress } from './hooks';
import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CommandPalette from './components/layout/CommandPalette';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Experience from './components/sections/Experience';
import LiveApps from './components/sections/LiveApps';
import Projects from './components/sections/Projects';
import Stats from './components/sections/Stats';
import Contact from './components/sections/Contact';
import { CONFIG } from './constants';
import ResumePopup from './components/ui/ResumePopup';
import FloatingActions from './components/ui/FloatingActions';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const progress = useScrollProgress();
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(p => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.title = `${CONFIG.name} — ${CONFIG.title}`;
  }, []);

  useEffect(() => {
    if (loading) return;
    const el = document.querySelector('#stack');
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setShowPopup(true), 600);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      {!loading && (
        <div className="mesh-bg min-h-screen">
          {/* Left side scroll progress */}
          <div className="fixed left-0 top-0 bottom-0 w-[3px] z-40 bg-white/[0.03] hidden lg:block">
            <motion.div
              className="w-full origin-top rounded-full"
              style={{
                height: `${progress * 100}%`,
                background: 'linear-gradient(to bottom, #6366f1, #8b5cf6, #06b6d4)',
                boxShadow: '0 0 10px rgba(99,102,241,0.8)',
              }}
            />
          </div>
          <Navbar onCommandPalette={() => setCommandOpen(true)} />
          <main>
            <Hero />
            <About />
            <TechStack />
            <Experience />
            <LiveApps />
            <Projects />
            <Stats />
            <Contact />
          </main>
          <Footer />
          <ResumePopup
            isOpen={showPopup}
            onClose={() => { setShowPopup(false); setPopupDismissed(true); }}
          />
          <FloatingActions
            popupDismissed={popupDismissed}
            onOpenPopup={() => setShowPopup(true)}
          />
        </div>
      )}
    </>
  );
}
