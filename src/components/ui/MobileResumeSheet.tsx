import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import resumeUrl from '../../resume/myresume.pdf?url';
import { useCounter } from '../../hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const METRICS = [
  { label: 'Installs',   display: '100K+', target: 100, suffix: 'K+' },
  { label: 'Crash-Free', display: '99.8%', target: 99,  suffix: '%'  },
  { label: 'Faster JS',  display: '~35%',  target: 35,  suffix: '%'  },
] as const;

function Counter({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const count = useCounter(target, 1400, start);
  return <>{count}{suffix}</>;
}

export default function MobileResumeSheet({ isOpen, onClose }: Props) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isOpen) { setStarted(false); return; }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setStarted(true), 200);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Lakshmi_Narasimhan_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Bottom sheet */}
          <motion.div
            key="mob-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 0.9 }}
            className="fixed bottom-0 left-0 right-0 z-[201] rounded-t-3xl overflow-hidden"
            style={{
              background: 'rgba(8,12,22,0.97)',
              borderTop: '1px solid rgba(99,102,241,0.35)',
              borderLeft: '1px solid rgba(99,102,241,0.15)',
              borderRight: '1px solid rgba(99,102,241,0.15)',
              boxShadow: '0 -16px 48px rgba(0,0,0,0.5)',
              paddingBottom: 'env(safe-area-inset-bottom, 20px)',
            }}
          >
            {/* Top gradient line */}
            <div
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.6) 35%, rgba(139,92,246,0.4) 65%, transparent 95%)' }}
            />

            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div className="px-6 pt-4 pb-6">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="slow-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-['DM_Mono'] text-[10px] text-emerald-400/80 uppercase tracking-[0.18em]">
                      Open to Opportunities
                    </span>
                  </div>
                  <h2 className="font-['Syne'] font-extrabold text-2xl text-white leading-tight">
                    React Native{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #818cf8, #a78bfa, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      Engineer
                    </span>
                  </h2>
                  <p className="font-['DM_Sans'] text-sm text-[var(--text-secondary)] mt-1">
                    4 yrs · iOS &amp; Android · SDE II
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-[var(--text-muted)] hover:text-white hover:bg-white/[0.07] transition-all duration-200 shrink-0 ml-4"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Divider */}
              <div
                className="h-px mb-5"
                style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2), transparent)' }}
              />

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                {METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-2xl text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span className="font-['Syne'] font-extrabold text-white text-lg leading-none">
                      <Counter target={m.target} suffix={m.suffix} start={started} />
                    </span>
                    <span className="font-['DM_Mono'] text-[9px] text-[var(--text-muted)] uppercase tracking-[0.12em] leading-none">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-2.5 mb-6">
                {[
                  'Production apps on Android & iOS — 100K+ installs',
                  'Kotlin & Swift native modules, Fastlane CI/CD',
                  'AI-assisted workflow: Claude, Cursor, ChatGPT',
                ].map((text) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <span className="w-[5px] h-[5px] rounded-full bg-indigo-500/60 shrink-0 mt-[6px]" />
                    <span className="font-['DM_Sans'] text-sm text-[var(--text-secondary)] leading-snug">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <motion.button
                onClick={handleDownload}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-['DM_Sans'] font-medium text-sm mb-2.5"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  boxShadow: '0 6px 20px rgba(99,102,241,0.3)',
                }}
              >
                <Download size={14} strokeWidth={2.2} />
                Download Resume
              </motion.button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-['DM_Mono'] text-sm text-[var(--text-muted)] hover:text-white hover:bg-white/[0.05] transition-all duration-200"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
