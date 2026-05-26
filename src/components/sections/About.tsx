import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { CONFIG } from '../../constants';

const EXPERTISE = [
  { label: 'React Native', detail: 'iOS & Android · production at 100K+ scale' },
  { label: 'Performance', detail: 'Hermes, FlatList virtualization, memoization' },
  { label: 'Native Modules', detail: 'Kotlin bridging, Swift Keychain & Keystore' },
  { label: 'CI/CD', detail: 'Fastlane, GitHub Actions, CodePush OTA' },
  { label: 'Full-Stack', detail: 'Node.js, FastAPI, PostgreSQL, Docker' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const { ref, inView } = useInView(0.1);

  const highlights = [
    { icon: MapPin,        text: CONFIG.location,          label: 'Based in' },
    { icon: Briefcase,     text: '4+ years',               label: 'Experience' },
    { icon: GraduationCap, text: 'IIITDM Kancheepuram', label: 'Education' },
    { icon: Heart,         text: 'Mobile Performance',     label: 'Passionate about' },
  ];

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.4, delay, ease: EASE }
  });

  return (
    <section id="about" ref={ref} className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...anim(0)} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">01 — About</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
            Built for<span className="text-gradient"> mobile performance</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">
          {/* Left — bio + highlights */}
          <div className="space-y-6">
            {[
              "I'm a React Native engineer with 4 years of production mobile experience — shipping apps to Android and iOS, including one that hit 100K+ installs. I specialize in performance optimization, native module development in Kotlin and Swift, and CI/CD with Fastlane and GitHub Actions.",
              "My engineering focus is on what users feel: crash-free sessions, fast startup times, smooth animations. I've brought crash-free rates to 99.8%, cut JS-thread latency by 35%, and reduced release cycle times by half through proper CI/CD.",
              "Outside work, I build open-source tools — react-native-securekv (encrypted key-value storage on npm) and VectorDB (self-hosted vector search with pgvector + HNSW). Comfortable across the full stack: React, Node.js, FastAPI, PostgreSQL.",
            ].map((text, i) => (
              <motion.p key={i} {...anim(i * 0.08 + 0.08)}
                className="text-[var(--text-secondary)] font-['DM_Sans'] leading-relaxed text-base">
                {text}
              </motion.p>
            ))}

            <motion.div {...anim(0.34)} className="grid grid-cols-2 gap-3 pt-2">
              {highlights.map(({ icon: Icon, text, label }) => (
                <div key={label} className="gradient-border-card p-4 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                    <Icon size={13} className="text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-['DM_Mono'] text-[var(--text-muted)] mb-0.5 uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-['DM_Sans'] font-medium text-white break-words">{text}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Core Expertise */}
          <motion.div {...anim(0.22)}>
            <h3 className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6">
              Core Expertise
            </h3>
            <div className="space-y-1">
              {EXPERTISE.map(({ label, detail }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.32, delay: 0.28 + i * 0.07, ease: EASE }}
                  className="group flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0"
                >
                  <span
                    className="w-[5px] h-[5px] rounded-full bg-indigo-500/50 shrink-0 mt-[7px] group-hover:bg-indigo-400 transition-colors duration-200"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-['DM_Sans'] font-medium text-white text-sm group-hover:text-indigo-300 transition-colors duration-200">
                      {label}
                    </span>
                    <span className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] block mt-0.5 leading-snug">
                      {detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
