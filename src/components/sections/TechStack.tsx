import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks';
import { TECH_STACK } from '../../constants';
import TiltCard from '../ui/TiltCard';
import {
  SiReact, SiTypescript, SiJavascript, SiKotlin, SiSwift, SiAndroid, SiApple,
  SiRedux, SiReactquery, SiTailwindcss,
  SiNodedotjs, SiFastapi, SiPython, SiPostgresql, SiGraphql,
  SiDocker, SiFirebase, SiSentry, SiGithubactions, SiFastlane, SiJest,
  SiClaude, SiOpenai,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const ICON_MAP: Record<string, IconType> = {
  SiReact, SiTypescript, SiJavascript, SiKotlin, SiSwift, SiAndroid, SiApple,
  SiRedux, SiReactquery, SiTailwindcss,
  SiNodedotjs, SiFastapi, SiPython, SiPostgresql, SiGraphql,
  SiDocker, SiFirebase, SiSentry, SiGithubactions, SiFastlane, SiJest,
  SiClaude, SiOpenai,
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TechStack() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.4, delay, ease: EASE }
  });

  return (
    <section id="stack" ref={ref} className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(99,102,241,0.015)] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...anim(0)} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">02 — Stack</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-extrabold text-4xl md:text-5xl text-white">
            Tools of the<span className="text-gradient"> trade</span>
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] font-['DM_Sans'] text-base max-w-xl">
            Technologies I use to build fast, performant mobile and full-stack products.
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {Object.entries(TECH_STACK).map(([category, items], catIdx) => (
            <motion.div key={category} {...anim(catIdx * 0.1 + 0.1)}>
              <h3 className="font-['DM_Mono'] text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 sm:mb-6">
                {category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-4">
                {items.map((tech, i) => {
                  const Icon = ICON_MAP[tech.icon];
                  const tooltipKey = `${category}-${tech.name}`;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      transition={{ duration: 0.35, delay: catIdx * 0.05 + i * 0.04 + 0.15, ease: EASE }}
                      className="relative"
                      style={{ overflow: 'visible' }}
                      onMouseEnter={() => setHovered(tooltipKey)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <TiltCard
                        className="gradient-border-card p-3 sm:p-5 flex flex-col items-center gap-2.5 cursor-default group"
                        glowColor={tech.color}
                        maxTilt={8}
                      >
                        <div
                          className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `${tech.color}16`,
                            boxShadow: `0 0 0 1px ${tech.color}22`,
                          }}
                        >
                          {Icon
                            ? <Icon size={26} style={{ color: tech.color }} />
                            : <span style={{ color: tech.color, fontSize: '0.9rem', fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>{tech.name.slice(0, 2).toUpperCase()}</span>
                          }
                        </div>
                        <span className="font-['DM_Sans'] text-xs font-medium text-[var(--text-secondary)] group-hover:text-white transition-colors text-center leading-tight">
                          {tech.name}
                        </span>
                      </TiltCard>

                      {/* Tooltip — only visible on hover-capable devices (not touch) */}
                      <AnimatePresence>
                        {hovered === tooltipKey && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.96 }}
                            transition={{ duration: 0.16, ease: EASE }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] w-48 sm:w-52 pointer-events-none hidden sm:block"
                          >
                            <div
                              className="rounded-xl px-3 py-2.5"
                              style={{
                                background: 'rgba(8,12,22,0.97)',
                                border: `1px solid ${tech.color}38`,
                                boxShadow: `0 8px 28px rgba(0,0,0,0.55), 0 0 0 1px ${tech.color}12`,
                                backdropFilter: 'blur(16px)',
                              }}
                            >
                              <div
                                className="h-[2px] rounded-full mb-2"
                                style={{ background: `linear-gradient(to right, ${tech.color}, transparent)` }}
                              />
                              <p className="font-['DM_Sans'] text-xs text-[var(--text-secondary)] leading-relaxed">
                                {tech.description}
                              </p>
                            </div>
                            <div
                              className="w-2.5 h-2.5 rotate-45 mx-auto -mt-[5px]"
                              style={{ background: 'rgba(8,12,22,0.97)', border: `1px solid ${tech.color}38`, borderTop: 'none', borderLeft: 'none' }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
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
