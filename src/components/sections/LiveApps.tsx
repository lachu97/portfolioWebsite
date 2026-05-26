import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useInView } from '../../hooks';
import { LIVE_APPS } from '../../constants';

const EASE = [0.16, 1, 0.3, 1] as const;


export default function LiveApps() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="apps" className="py-24 sm:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14 sm:mb-16"
        >
          <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">
            04 — Live Apps
          </span>
          <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mt-3 mb-4">
            Shipped to Production
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-xl leading-relaxed">
            Apps I've built and shipped — live on Google Play, used by real people.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIVE_APPS.map((app, i) => (
            <motion.a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
              className="gradient-border-card group flex flex-col gap-4 p-5 rounded-2xl hover:border-indigo-400/40 transition-all duration-200 cursor-pointer"
              whileHover={{ y: -3 }}
            >
              {/* Top row: name + external icon */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-['Syne'] font-bold text-lg text-[var(--text-primary)] leading-tight">
                  {app.name}
                </h3>
                <ExternalLink
                  size={14}
                  className="text-white/30 group-hover:text-indigo-400 transition-colors duration-200 shrink-0 mt-1"
                />
              </div>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                {app.description}
              </p>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap">
                {app.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-['DM_Mono'] text-xs text-indigo-300 px-2.5 py-1 rounded-lg"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Play Store label */}
              <div
                className="flex items-center gap-2 pt-1 border-t border-white/[0.05]"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none">
                  <path d="M3 20.5v-17l18 8.5-18 8.5z" fill="url(#play-grad)" />
                  <defs>
                    <linearGradient id="play-grad" x1="3" y1="3.5" x2="21" y2="12">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="font-['DM_Mono'] text-xs text-white/40 group-hover:text-indigo-300 transition-colors duration-200">
                  View on Google Play
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
