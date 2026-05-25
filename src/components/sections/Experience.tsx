import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { EXPERIENCE } from '../../constants';
import { ExternalLink, Zap } from 'lucide-react';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6', JavaScript: '#F7DF1E', React: '#61DAFB',
  Go: '#00ADD8', Python: '#FFD43B', Rust: '#CE422B',
  'Ruby on Rails': '#CC0000', 'Next.js': '#ffffff', WebGL: '#990000',
};

export default function Experience() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">03 — Experience</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-800 text-4xl md:text-5xl text-white">
            Where I've
            <span className="text-gradient"> shipped</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px">
            <motion.div
              className="w-full bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%' }}
            />
          </div>

          <div className="pl-10 space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.6rem] top-5 flex items-center justify-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 ${exp.highlight ? 'bg-indigo-500 border-indigo-400' : 'bg-[var(--bg-primary)] border-indigo-500/50'}`}
                    whileHover={{ scale: 1.5 }}
                  />
                  {exp.highlight && (
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-500/20 animate-ping" />
                  )}
                </div>

                {/* Card */}
                <div className={`gradient-border-card p-6 transition-all duration-300 group-hover:border-indigo-500/40 ${exp.highlight ? 'glow-indigo' : ''}`}
                  style={exp.highlight ? { boxShadow: '0 0 40px rgba(99,102,241,0.15)' } : {}}>
                  
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-['Syne'] font-700 text-lg text-white">{exp.role}</h3>
                        {exp.highlight && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-['DM_Mono']">
                            <Zap size={10} /> Current
                          </span>
                        )}
                      </div>
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-['DM_Sans'] text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                      >
                        {exp.company}
                        <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </div>
                    <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)] shrink-0 mt-1">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-[var(--text-secondary)] font-['DM_Sans'] leading-relaxed text-sm mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-['DM_Mono'] border"
                        style={{
                          background: `${LANG_COLORS[tech] || '#6366f1'}15`,
                          borderColor: `${LANG_COLORS[tech] || '#6366f1'}30`,
                          color: LANG_COLORS[tech] || '#6366f1',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
