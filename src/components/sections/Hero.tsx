import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Code2, Link2, Mail, ChevronRight } from 'lucide-react';
import {
  SiReact, SiTypescript, SiKotlin, SiSwift,
  SiAndroid, SiDocker, SiNodedotjs, SiPython,
  SiRedux, SiGraphql,
} from 'react-icons/si';
import { CONFIG } from '../../constants';
import { useMousePosition } from '../../hooks';

const ORBS = [
  { width: 600, height: 600, color: 'rgba(99,102,241,0.14)',  top: '-10%', left: '-15%',  dur: 14, x: [0, 60, -30, 0], y: [0, -40, 30, 0] },
  { width: 500, height: 500, color: 'rgba(139,92,246,0.10)',  top: '10%',  right: '-10%', dur: 18, x: [0, -50, 20, 0], y: [0, 30, -50, 0] },
  { width: 400, height: 400, color: 'rgba(6,182,212,0.06)',   bottom: '5%',left: '30%',   dur: 22, x: [0, 40, -60, 0], y: [0, -30, 20, 0] },
];

const METRICS = [
  { value: '100K+', label: 'Installs' },
  { value: '99.8%', label: 'Crash-Free' },
  { value: '~35%',  label: 'Faster JS' },
  { value: '4 yrs', label: 'Mobile' },
];

