export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  contestRating: number;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  link: string;
  highlight?: boolean;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export type FilterCategory = "all" | "frontend" | "backend" | "mobile" | "tools" | "ai" | "other";
