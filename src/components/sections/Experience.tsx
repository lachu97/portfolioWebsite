import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { EXPERIENCE } from '../../constants';
import { ExternalLink, Zap } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6', JavaScript: '#F7DF1E',
  'React Native': '#61DAFB', React: '#61DAFB',
  Kotlin: '#7F52FF', Swift: '#F05138',
  Android: '#3DDC84', iOS: '#ffffff',
  'Node.js': '#339933', Python: '#FFD43B',
  FastAPI: '#009688', PostgreSQL: '#4169E1',
  GraphQL: '#E10098',
  Fastlane: '#e11d48', CodePush: '#0078D4',
  Firebase: '#FFCA28', Crashlytics: '#FF6B35',
  Docker: '#2496ED', 'GitHub Actions': '#2088FF',
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="experience" ref={ref} className="py-20 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">03 — Experience</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-extrabold text-4xl md:text-5xl text-white">
            Where I've<span className="text-gradient"> shipped</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px">
            <motion.div
              className="w-full bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
              style={{ height: '100%' }}
            />
          </div>

          <div className="pl-10 space-y-10">
            {EXPERIENCE.map((exp, i) => {
              const metrics = (exp as any).metrics as string[] | undefined;

              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.38, delay: i * 0.08 + 0.08, ease: EASE }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.6rem] top-5 flex items-center justify-center">
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full border-2 ${
                        exp.highlight
                          ? 'bg-indigo-500 border-indigo-400'
                          : 'bg-[var(--bg-primary)] border-indigo-500/40'
                      }`}
                      whileHover={{ scale: 1.5 }}
                    />
                    {exp.highlight && (
                      <div className="absolute w-5 h-5 rounded-full bg-indigo-500/20 animate-ping" />
                    )}
                  </div>

                  <TiltCard
                    className={`gradient-border-card p-5 ${exp.highlight ? 'glow-indigo' : ''}`}
                    glowColor={exp.highlight ? '#6366f1' : '#8b5cf6'}
                    maxTilt={5}
                    style={exp.highlight ? { boxShadow: '0 0 32px rgba(99,102,241,0.12)' } : {}}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-['DM_Sans'] font-semibold text-base text-white">{exp.role}</h3>
                          {exp.highlight && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-[10px] font-['DM_Mono']">
                              <Zap size={9} /> Current
                            </span>
                          )}
                        </div>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-['DM_Mono'] text-xs text-indigo-400/80 hover:text-indigo-300 transition-colors group/link"
                        >
                          {exp.company}
                          <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </div>
                      <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)] shrink-0 mt-0.5">
                        {exp.period}
                      </span>
                    </div>

                    {/* Metric callouts — only for entries with hard numbers */}
                    {metrics && metrics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {metrics.map(m => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded-md font-['DM_Mono'] text-[10px] border"
                            style={{
                              background: 'rgba(99,102,241,0.08)',
                              borderColor: 'rgba(99,102,241,0.22)',
                              color: '#a5b4fc',
                            }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] font-['DM_Sans'] leading-relaxed text-sm mb-4">
                      {exp.description}
                    </p>

                    {/* Tech tags — tightened */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-['DM_Mono'] border"
                          style={{
                            background: `${LANG_COLORS[tech] || '#6366f1'}12`,
                            borderColor: `${LANG_COLORS[tech] || '#6366f1'}28`,
                            color: LANG_COLORS[tech] || '#6366f1',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
