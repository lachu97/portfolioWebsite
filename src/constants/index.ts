// ============================================================
// PORTFOLIO CONFIGURATION — Update these values with your info
// ============================================================

export const CONFIG = {
  name: "Lakshmi Narasimhan",
  title: "React Native Engineer, SDE II",
  tagline: "I build mobile apps that perform at 100K+ scale.",
  subtitle: "React Native engineer with 4 years of production mobile experience on Android & iOS. Focused on performance, native modules, and CI/CD.",
  location: "Chennai, India",
  availableForWork: true,

  // Social links
  GITHUB_USERNAME: "lachu97",
  LINKEDIN_URL: "https://linkedin.com/in/lakshminarasimhan-rn",
  LEETCODE_USERNAME: "Lakshu1797",
  EMAIL: "stellarworks03@gmail.com",
  TWITTER_URL: "",

  // Meta / SEO
  siteUrl: "https://lakshminarasimhan.dev",
  metaDescription: "React Native Engineer, SDE II — building high-performance mobile apps for Android & iOS with TypeScript, Kotlin, and Swift.",
};

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Apps", href: "#apps" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export const LIVE_APPS = [
  {
    name: "IntuitionX",
    description: "AI-powered equity market intelligence platform with real-time trading signals and portfolio insights.",
    url: "https://play.google.com/store/apps/details?id=com.intuitionxapp",
    company: "IntuitionX",
    tags: ["React Native", "TypeScript", "AI"],
  },
  {
    name: "Tes Magazine",
    description: "Digital edition of TES (Times Educational Supplement) magazine for educators worldwide.",
    url: "https://play.google.com/store/apps/details?id=com.magazine.tes",
    company: "Concentrix",
    tags: ["React Native", "iOS & Android"],
  },
  {
    name: "My Takeaway",
    description: "White-label food ordering app for independent restaurants and takeaway businesses.",
    url: "https://play.google.com/store/search?q=mytakeaway+app&c=apps",
    company: "Concentrix",
    tags: ["React Native", "iOS & Android"],
  },
  {
    name: "Digislides",
    description: "Android digital signage management app for remote content scheduling and multi-device deployment.",
    url: "https://play.google.com/store/apps/details?id=com.digisolution.digislides",
    company: "eShakti",
    tags: ["React Native", "Android"],
  },
  {
    name: "Digislides TV",
    description: "Android TV companion to Digislides — full-screen media playback and remote playlist sync for display hardware.",
    url: "https://play.google.com/store/apps/details?id=com.digisolution.tvslides",
    company: "eShakti",
    tags: ["React Native", "Android TV"],
  },
  {
    name: "Foodhub",
    description: "Online food ordering and delivery platform serving 50K+ users across the UK.",
    url: "https://play.google.com/store/apps/details?id=com.t2s.foodhub",
    company: "Foodhub",
    tags: ["React Native", "iOS & Android"],
  },
];

