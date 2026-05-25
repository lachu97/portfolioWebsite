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
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
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
    { name: "React Native", icon: "SiReact", color: "#61DAFB" },
    { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
    { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF" },
    { name: "Swift", icon: "SiSwift", color: "#F05138" },
    { name: "Android", icon: "SiAndroid", color: "#3DDC84" },
    { name: "iOS", icon: "SiApple", color: "#ffffff" },
  ],
  Frontend: [
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "React", icon: "SiReact", color: "#61DAFB" },
    { name: "Redux Toolkit", icon: "SiRedux", color: "#764ABC" },
    { name: "React Query", icon: "SiReactquery", color: "#FF4154" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  ],
  Backend: [
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
    { name: "FastAPI", icon: "SiFastapi", color: "#009688" },
    { name: "Python", icon: "SiPython", color: "#FFD43B" },
    { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
    { name: "GraphQL", icon: "SiGraphql", color: "#E10098" },
  ],
  DevOps: [
    { name: "Fastlane", icon: "SiFastlane", color: "#e11d48" },
    { name: "GitHub Actions", icon: "SiGithubactions", color: "#2088FF" },
    { name: "Docker", icon: "SiDocker", color: "#2496ED" },
    { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
    { name: "Sentry", icon: "SiSentry", color: "#8b5cf6" },
    { name: "Jest", icon: "SiJest", color: "#C21325" },
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
    tech: ["React Native", "TypeScript", "Kotlin", "Swift", "Fastlane", "CodePush", "Crashlytics"],
    link: "https://concentrix.com",
  },
  {
    company: "eShakti",
    role: "SDE I — React Native, iOS & Android",
    period: "May 2023 — May 2024",
    description: "Worked on a React Native e-commerce app that grew to 100K+ installs on Android and iOS (US market). Improved startup time ~25% and rendering on mid/low-tier devices. Shipped JS fixes via CodePush OTA, cutting resolution time from days to hours. Ran A/B tests and beta releases with Fastlane.",
    tech: ["React Native", "TypeScript", "CodePush", "Fastlane", "Firebase"],
    link: "https://eshakti.com",
  },
  {
    company: "Foodhub",
    role: "Software Engineer — React Native",
    period: "Jul 2022 — Mar 2023",
    description: "Reduced cold-start time ~30% through bundle splitting, lazy loading, and image optimization on an app with 50K+ users. Built media upload and sync workflows for low-end devices using AWS S3 and Firebase Cloud Functions. Automated Play Store and TestFlight releases with Fastlane; used CodePush for OTA updates.",
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
