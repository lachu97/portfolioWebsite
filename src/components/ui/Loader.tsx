import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../../constants';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const lines = [
    '> Initializing portfolio...',
    '> Loading components...',
    '> Fetching GitHub data...',
    '> Ready.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 150);
          return 100;
        }
        return p + 5;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    setPhase(Math.min(Math.floor(progress / 25), 3));
  }, [progress]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] bg-[var(--bg-primary)] flex items-center justify-center"
    >
      <div className="w-full max-w-sm px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 mb-4 shadow-2xl shadow-indigo-500/40">
            <span className="font-['Syne'] font-800 text-white text-xl">LN</span>
          </div>
          <p className="font-['DM_Mono'] text-xs text-indigo-400">{CONFIG.name}</p>
        </motion.div>

        {/* Terminal lines */}
        <div className="font-['DM_Mono'] text-xs space-y-1.5 mb-6">
          {lines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: phase >= i ? 1 : 0.2, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={phase >= i ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}
            >
              {phase >= i ? (
                <span>
                  {i < phase ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <span className="text-cyan-400 animate-pulse">▋</span>
                  )}{' '}
                  {line.replace('> ', '')}
                </span>
              ) : (
                <span>{line}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-px w-full bg-[rgba(99,102,241,0.1)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">v2.0.0</span>
          <span className="font-['DM_Mono'] text-xs text-indigo-400">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