export const SKILLS = {
  mobile: [
    { name: "React Native", level: 98 },
    { name: "TypeScript", level: 96 },
    { name: "Kotlin", level: 84 },
    { name: "Swift", level: 80 },
    { name: "Reanimated", level: 85 },
  ],
  frontend: [
    { name: "React", level: 88 },
    { name: "Redux Toolkit", level: 85 },
    { name: "React Query", level: 82 },
    { name: "Tailwind CSS", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Python", level: 87 },
    { name: "FastAPI", level: 85 },
    { name: "PostgreSQL", level: 84 },
    { name: "GraphQL", level: 78 },
  ],
  devops: [
    { name: "Fastlane", level: 90 },
    { name: "GitHub Actions", level: 88 },
    { name: "CodePush", level: 87 },
    { name: "Docker", level: 82 },
    { name: "AWS S3", level: 78 },
  ],
};

export const TECH_STACK = {
  Mobile: [
    { name: "React Native", icon: "SiReact", color: "#61DAFB", description: "Primary framework — 4 years shipping iOS & Android apps to 100K+ users." },
    { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", description: "Strict typing across all projects — fewer runtime bugs, safer refactors." },
    { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF", description: "Native Android modules & React Native bridging for performance-critical features." },
    { name: "Swift", icon: "SiSwift", color: "#F05138", description: "Native iOS modules, Keychain integrations & TestFlight distribution." },
    { name: "Android", icon: "SiAndroid", color: "#3DDC84", description: "Deep profiling with Android Studio Profiler — fixed memory leaks, cut crashes." },
    { name: "iOS", icon: "SiApple", color: "#ffffff", description: "Xcode Instruments profiling, code signing & App Store release management." },
  ],
  Frontend: [
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", description: "Foundation of everything — ES2020+, async patterns, performance tuning." },
    { name: "React", icon: "SiReact", color: "#61DAFB", description: "Web counterpart to React Native — shared patterns, same component model." },
    { name: "Redux Toolkit", icon: "SiRedux", color: "#764ABC", description: "Global state for complex multi-screen flows with predictable data flow." },
    { name: "React Query", icon: "SiReactquery", color: "#FF4154", description: "Server state sync, caching & background refetch — no more useEffect spaghetti." },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", description: "Utility-first styling — this very portfolio is built with it." },
  ],
  Backend: [
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933", description: "API servers & BFF layers powering mobile app backends." },
    { name: "FastAPI", icon: "SiFastapi", color: "#009688", description: "High-performance Python APIs — used in VectorDB with sub-0.6ms p95 latency." },
    { name: "Python", icon: "SiPython", color: "#FFD43B", description: "Scripting, ML tooling & data pipelines — LangChain, pgvector, pandas." },
    { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1", description: "Primary DB — pgvector HNSW indexes for semantic search in VectorDB." },
    { name: "GraphQL", icon: "SiGraphql", color: "#E10098", description: "Typed API contracts for mobile — LeetCode stats & internal data APIs." },
  ],
  DevOps: [
    { name: "Fastlane", icon: "SiFastlane", color: "#e11d48", description: "Automated Play Store & TestFlight deploys, code signing & staged rollouts." },
    { name: "GitHub Actions", icon: "SiGithubactions", color: "#2088FF", description: "CI/CD pipelines — lint, test, build & deploy triggered on every PR." },
    { name: "Docker", icon: "SiDocker", color: "#2496ED", description: "Containerized backend services & reproducible dev environments." },
    { name: "Firebase", icon: "SiFirebase", color: "#FFCA28", description: "Push notifications, Crashlytics error tracking & Remote Config for A/B tests." },
    { name: "Sentry", icon: "SiSentry", color: "#8b5cf6", description: "Real-time error monitoring & release health tracking across iOS & Android." },
    { name: "Jest", icon: "SiJest", color: "#C21325", description: "Unit & integration tests for React Native components, hooks & utilities." },
  ],
  'AI Tools': [
    { name: "Claude", icon: "SiClaude", color: "#D97757", description: "Daily coding assistant — architecture discussions, code review & debugging." },
    { name: "ChatGPT", icon: "SiOpenai", color: "#10A37F", description: "Ideation, edge-case debugging & drafting technical documentation." },
    { name: "Cursor", icon: "Cursor", color: "#C084FC", description: "AI-native code editor — tab completion, multi-file edits & inline chat." },
  ],
};

export const EXPERIENCE = [
  {
    company: "IntuitionX",
    role: "SDE II — React Native & Full-Stack (Contract)",
    period: "Mar 2026 — Present",
    description: "Building React Native features end-to-end across iOS and Android, integrated with a React web frontend and Node.js backend. Own CI/CD pipelines (Fastlane + GitHub Actions) for Play Store and TestFlight. Writing native module integrations in Kotlin and Swift with strict TypeScript throughout.",
    tech: ["React Native", "TypeScript", "Kotlin", "Swift", "Node.js", "Fastlane"],
    link: "https://intuitionx.com",
    highlight: true,
  },
  {
    company: "Concentrix",
    role: "SDE II — React Native, iOS & Android",
    period: "Oct 2024 — Jan 2026",
    description: "Built shared React Native infrastructure modules reused across 5+ apps, cutting duplicated code ~60%. Reduced JS-thread latency ~35% via memoization and FlatList virtualization. Fixed memory leaks with Android Studio Profiler and Xcode Instruments, bringing crash-free sessions to 99.8%. Set up Fastlane CI/CD with staged Play Store rollouts and CodePush OTA.",
    metrics: ["~35% JS latency", "99.8% crash-free", "~60% less duplication"],
    tech: ["React Native", "TypeScript", "Kotlin", "Swift", "Fastlane", "CodePush", "Crashlytics"],
    link: "https://concentrix.com",
  },
  {
    company: "eShakti",
    role: "SDE I — React Native, iOS & Android",
    period: "May 2023 — May 2024",
    description: "Worked on a React Native e-commerce app that grew to 100K+ installs on Android and iOS (US market). Improved startup time ~25% and rendering on mid/low-tier devices. Shipped JS fixes via CodePush OTA, cutting resolution time from days to hours. Ran A/B tests and beta releases with Fastlane.",
    metrics: ["100K+ installs", "~25% faster startup"],
    tech: ["React Native", "TypeScript", "CodePush", "Fastlane", "Firebase"],
    link: "https://eshakti.com",
  },
  {
    company: "Foodhub",
    role: "Software Engineer — React Native",
    period: "Jul 2022 — Mar 2023",
    description: "Reduced cold-start time ~30% through bundle splitting, lazy loading, and image optimization on an app with 50K+ users. Built media upload and sync workflows for low-end devices using AWS S3 and Firebase Cloud Functions. Automated Play Store and TestFlight releases with Fastlane; used CodePush for OTA updates.",
    metrics: ["~30% faster cold-start", "50K+ users"],
    tech: ["React Native", "AWS S3", "Firebase", "Fastlane", "CodePush"],
    link: "https://foodhub.com",
  },
  {
    company: "Colan Infotech",
    role: "Android/iOS Developer Intern",
    period: "Sep 2020 — Jun 2022",
    description: "Internship focused on native Android and iOS development, building foundational skills in mobile engineering.",
    tech: ["Android", "iOS", "Kotlin", "Swift"],
    link: "https://colaninfotech.com",
  },
];

export const STATS = [
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Apps Shipped", value: 5, suffix: "+" },
  { label: "App Installs", value: 100, suffix: "K+" },
  { label: "Crash-free Sessions", value: 99, suffix: ".8%" },
];

export const LEETCODE_FALLBACK = {
  username: CONFIG.LEETCODE_USERNAME,
  totalSolved: 702,
  easySolved: 357,
  mediumSolved: 302,
  hardSolved: 43,
  ranking: 87211,
  acceptanceRate: 62.3,
  contestRating: 1524,
};
