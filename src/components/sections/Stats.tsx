import { motion } from 'framer-motion';
import { useInView, useCounter, useGitHubRepos } from '../../hooks';
import { CONFIG, STATS, LEETCODE_FALLBACK } from '../../constants';
import { GitHubCalendar } from 'react-github-calendar';
import { Code2, Trophy, Zap, Target, TrendingUp } from 'lucide-react';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string; }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(value, 2000, inView);

  return (
    <div ref={ref} className="gradient-border-card p-6 text-center">
      <div className="font-['Syne'] font-800 text-3xl md:text-4xl text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-['DM_Sans'] text-sm text-[var(--text-muted)]">{label}</div>
    </div>
  );
}

function LeetCodeBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const { ref, inView } = useInView(0.3);
  const pct = (solved / total) * 100;

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-['DM_Sans'] text-sm font-500" style={{ color }}>{label}</span>
        <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">
          {solved} / {total}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
    <section id="stats" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(99,102,241,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">06 — GitHub + LeetCode</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <h2 className="font-['Syne'] font-800 text-4xl md:text-5xl text-white">
            By the
            <span className="text-gradient"> numbers</span>
          </h2>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* GitHub section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gradient-border-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
                <Code2 size={18} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-['Syne'] font-700 text-white">GitHub Activity</h3>
                <p className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">@{CONFIG.GITHUB_USERNAME}</p>
              </div>
            </div>

            {/* GitHub stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Repos', value: user?.public_repos || '30+', icon: Code2 },
                { label: 'Followers', value: user?.followers || '500+', icon: TrendingUp },
                { label: 'Following', value: user?.following || '120', icon: Target },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <Icon size={14} className="text-indigo-400 mx-auto mb-1.5" />
                  <div className="font-['Syne'] font-700 text-white text-lg">{value}</div>
                  <div className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">{label}</div>
                </div>
              ))}
            </div>

            {/* Contribution calendar */}
            <div className="overflow-hidden rounded-xl">
              <p className="font-['DM_Mono'] text-xs text-[var(--text-muted)] mb-3">Contribution Graph</p>
              <div className="text-xs scale-90 origin-left">
                <GitHubCalendar
                  username={CONFIG.GITHUB_USERNAME}
                  colorScheme="dark"
                  theme={{
                    dark: ['#0a0f1e', '#1e1b4b', '#3730a3', '#4f46e5', '#818cf8'],
                  }}
                  style={{ fontFamily: 'DM Mono, monospace' }}
                  errorMessage="GitHub contribution data unavailable"
                />
              </div>
            </div>
          </motion.div>

          {/* LeetCode section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="gradient-border-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
                <Trophy size={18} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-['Syne'] font-700 text-white">LeetCode Stats</h3>
                <p className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">@{lc.username}</p>
              </div>
              <a
                href={`https://leetcode.com/${lc.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-['DM_Mono'] text-[var(--text-muted)] hover:text-yellow-400 transition-colors"
              >
                View Profile →
              </a>
            </div>

            {/* Big stat */}
            <div className="text-center py-6 mb-6 rounded-xl bg-gradient-to-br from-[rgba(245,158,11,0.08)] to-[rgba(249,115,22,0.05)] border border-[rgba(245,158,11,0.15)]">
              <div className="font-['Syne'] font-800 text-5xl text-white mb-1">
                {lc.totalSolved.toLocaleString()}
              </div>
              <div className="font-['DM_Sans'] text-[var(--text-secondary)]">Problems Solved</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Zap size={12} className="text-yellow-400" />
                <span className="font-['DM_Mono'] text-xs text-yellow-400">{lc.acceptanceRate}% Acceptance</span>
              </div>
            </div>

            {/* Difficulty breakdown */}
            <div className="space-y-4 mb-6">
              <LeetCodeBar label="Easy" solved={lc.easySolved} total={900} color="#22c55e" />
              <LeetCodeBar label="Medium" solved={lc.mediumSolved} total={1800} color="#f59e0b" />
              <LeetCodeBar label="Hard" solved={lc.hardSolved} total={750} color="#ef4444" />
            </div>

            {/* Rankings */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="font-['Syne'] font-700 text-white text-xl">
                  #{lc.ranking.toLocaleString()}
                </div>
                <div className="font-['DM_Mono'] text-xs text-[var(--text-muted)] mt-1">Global Ranking</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="font-['Syne'] font-700 text-white text-xl">
                  {lc.contestRating}
                </div>
                <div className="font-['DM_Mono'] text-xs text-[var(--text-muted)] mt-1">Contest Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
