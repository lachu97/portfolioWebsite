import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { X, Download } from 'lucide-react';
import resumeUrl from '../../resume/myresume.pdf?url';
import { useCounter } from '../../hooks';

interface ResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const METRICS = [
  { raw: 100, display: '100K+', label: 'Installs', counterTarget: 100, suffix: 'K+' },
  { raw: 99.8, display: '99.8%', label: 'Crash-Free', counterTarget: 99, suffix: '%' },
  { raw: 35, display: '~35%', label: 'Faster JS', counterTarget: 35, suffix: '%' },
] as const;

const BULLETS = [
  'Built and maintained production apps across Android & iOS',
  'Experienced with profiling and debugging using Flipper, Xcode Instruments, and Android Profiler',
  'Strong AI-assisted workflow using Claude, Cursor, and ChatGPT for faster iteration',
];

const EASE = [0.16, 1, 0.3, 1] as const;

function MetricCard({
  metric,
  index,
  start,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  start: boolean;
}) {
  const count = useCounter(metric.counterTarget, 1600, start);
  const isDecimal = metric.raw === 99.8;
  const displayCount = isDecimal ? `${count}.8${metric.suffix}` : `${count}${metric.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.07, ease: EASE }}
      whileHover={{ borderColor: 'rgba(99,102,241,0.25)', backgroundColor: 'rgba(99,102,241,0.05)' }}
      className="flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-2xl text-center cursor-default transition-colors duration-200"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span className="font-['Syne'] font-extrabold text-white text-xl leading-none tracking-tight">
        {displayCount}
      </span>
      <span className="font-['DM_Mono'] text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] leading-none">
        {metric.label}
      </span>
    </motion.div>
  );
}

export default function ResumePopup({ isOpen, onClose }: ResumePopupProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 240, damping: 36 };
  const rotateX = useSpring(useTransform(mouseY, [-180, 180], [2.5, -2.5]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-240, 240], [-2.5, 2.5]), springCfg);

  useEffect(() => {
    if (!isOpen) {
      setContentVisible(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Lakshmi_Narasimhan_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose();
  };

  const cardMotion = prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 12, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 8, scale: 0.98 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-black/65 backdrop-blur-[3px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Centering shell — pointer-events-none so clicks fall through to backdrop */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">

            {/* Ambient orb — purely decorative */}
            {!prefersReduced && (
              <motion.div
                key="orb"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute w-[560px] h-[480px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.04) 45%, transparent 72%)',
                  filter: 'blur(32px)',
                }}
                aria-hidden="true"
              />
            )}

            {/* Card wrapper — re-enables pointer events */}
            <motion.div
              key="modal"
              {...cardMotion}
              transition={{ duration: 0.3, ease: EASE }}
              onAnimationComplete={() => setContentVisible(true)}
              className="relative pointer-events-auto w-full max-w-xl"
              style={{ perspective: 1100 }}
            >
              {/* Parallax tilt layer */}
              <motion.div
                ref={cardRef}
                style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Gradient border shell */}
                <div
                  className="rounded-[26px] p-[1px]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.25) 50%, rgba(6,182,212,0.2) 100%)',
                    boxShadow: '0 28px 72px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.03) inset',
                  }}
                >
                  {/* Glass card */}
                  <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="resume-modal-title"
                    className="relative rounded-[25px] px-8 pt-8 pb-7 overflow-hidden"
                    style={{
                      background: 'rgba(8,12,22,0.86)',
                      backdropFilter: 'blur(22px)',
                      WebkitBackdropFilter: 'blur(22px)',
                    }}
                  >
                    {/* Inner top edge highlight */}
                    <div
                      className="absolute inset-x-0 top-0 h-px pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.07) 35%, rgba(255,255,255,0.07) 65%, transparent 95%)',
                      }}
                    />

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      aria-label="Close"
                      className="absolute top-5 right-5 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.06] transition-all duration-200"
                    >
                      <X size={13} />
                    </button>

                    {/* ── Header ──────────────────────────────── */}
                    <div className="mb-6 pr-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="slow-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-['DM_Mono'] text-[10px] text-emerald-400/75 uppercase tracking-[0.2em]">
                          Open to Opportunities
                        </span>
                      </div>

                      <h2
                        id="resume-modal-title"
                        className="font-['Syne'] text-[1.8rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-white mb-2.5"
                      >
                        Open to{' '}
                        <span
                          style={{
                            background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #22d3ee 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          Opportunities
                        </span>
                      </h2>

                      <p className="font-['DM_Sans'] text-[var(--text-secondary)] text-[0.88rem] leading-relaxed">
                        Shipping performant React Native products for 4+ years.
                      </p>
                    </div>

                    {/* ── Divider ──────────────────────────────── */}
                    <div
                      className="h-px mb-6"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.25) 55%, transparent 100%)',
                      }}
                    />

                    {/* ── Metrics ─────────────────────────────── */}
                    <div className="grid grid-cols-3 gap-2.5 mb-6">
                      {METRICS.map((m, i) => (
                        <MetricCard key={m.label} metric={m} index={i} start={contentVisible} />
                      ))}
                    </div>

                    {/* ── Bullets ─────────────────────────────── */}
                    <div className="space-y-3 mb-6">
                      {BULLETS.map((text, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={contentVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.28, delay: 0.18 + i * 0.06, ease: EASE }}
                          className="flex items-start gap-3"
                        >
                          <span
                            className="w-[5px] h-[5px] rounded-full shrink-0 mt-[6px]"
                            style={{ background: 'rgba(99,102,241,0.55)' }}
                            aria-hidden="true"
                          />
                          <span className="font-['DM_Sans'] text-[var(--text-secondary)] text-[0.84rem] leading-relaxed">
                            {text}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* ── Footer ──────────────────────────────── */}
                    <p className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] leading-relaxed mb-6 opacity-60">
                      Focused on scalable mobile architecture, performance optimization, and polished user experiences.
                    </p>

                    {/* ── CTAs ────────────────────────────────── */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={handleDownload}
                        whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(99,102,241,0.35)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-['DM_Sans'] font-medium text-sm"
                        style={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          boxShadow: '0 6px 20px rgba(99,102,241,0.28)',
                        }}
                      >
                        <Download size={13} strokeWidth={2.2} />
                        Download Resume
                      </motion.button>

                      <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl font-['DM_Mono'] text-[var(--text-muted)] text-xs hover:text-[var(--text-primary)] hover:bg-white/[0.05] transition-all duration-200 whitespace-nowrap"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
