import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CommandPalette from './components/layout/CommandPalette';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Stats from './components/sections/Stats';
import Contact from './components/sections/Contact';
import { CONFIG } from './constants';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);

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

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      {!loading && (
        <div className="mesh-bg min-h-screen">
          <Navbar onCommandPalette={() => setCommandOpen(true)} />
          <main>
            <Hero />
            <About />
            <TechStack />
            <Experience />
            <Projects />
            <Stats />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
