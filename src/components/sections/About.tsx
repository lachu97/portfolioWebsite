import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { CONFIG, SKILLS } from '../../constants';

function SkillRing({ name, level, delay, inView }: { name: string; level: number; delay: number; inView: boolean }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - level / 100);
  const gradId = `g-${name.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="relative w-[60px] h-[60px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5" />
          <motion.circle
            cx="28" cy="28" r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
            transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as any }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-['DM_Mono'] text-[11px] font-600 text-white">{level}%</span>
        </div>
      </div>
      <span className="font-['DM_Sans'] text-xs text-[var(--text-secondary)] text-center leading-tight group-hover:text-white transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.1);

  const highlights = [
    { icon: MapPin,        text: CONFIG.location,          label: 'Based in' },
    { icon: Briefcase,     text: '4+ years',               label: 'Experience' },
    { icon: GraduationCap, text: 'B.Tech+M.Tech @ IIITDM', label: 'Education' },
    { icon: Heart,         text: 'Mobile Performance',     label: 'Passionate about' },
  ];

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as any }
  });

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...anim(0)} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">01 — About</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-800 text-4xl md:text-5xl text-white">
            Built for<span className="text-gradient"> mobile performance</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio + highlights */}
          <div className="space-y-6">
            {[
              "I'm a React Native engineer with 4 years of production mobile experience — shipping apps to Android and iOS, including one that hit 100K+ installs. I specialize in performance optimization, native module development in Kotlin and Swift, and CI/CD with Fastlane and GitHub Actions.",
              "My engineering focus is on what users feel: crash-free sessions, fast startup times, smooth animations. I've brought crash-free rates to 99.8%, cut JS-thread latency by 35%, and reduced release cycle times by half through proper CI/CD.",
              "Outside work, I build open-source tools — react-native-securekv (encrypted key-value storage on npm) and VectorDB (self-hosted vector search with pgvector + HNSW). Comfortable across the full stack: React, Node.js, FastAPI, PostgreSQL.",
            ].map((text, i) => (
              <motion.p key={i} {...anim(i * 0.1 + 0.1)}
                className="text-[var(--text-secondary)] font-['DM_Sans'] leading-relaxed text-lg">
                {text}
              </motion.p>
            ))}

            <motion.div {...anim(0.4)} className="grid grid-cols-2 gap-3 pt-4">
              {highlights.map(({ icon: Icon, text, label }) => (
                <div key={label} className="gradient-border-card p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                    <Icon size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs font-['DM_Mono'] text-[var(--text-muted)] mb-0.5">{label}</div>
                    <div className="text-sm font-['DM_Sans'] font-500 text-white">{text}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — circular skill rings */}
          <div className="space-y-8">
            {Object.entries(SKILLS).map(([category, skills], catIdx) => (
              <motion.div key={category} {...anim(catIdx * 0.1 + 0.2)}>
                <h3 className="font-['DM_Mono'] text-sm text-[var(--text-muted)] uppercase tracking-widest mb-5">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-5">
                  {skills.map((skill, i) => (
                    <SkillRing
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      inView={inView}
                      delay={catIdx * 0.1 + i * 0.07 + 0.3}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
