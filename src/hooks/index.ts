import { useState, useEffect, useRef, useCallback } from 'react';
import type { GitHubRepo, GitHubUser } from '../types';
import { CONFIG } from '../constants';

// ── GitHub repos hook ──────────────────────────────────────────────────────
export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`),
          fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}`),
        ]);

        if (!reposRes.ok) throw new Error('GitHub API rate limit or user not found');

        const reposData: GitHubRepo[] = await reposRes.json();
        const userData: GitHubUser = await userRes.json();

        const curated = reposData
          .filter(r => !r.fork && !r.archived && r.description && r.description.trim().length > 0)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 12);

        setRepos(curated);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        // Set fallback data
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { repos, user, loading, error };
}

// ── Mouse position hook ────────────────────────────────────────────────────
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
}

// ── Scroll progress hook ───────────────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// ── Animated counter hook ─────────────────────────────────────────────────
export function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return count;
}

// ── Intersection observer hook ─────────────────────────────────────────────
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Magnetic button hook ───────────────────────────────────────────────────
export function useMagnetic() {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

// ── Fallback repos ────────────────────────────────────────────────────────
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1, name: "vector-db", full_name: "lachu97/vector-db",
    description: "Self-hosted vector database with multi-tenant support, REST APIs, RAG pipeline, and sub-0.6ms p95 search via pgvector HNSW indexing.",
    html_url: "https://github.com/lachu97/vector-db", homepage: null,
    stargazers_count: 87, forks_count: 12, language: "Python",
    topics: ["pgvector", "fastapi", "postgresql", "rag", "docker"], updated_at: "2026-04-20", fork: false, archived: false,
  },
  {
    id: 2, name: "react-native-securekv", full_name: "lachu97/react-native-securekv",
    description: "Encrypted key-value storage for React Native, backed by Android Keystore and iOS Keychain. Published on npm.",
    html_url: "https://github.com/lachu97/react-native-securekv", homepage: "https://npmjs.com/package/react-native-securekv",
    stargazers_count: 54, forks_count: 8, language: "TypeScript",
    topics: ["react-native", "security", "keychain", "android-keystore", "npm"], updated_at: "2024-06-10", fork: false, archived: false,
  },
  {
    id: 3, name: "digislides", full_name: "lachu97/digislides",
    description: "React Native digital signage CMS with Android TV support, remote content sync, and media playback for multi-device deployments.",
    html_url: "https://github.com/lachu97/digislides", homepage: null,
    stargazers_count: 23, forks_count: 4, language: "TypeScript",
    topics: ["react-native", "android-tv", "cms", "digital-signage"], updated_at: "2023-08-15", fork: false, archived: false,
  },
];
