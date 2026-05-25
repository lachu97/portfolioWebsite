import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { TECH_STACK } from '../../constants';
import {
  SiReact, SiTypescript, SiJavascript, SiKotlin, SiSwift, SiAndroid, SiApple,
  SiRedux, SiReactquery, SiTailwindcss,
  SiNodedotjs, SiFastapi, SiPython, SiPostgresql, SiGraphql,
  SiDocker, SiFirebase, SiSentry, SiGithubactions, SiFastlane, SiJest,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const ICON_MAP: Record<string, IconType> = {
  SiReact, SiTypescript, SiJavascript, SiKotlin, SiSwift, SiAndroid, SiApple,
  SiRedux, SiReactquery, SiTailwindcss,
  SiNodedotjs, SiFastapi, SiPython, SiPostgresql, SiGraphql,
  SiDocker, SiFirebase, SiSentry, SiGithubactions, SiFastlane, SiJest,
};

export default function TechStack() {
  const { ref, inView } = useInView(0.1);

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as any }
  });

  return (
    <section id="stack" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(99,102,241,0.02)] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...anim(0)} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-sm text-indigo-400 uppercase tracking-widest">02 — Stack</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-800 text-4xl md:text-5xl text-white">
            Tools of the<span className="text-gradient"> trade</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] font-['DM_Sans'] text-lg max-w-xl">
            Technologies I use to build fast, performant mobile and full-stack products.
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(TECH_STACK).map(([category, items], catIdx) => (
            <motion.div key={category} {...anim(catIdx * 0.1 + 0.1)}>
              <h3 className="font-['DM_Mono'] text-sm text-[var(--text-muted)] uppercase tracking-widest mb-6">{category}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {items.map((tech, i) => {
                  const Icon = ICON_MAP[tech.icon];
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: catIdx * 0.05 + i * 0.04 + 0.2, ease: [0.16, 1, 0.3, 1] as any }}
                      whileHover={{ scale: 1.06, y: -6 }}
                      className="gradient-border-card p-5 flex flex-col items-center gap-3 cursor-default group"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${tech.color}18`,
                          boxShadow: `0 0 0 1px ${tech.color}25`,
                        }}
                      >
                        {Icon
                          ? <Icon size={36} style={{ color: tech.color }} />
                          : <span style={{ color: tech.color, fontSize: '1.6rem', fontFamily: 'DM Mono, monospace', fontWeight: 700 }}>{tech.icon}</span>
                        }
                      </div>
                      <span className="font-['DM_Sans'] text-sm font-500 text-[var(--text-secondary)] group-hover:text-white transition-colors text-center leading-tight">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
