import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Code2, Link2, Mail, Sparkles, ChevronRight, Smartphone, Zap, Shield, Clock } from 'lucide-react';
import { CONFIG } from '../../constants';
import { useMousePosition } from '../../hooks';

const METRICS = [
  { icon: Smartphone, value: '100K+', label: 'App Installs' },
  { icon: Shield,     value: '99.8%', label: 'Crash-free' },
  { icon: Zap,        value: '~35%',  label: 'Faster JS Thread' },
  { icon: Clock,      value: '4 Yrs', label: 'Mobile Experience' },
];

const ORBS = [
  { width: 600, height: 600, color: 'rgba(99,102,241,0.18)',  top: '-10%', left: '-15%',   dur: 14, x: [0, 60, -30, 0],  y: [0, -40, 30, 0]  },
  { width: 500, height: 500, color: 'rgba(139,92,246,0.14)',  top: '10%',  right: '-10%',  dur: 18, x: [0, -50, 20, 0],  y: [0, 30, -50, 0]  },
  { width: 400, height: 400, color: 'rgba(6,182,212,0.10)',   bottom: '5%',left: '30%',    dur: 22, x: [0, 40, -60, 0],  y: [0, -30, 20, 0]  },
  { width: 350, height: 350, color: 'rgba(245,158,11,0.07)',  top: '40%',  left: '10%',    dur: 16, x: [0, -30, 50, 0],  y: [0, 40, -30, 0]  },
  { width: 300, height: 300, color: 'rgba(236,72,153,0.07)',  bottom:'20%',right:'15%',    dur: 20, x: [0, 30, -20, 0],  y: [0, -20, 40, 0]  },
];

export default function Hero() {
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 400], [0, 80]);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: x, top: y, opacity: 0.7 }} />

      {/* Animated gradient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.width,
            height: orb.height,
            background: orb.color,
            filter: 'blur(80px)',
            top: orb.top,
            left: orb.left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
          }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: Math.random() * 4 + 3, delay: Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        style={{ opacity, y: translateY }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(99,102,241,0.3)] mb-8"
        >
          <Sparkles size={12} className="text-indigo-400 animate-pulse" />
          <span className="text-xs font-['DM_Mono'] text-[var(--text-secondary)]">
            {CONFIG.availableForWork ? (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                Available for new opportunities
              </>
            ) : 'Currently working at IntuitionX'}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h1 className="font-['Syne'] font-800 text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight text-white">
            {CONFIG.name.split(' ').map((word, i) => (
              <span key={word} className={i === 1 ? 'text-gradient block' : 'block'}>
                {word}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 font-['DM_Mono'] text-lg md:text-xl text-[var(--text-secondary)]">
            <span className="text-indigo-400">{'>'}</span>
            <TypeAnimation
              sequence={[
                'React Native Engineer',
                2000,
                'iOS & Android Developer',
                2000,
                'Mobile Performance Expert',
                2000,
                'Kotlin & Swift Native Modules',
                2000,
                'Open Source Contributor',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
            <span className="animate-blink text-indigo-400">_</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--text-secondary)] font-['DM_Sans'] font-300 mb-10 leading-relaxed"
        >
          {CONFIG.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-['DM_Sans'] font-500 text-sm transition-all duration-200"
          >
            View my work
            <ChevronRight size={16} />
          </motion.button>

          <motion.a
            href={`mailto:${CONFIG.EMAIL}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-[rgba(99,102,241,0.3)] text-white font-['DM_Sans'] font-500 text-sm hover:border-indigo-500/60 transition-all duration-200"
          >
            <Mail size={16} />
            Get in touch
          </motion.a>
        </motion.div>

        {/* Mobile metrics banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {METRICS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-[rgba(99,102,241,0.2)] group hover:border-indigo-500/40 transition-all duration-200"
            >
              <Icon size={14} className="text-indigo-400 shrink-0" />
              <span className="font-['Syne'] font-700 text-white text-sm">{value}</span>
              <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { href: `https://github.com/${CONFIG.GITHUB_USERNAME}`, icon: Code2, label: 'GitHub' },
            { href: CONFIG.LINKEDIN_URL, icon: Link2, label: 'LinkedIn' },
            { href: `mailto:${CONFIG.EMAIL}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#6366f1' }}
              className="text-[var(--text-muted)] hover:text-indigo-400 transition-colors duration-200"
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.3)] to-transparent" />

          <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">
            {CONFIG.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        <span className="font-['DM_Mono'] text-xs">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