const SOCIALS = [
  { href: `https://github.com/${CONFIG.GITHUB_USERNAME}`, icon: Code2, label: 'GitHub' },
  { href: CONFIG.LINKEDIN_URL, icon: Link2, label: 'LinkedIn' },
  { href: `mailto:${CONFIG.EMAIL}`, icon: Mail, label: 'Email' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const FLOATING_SKILLS_DESKTOP = [
  // Left column
  { icon: SiReact,      label: 'React Native', color: '#61dafb', left: '3%',  top: '18%', dur: 7.5,  delay: 0 },
  { icon: SiTypescript, label: 'TypeScript',   color: '#3178c6', left: '2%',  top: '40%', dur: 9,    delay: 1.1 },
  { icon: SiKotlin,     label: 'Kotlin',       color: '#7f52ff', left: '5%',  top: '60%', dur: 11,   delay: 0.6 },
  { icon: SiNodedotjs,  label: 'Node.js',      color: '#68a063', left: '1%',  top: '78%', dur: 8.5,  delay: 1.8 },
  { icon: SiRedux,      label: 'Redux',        color: '#764abc', left: '11%', top: '29%', dur: 13,   delay: 2.2 },
  // Right column
  { icon: SiSwift,      label: 'Swift',        color: '#f05138', right: '2%', top: '16%', dur: 8,    delay: 1.4 },
  { icon: SiAndroid,    label: 'Android',      color: '#3ddc84', right: '3%', top: '38%', dur: 10,   delay: 0.4 },
  { icon: SiPython,     label: 'Python',       color: '#4b8bbe', right: '6%', top: '58%', dur: 9.5,  delay: 1.9 },
  { icon: SiDocker,     label: 'Docker',       color: '#2496ed', right: '1%', top: '74%', dur: 12,   delay: 0.9 },
  { icon: SiGraphql,    label: 'GraphQL',      color: '#e535ab', right: '10%',top: '27%', dur: 14,   delay: 2.5 },
];

// Mobile: 6 badges at top/bottom edges so they don't block centered content
const FLOATING_SKILLS_MOBILE = [
  { icon: SiReact,      label: 'React Native', color: '#61dafb', left: '4%',  top: '7%',    dur: 7,  delay: 0 },
  { icon: SiTypescript, label: 'TypeScript',   color: '#3178c6', left: '50%', top: '5%',    dur: 9,  delay: 0.8 },
  { icon: SiSwift,      label: 'Swift',        color: '#f05138', right: '4%', top: '7%',    dur: 8,  delay: 0.4 },
  { icon: SiAndroid,    label: 'Android',      color: '#3ddc84', left: '4%',  bottom: '10%',dur: 10, delay: 1.2 },
  { icon: SiKotlin,     label: 'Kotlin',       color: '#7f52ff', left: '50%', bottom: '8%', dur: 11, delay: 0.6 },
  { icon: SiDocker,     label: 'Docker',       color: '#2496ed', right: '4%', bottom: '10%',dur: 9,  delay: 1.6 },
];

function SkillBadge({ Icon, label, color, dur, delay, pos }: {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string; color: string; dur: number; delay: number;
  pos: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[1]"
      style={{ ...pos }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -14, 0], rotate: [-1, 1, -1] }}
      transition={{
        opacity: { duration: 0.7, delay: delay + 0.8 },
        scale:   { duration: 0.7, delay: delay + 0.8 },
        y:       { duration: dur,       repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay },
        rotate:  { duration: dur * 1.3, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: delay + 0.5 },
      }}
    >
      <div
        className="flex items-center gap-2.5 px-4 py-2 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(12,18,36,0.85), rgba(8,12,24,0.9))',
          border: `1px solid ${color}50`,
          boxShadow: `0 0 16px ${color}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Icon size={16} color={color} />
        <span className="font-['DM_Mono'] text-sm text-white/80 whitespace-nowrap">{label}</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Cursor glow — hidden on touch via CSS */}
      <div className="cursor-glow" style={{ left: x, top: y, opacity: 0.55 }} />

      {/* 3 ambient orbs — reduced opacity, 60px blur (perf) */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.width,
            height: orb.height,
            background: orb.color,
            filter: 'blur(60px)',
            top: (orb as any).top,
            left: (orb as any).left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
          }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />
      ))}

      {/* Floating skill badges — desktop (xl+): left/right columns */}
      <div className="hidden xl:block">
        {FLOATING_SKILLS_DESKTOP.map(({ icon: Icon, label, color, dur, delay, ...pos }) => (
          <SkillBadge key={label} Icon={Icon} label={label} color={color} dur={dur} delay={delay} pos={pos} />
        ))}
      </div>

      {/* Floating skill badges — mobile/tablet (< xl): top/bottom edges */}
      <div className="block xl:hidden">
        {FLOATING_SKILLS_MOBILE.map(({ icon: Icon, label, color, dur, delay, ...pos }) => (
          <SkillBadge key={label} Icon={Icon} label={label} color={color} dur={dur} delay={delay} pos={pos} />
        ))}
      </div>

      <motion.div
        style={{ opacity, y: translateY }}
        className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 text-center"
      >
        {/* Status badge — Group 1 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0, ease: EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[rgba(99,102,241,0.22)] mb-9 sm:mb-10"
        >
          <span className="slow-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-['DM_Mono'] text-[var(--text-secondary)] tracking-wide">
            {CONFIG.availableForWork ? 'Available for new opportunities' : 'Currently at IntuitionX'}
          </span>
        </motion.div>

        {/* Name heading — Group 1, responsive size */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.05, ease: EASE }}
          className="mb-5"
        >
          <h1 className="font-['Syne'] font-extrabold text-[2.8rem] sm:text-6xl md:text-[5.5rem] leading-[0.93] tracking-[-0.03em] text-white">
            {CONFIG.name.split(' ').map((word, i) => (
              <span key={word} className={i === 1 ? 'text-gradient block' : 'block'}>
                {word}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Static role — Group 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.16, ease: EASE }}
          className="mb-4"
        >
          <p className="font-['DM_Mono'] text-xs sm:text-sm text-[var(--text-secondary)] tracking-wide">
            React Native Engineer&nbsp;&nbsp;·&nbsp;&nbsp;iOS &amp; Android&nbsp;&nbsp;·&nbsp;&nbsp;SDE II
          </p>
        </motion.div>

        {/* Tagline — Group 2 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.2, ease: EASE }}
          className="max-w-sm sm:max-w-xl mx-auto text-sm sm:text-base text-[var(--text-secondary)] font-['DM_Sans'] font-light mb-10 sm:mb-14 leading-relaxed"
        >
          Building high-performance mobile systems for Android &amp; iOS.
          <br className="hidden sm:block" />
          4 years of production at scale.
        </motion.p>

        {/* Metrics — Group 3
            Mobile: 2×2 grid | Desktop (sm+): horizontal strip with dividers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.28, ease: EASE }}
          className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-y-6 mb-10 sm:mb-12 max-w-[280px] sm:max-w-none mx-auto"
        >
          {METRICS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center justify-center">
              {i > 0 && (
                <div className="hidden sm:block w-px h-9 bg-white/[0.07] mx-7 md:mx-9 shrink-0" />
              )}
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-['Syne'] font-extrabold text-white text-xl sm:text-2xl leading-none tracking-tight">
                  {value}
                </span>
                <span className="font-['DM_Mono'] text-[10px] text-[var(--text-muted)] uppercase tracking-[0.14em]">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs — Group 3, stack on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.32, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-14"
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-['DM_Sans'] font-medium text-sm"
          >
            View my work
            <ChevronRight size={14} strokeWidth={2.2} />
          </motion.button>

          <motion.a
            href={`mailto:${CONFIG.EMAIL}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass border border-[rgba(99,102,241,0.22)] text-[var(--text-secondary)] font-['DM_Sans'] font-medium text-sm hover:text-white hover:border-indigo-500/45 transition-colors duration-200"
          >
            <Mail size={14} />
            Get in touch
          </motion.a>
        </motion.div>

        {/* Social links — de-emphasised, Group 3 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center justify-center gap-5"
        >
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--text-muted)] opacity-40 hover:opacity-100 hover:text-[var(--text-primary)] transition-all duration-200 p-1"
            >
              <Icon size={15} />
            </a>
          ))}
          <span className="w-px h-3.5 bg-white/15" aria-hidden="true" />
          <span className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] opacity-40 hidden xs:inline">
            {CONFIG.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.55 }}
        whileHover={{ opacity: 0.9 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] transition-opacity"
        aria-label="Scroll to about"
      >
        <span className="font-['DM_Mono'] text-[9px] tracking-[0.22em] uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={12} />
        </motion.div>
      </motion.button>
    </section>
  );
}
