import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Smartphone, Shield, Zap, Bot } from 'lucide-react';
import resumeUrl from '../../resume/myresume.pdf?url';

interface ResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const REASONS = [
  {
    icon: Smartphone,
    metric: '100K+ installs',
    detail: 'Production apps on Android & iOS, US market',
    color: '#61DAFB',
  },
  {
    icon: Shield,
    metric: '99.8% crash-free',
    detail: 'Profiled with Flipper, Xcode Instruments & Android Profiler',
    color: '#22c55e',
  },
  {
    icon: Zap,
    metric: '~35% faster JS',
    detail: 'Memoization, FlatList virtualization, Hermes tuning',
    color: '#f59e0b',
  },
  {
    icon: Bot,
    metric: 'AI-native workflow',
    detail: 'Claude, Cursor & ChatGPT integrated into daily dev process',
    color: '#C084FC',
  },
];

export default function ResumePopup({ isOpen, onClose }: ResumePopupProps) {
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
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[150] w-full max-w-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-popup-title"
            className="rounded-2xl p-5 shadow-2xl"
            style={{
              background: 'rgba(10,15,30,0.96)',
              border: '1px solid rgba(99,102,241,0.35)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.15)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={14} />
            </button>

            {/* Header */}
            <div className="mb-4 pr-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                <span className="font-['DM_Mono'] text-xs text-green-400 uppercase tracking-widest">
                  Open to opportunities
                </span>
              </div>
              <h3 id="resume-popup-title" className="font-['Syne'] font-800 text-white text-lg leading-snug">
                Still evaluating?<br />
                <span className="text-gradient">Here's the short version.</span>
              </h3>
              <p className="font-['DM_Sans'] text-sm text-[var(--text-secondary)] mt-1">
                4 years shipping React Native apps people actually use.
              </p>
            </div>

            {/* Reasons */}
            <div className="space-y-3 mb-5">
              {REASONS.map(({ icon: Icon, metric, detail, color }) => (
                <div key={metric} className="flex items-start gap-3">
                  <div
                    className="p-1.5 rounded-lg shrink-0 mt-0.5"
                    style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={13} style={{ color }} />
                  </div>
                  <div>
                    <span className="font-['Syne'] font-700 text-white text-sm">{metric}</span>
                    <span className="font-['DM_Sans'] text-xs text-[var(--text-muted)] block leading-snug">
                      {detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-['DM_Sans'] font-500 text-sm mb-2"
            >
              <Download size={14} />
              Download Resume
            </motion.button>

            <button
              onClick={onClose}
              className="w-full text-center text-xs font-['DM_Mono'] text-[var(--text-muted)] hover:text-white transition-colors py-1"
            >
              Maybe later <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
