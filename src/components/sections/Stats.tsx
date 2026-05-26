import { motion } from 'framer-motion';
import { useInView, useCounter, useGitHubRepos } from '../../hooks';
import { CONFIG, STATS, LEETCODE_FALLBACK } from '../../constants';
import { GitHubCalendar } from 'react-github-calendar';
import { Code2, TrendingUp, Target } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(value, 1800, inView);
  const atMax = count >= value;

  // Decimal suffix like ".8%" — show whole number during animation, full at end
  const hasDecimalPrefix = suffix.startsWith('.');
  const display = atMax
    ? `${value}${suffix}`
    : `${count}${hasDecimalPrefix ? suffix.replace(/^\.\d+/, '') : suffix}`;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 py-6 px-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="font-['Syne'] font-extrabold text-2xl md:text-3xl lg:text-4xl text-white leading-none tracking-tight">
        {display}
      </div>
      <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
}

function LeetCodeBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const { ref, inView } = useInView(0.3);
  const pct = (solved / total) * 100;

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-['DM_Mono'] text-xs" style={{ color }}>{label}</span>
        <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">{solved}</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </div>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView(0.05);
  const { user } = useGitHubRepos();
  const lc = LEETCODE_FALLBACK;

  return (
    <section id="stats" ref={ref} className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(99,102,241,0.015)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">06 — GitHub + LeetCode</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
            By the<span className="text-gradient"> numbers</span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.38, delay: i * 0.08, ease: EASE }}
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.16, ease: EASE }}
            className="gradient-border-card p-4 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="p-1.5 rounded-lg bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
                <Code2 size={15} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-['DM_Sans'] font-semibold text-white text-sm">GitHub Activity</h3>
                <p className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">@{CONFIG.GITHUB_USERNAME}</p>
              </div>
            </div>

            {/* GitHub mini stats */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {[
                { label: 'Repos',     value: user?.public_repos ?? '30+', icon: Code2 },
                { label: 'Followers', value: user?.followers ?? '—',      icon: TrendingUp },
                { label: 'Following', value: user?.following ?? '—',      icon: Target },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05] text-center">
                  <Icon size={12} className="text-indigo-400/60 mx-auto mb-1.5" />
                  <div className="font-['Syne'] font-bold text-white text-base leading-none">{value}</div>
                  <div className="font-['DM_Mono'] text-[10px] text-[var(--text-muted)] mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Contribution calendar — scrollable on mobile */}
            <div className="rounded-xl">
              <p className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-3 uppercase tracking-wide">Contribution Graph</p>
              <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div style={{ minWidth: 460 }}>
                  <GitHubCalendar
                    username={CONFIG.GITHUB_USERNAME}
                    colorScheme="dark"
                    theme={{ dark: ['#0a0f1e', '#1e1b4b', '#3730a3', '#4f46e5', '#818cf8'] }}
                    style={{ fontFamily: 'DM Mono, monospace', width: '100%' }}
                    errorMessage="GitHub contribution data unavailable"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* LeetCode — reduced visual weight */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.22, ease: EASE }}
            className="gradient-border-card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
                  {/* Trophy icon inline — avoiding import just for de-emphasized section */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-['DM_Sans'] font-semibold text-white text-sm">LeetCode</h3>
                  <p className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">@{lc.username}</p>
                </div>
              </div>
              <a
                href={`https://leetcode.com/${lc.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-['DM_Mono'] text-[var(--text-muted)] hover:text-yellow-400 transition-colors"
              >
                View →
              </a>
            </div>

            {/* Compact solved summary — not a giant feature box */}
            <div className="flex items-baseline gap-3 mb-6 px-4 py-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
              <span className="font-['Syne'] font-extrabold text-white text-2xl leading-none">
                {lc.totalSolved.toLocaleString()}
              </span>
              <span className="font-['DM_Sans'] text-[var(--text-secondary)] text-sm">solved</span>
              <span className="ml-auto font-['DM_Mono'] text-xs text-[var(--text-muted)]">
                {lc.acceptanceRate}% acceptance
              </span>
            </div>

            {/* Difficulty bars — reduced weight */}
            <div className="space-y-3.5 mb-6">
              <LeetCodeBar label="Easy"   solved={lc.easySolved}   total={900}  color="#22c55e" />
              <LeetCodeBar label="Medium" solved={lc.mediumSolved} total={1800} color="#f59e0b" />
              <LeetCodeBar label="Hard"   solved={lc.hardSolved}   total={750}  color="#ef4444" />
            </div>

            {/* Rankings — reduced text size */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.05] text-center">
                <div className="font-['Syne'] font-bold text-white text-base leading-none">
                  #{lc.ranking.toLocaleString()}
                </div>
                <div className="font-['DM_Mono'] text-[10px] text-[var(--text-muted)] mt-1.5 uppercase tracking-wide">Global Rank</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.05] text-center">
                <div className="font-['Syne'] font-bold text-white text-base leading-none">{lc.contestRating}</div>
                <div className="font-['DM_Mono'] text-[10px] text-[var(--text-muted)] mt-1.5 uppercase tracking-wide">Contest Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
