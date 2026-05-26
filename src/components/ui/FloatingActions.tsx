import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Briefcase } from 'lucide-react';

interface FloatingActionsProps {
  popupDismissed: boolean;
  onOpenPopup: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const FAB: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(30,36,70,0.98), rgba(20,26,54,0.98))',
  border: '1.5px solid rgba(99,102,241,0.65)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 12px rgba(99,102,241,0.25)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
};

const TOOLTIP_STYLE: React.CSSProperties = {
  background: 'rgba(12, 16, 32, 0.97)',
  border: '1px solid rgba(99,102,241,0.4)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
};

export default function FloatingActions({ popupDismissed, onOpenPopup }: FloatingActionsProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fixed pixel bottom — bypasses 20px base rem scaling
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
    right: '16px',
    zIndex: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Open to Work — desktop: pill + tooltip / mobile: icon button */}
      <AnimatePresence>
        {popupDismissed && scrolled && (
          <motion.div
            key="popup-trigger-group"
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.26, ease: EASE }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}
          >
            {/* Desktop: tooltip + pill */}
            <div className="hidden sm:flex flex-col items-end gap-1.5">
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.3, delay: 0.18, ease: EASE }}
                style={{ ...TOOLTIP_STYLE, position: 'relative', padding: '6px 10px', borderRadius: '8px', pointerEvents: 'none' }}
              >
                <div
                  style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '-5px', width: '8px', height: '8px', rotate: '45deg', background: 'rgba(12,16,32,0.97)', borderRight: '1px solid rgba(99,102,241,0.4)', borderBottom: '1px solid rgba(99,102,241,0.4)' }}
                />
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap', lineHeight: 1 }}>
                  Psst — worth a look&nbsp;👀
                </p>
              </motion.div>
              <button
                onClick={onOpenPopup}
                style={{ ...FAB, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', minHeight: '44px', cursor: 'pointer' }}
                aria-label="Open to opportunities"
              >
                <span className="slow-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.06em', whiteSpace: 'nowrap', color: '#fff' }}>
                  Open to Work
                </span>
              </button>
            </div>

            {/* Mobile: icon-only briefcase button */}
            <button
              onClick={onOpenPopup}
              className="flex sm:hidden"
              style={{ ...FAB, position: 'relative', width: '48px', height: '48px', borderRadius: '14px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
              aria-label="Open to opportunities"
            >
              <Briefcase size={20} strokeWidth={1.8} />
              <span
                className="slow-pulse"
                style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', border: '1.5px solid rgba(8,12,22,0.9)' }}
                aria-hidden="true"
              />
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
            style={{ ...FAB, width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
