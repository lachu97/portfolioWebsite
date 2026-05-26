import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, useGitHubRepos } from '../../hooks';
import { Star, GitFork, ExternalLink, Code2, Search, AlertCircle, Package, Database, Lock } from 'lucide-react';
import type { GitHubRepo } from '../../types';

const FEATURED_PROJECTS = [
  {
    name: 'react-native-securekv',
    tagline: 'Encrypted key-value storage for React Native',
    description: 'Backed by Android Keystore and iOS Keychain. Drop-in secure storage for tokens and sensitive data. Published on npm and used in production apps.',
    github: 'https://github.com/lachu97/react-native-securekv',
    npm: 'https://npmjs.com/package/react-native-securekv',
    tags: ['React Native', 'TypeScript', 'Android Keystore', 'iOS Keychain', 'npm'],
    icon: Lock,
    color: '#6366f1',
    badge: 'npm package',
  },
  {
    name: 'VectorDB',
    tagline: 'Self-hosted vector search engine',
    description: 'Multi-tenant vector database with REST APIs, auth, rate limiting, and a RAG pipeline. Sub-0.6ms p95 search via pgvector HNSW indexing. Fully Dockerized.',
    github: 'https://github.com/lachu97/vector-db',
    npm: null,
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Docker', 'React'],
    icon: Database,
    color: '#06b6d4',
    badge: 'self-hosted',
  },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6', JavaScript: '#F7DF1E', Python: '#3572A5',
  Go: '#00ADD8', Rust: '#CE422B', Vue: '#41B883', Swift: '#F05138',
  Kotlin: '#7F52FF', Java: '#B07219', 'C++': '#F34B7D', Shell: '#89E051',
};

