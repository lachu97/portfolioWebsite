import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { CONFIG, SKILLS } from '../../constants';

export default function About() {
  const { ref, inView } = useInView(0.1);

  const highlights = [
    { icon: MapPin, text: CONFIG.location, label: 'Based in' },
    { icon: Briefcase, text: '4+ years', label: 'Experience' },
    { icon: GraduationCap, text: 'B.Tech+M.Tech @ IIITDM', label: 'Education' },
    { icon: Heart, text: 'Mobile Performance', label: 'Passionate about' },
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
            Crafting code that<span className="text-gradient"> matters</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {[
              "I'm a React Native engineer with 4 years of production mobile experience — shipping apps to Android and iOS, including one that hit 100K+ installs. I specialize in performance optimization, native module development in Kotlin and Swift, and CI/CD with Fastlane and GitHub Actions.",
              "My engineering focus is on what users feel: crash-free sessions, fast startup times, smooth animations. I've brought crash-free rates to 99.8%, cut JS-thread latency by 35%, and reduced release cycle times by half through proper CI/CD.",
              "Outside of work, I build open-source tools — including react-native-securekv (encrypted key-value storage on npm) and VectorDB (a self-hosted vector search engine with pgvector and HNSW indexing). I'm also comfortable across the full stack: React, Node.js, FastAPI, and PostgreSQL.",
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

          <div className="space-y-8">
            {Object.entries(SKILLS).map(([category, skills], catIdx) => (
              <motion.div key={category} {...anim(catIdx * 0.1 + 0.2)}>
                <h3 className="font-['DM_Mono'] text-sm text-[var(--text-muted)] uppercase tracking-widest mb-4">{category}</h3>
                <div className="space-y-3">
                  {skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-base font-['DM_Sans'] font-500 text-[var(--text-secondary)]">{skill.name}</span>
                        <span className="font-['DM_Mono'] text-sm text-[var(--text-muted)]">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: catIdx * 0.1 + i * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] as any }}
                        />
                      </div>
                    </div>
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
