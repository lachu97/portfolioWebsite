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
  { label: 'Installs',   target: 100, suffix: 'K+' },
  { label: 'Crash-Free', target: 99,  suffix: '%'  },
  { label: 'Faster JS',  target: 35,  suffix: '%'  },
] as const;

const BULLETS = [
  'Production apps on Android & iOS — 100K+ installs',
  'Kotlin & Swift native modules, Fastlane CI/CD',
  'AI workflow: Claude, Cursor, ChatGPT',
];

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
            className="fixed bottom-0 left-0 right-0 z-[201] rounded-t-[28px]"
            style={{
              background: 'rgba(8,12,22,0.98)',
              borderTop: '1px solid rgba(99,102,241,0.35)',
              boxShadow: '0 -16px 48px rgba(0,0,0,0.6)',
              width: '100vw',
              maxWidth: '100vw',
              overflowX: 'hidden',
            }}
          >
            {/* Top gradient line */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.6) 40%, rgba(139,92,246,0.4) 60%, transparent 95%)' }}
            />

            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-9 h-1 rounded-full bg-white/20" />
            </div>

            {/* Content — fixed px so rem scaling doesn't bite */}
            <div style={{ padding: '12px 20px', paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}>

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div style={{ maxWidth: 'calc(100% - 44px)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="slow-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(52,211,153,0.8)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                      Open to Opportunities
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#fff', lineHeight: 1.15, margin: 0 }}>
                    React Native{' '}
                    <span style={{ background: 'linear-gradient(135deg,#818cf8,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      Engineer
                    </span>
                  </h2>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    4 yrs · iOS &amp; Android · SDE II
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{ padding: '8px', borderRadius: '10px', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0 }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', marginBottom: '16px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2), transparent)' }} />

              {/* Metrics — fixed pixel sizes, no rem */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {METRICS.map((m) => (
                  <div
                    key={m.label}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '12px 4px', textAlign: 'center' }}
                  >
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: '#fff', lineHeight: 1 }}>
                      <Counter target={m.target} suffix={m.suffix} start={started} />
                    </div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {BULLETS.map((text) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(99,102,241,0.6)', flexShrink: 0, marginTop: '5px' }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0, flex: 1 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <motion.button
                onClick={handleDownload}
                whileTap={{ scale: 0.97 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 6px 20px rgba(99,102,241,0.3)', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}
              >
                <Download size={14} strokeWidth={2.2} />
                Download Resume
              </motion.button>

              <button
                onClick={onClose}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}
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