function SkeletonCard() {
  return (
    <div className="gradient-border-card p-5 space-y-3">
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-2/3" />
      <div className="flex gap-2 pt-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

interface RepoCardProps { repo: GitHubRepo; index: number; inView: boolean; }
function RepoCard({ repo, index, inView }: RepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="gradient-border-card p-5 flex flex-col gap-4 group"
      style={{ transition: 'box-shadow 0.3s ease' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 60px rgba(99,102,241,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 size={14} className="text-[var(--text-muted)] shrink-0" />
          <h3 className="font-['Syne'] font-600 text-white text-sm truncate group-hover:text-indigo-300 transition-colors">
            {repo.name}
          </h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {repo.homepage && (
            <motion.a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="p-1 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={13} />
            </motion.a>
          )}
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="p-1 text-[var(--text-muted)] hover:text-white transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <Code2 size={13} />
          </motion.a>
        </div>
      </div>

      {/* Description */}
      <p className="text-[var(--text-secondary)] font-['DM_Sans'] text-xs leading-relaxed flex-1 line-clamp-3">
        {repo.description}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map(topic => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded-full text-xs font-['DM_Mono'] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 pt-1 border-t border-[rgba(99,102,241,0.1)]">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: LANG_COLORS[repo.language] || '#94a3b8' }}
            />
            <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 ml-auto">
          <Star size={12} className="text-yellow-500" />
          <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">
            {repo.stargazers_count >= 1000
              ? `${(repo.stargazers_count / 1000).toFixed(1)}k`
              : repo.stargazers_count}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={12} className="text-[var(--text-muted)]" />
          <span className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">{repo.forks_count}</span>
        </div>
      </div>
    </motion.div>
  );
}

const ALL_LANGS = ['all', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Other'];

export default function Projects() {
  const { ref, inView } = useInView(0.05);
  const { repos, loading, error } = useGitHubRepos();
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');

  const filtered = useMemo(() => {
    return repos.filter(repo => {
      const matchSearch = !search || repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(search.toLowerCase()));
      const matchLang = langFilter === 'all' ||
        (langFilter === 'Other' ? !ALL_LANGS.slice(1, -1).includes(repo.language || '') : repo.language === langFilter);
      return matchSearch && matchLang;
    });
  }, [repos, search, langFilter]);

  const topRepo = repos[0];

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">05 — Projects</span>
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/30" />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-['Syne'] font-800 text-4xl md:text-5xl text-white">
                Open Source
                <span className="text-gradient"> work</span>
              </h2>
              <p className="mt-3 text-[var(--text-secondary)] font-['DM_Sans']">
                Live GitHub data — {loading ? '...' : `${repos.length} repos`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Open source highlights */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {FEATURED_PROJECTS.map((proj, i) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
                className="gradient-border-card p-6 group flex flex-col gap-4"
                style={{ background: `linear-gradient(135deg, ${proj.color}08 0%, rgba(10,15,30,0.9) 100%)` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl" style={{ background: `${proj.color}18`, boxShadow: `0 0 0 1px ${proj.color}25` }}>
                      <Icon size={20} style={{ color: proj.color }} />
                    </div>
                    <div>
                      <span className="font-['DM_Mono'] text-xs px-2 py-0.5 rounded-full mb-1 inline-block"
                        style={{ background: `${proj.color}18`, color: proj.color, border: `1px solid ${proj.color}30` }}>
                        {proj.badge}
                      </span>
                      <h3 className="font-['Syne'] font-700 text-white text-lg group-hover:text-indigo-300 transition-colors">
                        {proj.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {proj.npm && (
                      <a href={proj.npm} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-orange-400 transition-colors"
                        onClick={e => e.stopPropagation()} title="npm">
                        <Package size={15} />
                      </a>
                    )}
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white transition-colors"
                      title="GitHub">
                      <Code2 size={15} />
                    </a>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] font-['DM_Sans'] text-sm leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-['DM_Mono']"
                      style={{ background: `${proj.color}12`, border: `1px solid ${proj.color}25`, color: proj.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured repo */}
        {!loading && topRepo && (
          <motion.a
            href={topRepo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="block mb-10 gradient-border-card p-6 md:p-8 group"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className="font-['DM_Mono'] text-xs text-indigo-400 mb-2 block">⭐ Most Starred</span>
                <h3 className="font-['Syne'] font-700 text-2xl text-white group-hover:text-indigo-300 transition-colors">
                  {topRepo.name}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-400" />
                  <span className="font-['Syne'] font-700 text-white text-lg">{topRepo.stargazers_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GitFork size={14} className="text-[var(--text-muted)]" />
                  <span className="text-[var(--text-muted)] font-['DM_Mono'] text-sm">{topRepo.forks_count}</span>
                </div>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] font-['DM_Sans'] leading-relaxed mb-4 max-w-2xl">
              {topRepo.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {topRepo.language && (
                <span className="flex items-center gap-1.5 font-['DM_Mono'] text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[topRepo.language] || '#94a3b8' }} />
                  {topRepo.language}
                </span>
              )}
              {topRepo.topics.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-full text-xs font-['DM_Mono'] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  {t}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-1 text-indigo-400 text-sm font-['DM_Sans'] group-hover:gap-2 transition-all">
                View on GitHub <ExternalLink size={13} />
              </span>
            </div>
          </motion.a>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search repos..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-[rgba(99,102,241,0.2)] text-sm font-['DM_Sans'] text-white placeholder-[var(--text-muted)] outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {/* Lang filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {ALL_LANGS.map(lang => (
              <button
                key={lang}
                onClick={() => setLangFilter(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-['DM_Mono'] transition-all duration-200 ${
                  langFilter === lang
                    ? 'bg-indigo-600 text-white border border-indigo-500'
                    : 'glass border border-[rgba(99,102,241,0.2)] text-[var(--text-secondary)] hover:border-indigo-500/40 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Error state */}
        {error && !loading && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-6 px-4 py-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-['DM_Sans']"
          >
            <AlertCircle size={14} />
            Showing fallback data — GitHub API rate limit reached
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading
              ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} index={i} inView={inView} />
                ))}

            {!loading && filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-[var(--text-muted)] font-['DM_Sans']">
                No repositories match your filters
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
