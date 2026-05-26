import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  popupDismissed: boolean;
  onOpenPopup: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FloatingActions({ popupDismissed, onOpenPopup }: FloatingActionsProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Safe-area-aware bottom: clears iPhone home indicator
    <div
      className="fixed right-4 sm:right-6 z-[100] flex flex-col items-end gap-2.5"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Re-trigger pill */}
      <AnimatePresence>
        {popupDismissed && scrolled && (
          <motion.button
            key="popup-trigger"
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.26, ease: EASE }}
            onClick={onOpenPopup}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl glass border border-[rgba(99,102,241,0.22)] text-[var(--text-secondary)] hover:text-white hover:border-indigo-500/40 active:bg-white/[0.06] transition-colors duration-200 min-h-[44px]"
            aria-label="Open to opportunities — tap to view"
          >
            <span
              className="slow-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
              aria-hidden="true"
            />
            <span className="font-['DM_Mono'] text-[11px] tracking-wide whitespace-nowrap">
              Open to Work
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to top — 44×44 minimum touch target */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.26, ease: EASE }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-11 h-11 rounded-xl glass border border-[rgba(99,102,241,0.18)] text-[var(--text-muted)] hover:text-white hover:border-indigo-500/35 active:bg-white/[0.06] transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
