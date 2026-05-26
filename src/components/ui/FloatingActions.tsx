import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  popupDismissed: boolean;
  onOpenPopup: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const FAB_STYLE: React.CSSProperties = {
  background: 'rgba(18, 24, 46, 0.92)',
  border: '1px solid rgba(99,102,241,0.45)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.12) inset',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
};

const TOOLTIP_STYLE: React.CSSProperties = {
  background: 'rgba(12, 16, 32, 0.95)',
  border: '1px solid rgba(99,102,241,0.35)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
};

export default function FloatingActions({ popupDismissed, onOpenPopup }: FloatingActionsProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed right-4 sm:right-6 z-[100] flex flex-col items-end gap-2.5"
      style={{ top: '58%', transform: 'translateY(-50%)' }}
    >
      {/* Pill + tooltip group */}
      <AnimatePresence>
        {popupDismissed && scrolled && (
          <motion.div
            key="popup-trigger-group"
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.26, ease: EASE }}
            className="flex flex-col items-end gap-1.5"
          >
            {/* Tooltip — always visible, fades in after pill */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.3, delay: 0.18, ease: EASE }}
              style={TOOLTIP_STYLE}
              className="px-2.5 py-1.5 rounded-lg pointer-events-none"
            >
              {/* Arrow pointing down toward pill */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-2 h-2 rotate-45"
                style={{ background: 'rgba(12,16,32,0.95)', borderRight: '1px solid rgba(99,102,241,0.35)', borderBottom: '1px solid rgba(99,102,241,0.35)' }}
              />
              <p className="font-['DM_Mono'] text-sm text-white/80 whitespace-nowrap leading-none">
                Psst — worth a look&nbsp;👀
              </p>
            </motion.div>

            {/* Pill button */}
            <button
              onClick={onOpenPopup}
              style={FAB_STYLE}
              className="flex items-center gap-2 px-4 py-3 rounded-xl min-h-[44px] hover:border-indigo-400/70 active:scale-95 transition-all duration-200"
              aria-label="Open to opportunities"
            >
              <span className="slow-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-['DM_Mono'] text-[11px] tracking-wide whitespace-nowrap text-white">
                Open to Work
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top */}
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
            style={FAB_STYLE}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-white hover:border-indigo-400/70 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} strokeWidth={2.2} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
