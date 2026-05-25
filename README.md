# Alex Rivera — Developer Portfolio

A world-class developer portfolio built with React + Vite, featuring premium animations, GitHub integration, and a stunning dark-first design.

## ✨ Features

- **Animated Loading Screen** — Terminal-style intro with progress bar
- **Custom Cursor** — Spring-physics cursor glow with pointer detection
- **Command Palette** — `⌘K` to navigate or open links
- **Scroll Progress Bar** — Gradient progress indicator
- **Hero Section** — Animated particles, typewriter effect, parallax on scroll
- **About** — Skill bars with stagger animations
- **Tech Stack** — Interactive categorized icon grid
- **Experience** — Animated timeline with gradient line
- **Projects** — Live GitHub API integration with search + language filter, skeleton loaders
- **Stats** — Animated counters, GitHub contribution calendar, LeetCode stats
- **Contact** — Working form + social links
- **Footer** — Clean with back-to-top

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

Edit `src/constants/index.ts` to update your personal info:

```ts
export const CONFIG = {
  name: "Your Name",
  title: "Your Title",
  GITHUB_USERNAME: "your-github-username",
  LINKEDIN_URL: "https://linkedin.com/in/you",
  LEETCODE_USERNAME: "your-leetcode-username",
  EMAIL: "you@example.com",
};
```

### Optional: GitHub API Token

For higher rate limits (5000 req/hr vs 60), create a `.env` file:

```env
VITE_GITHUB_TOKEN=your_personal_access_token
```

Then update `src/hooks/index.ts` to use it:
```ts
headers: { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
```

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo to vercel.com for auto-deploy
```

The `vercel.json` is already configured for SPA routing.

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, CommandPalette
│   ├── sections/      # Hero, About, TechStack, Experience, Projects, Stats, Contact
│   └── ui/            # Loader, CustomCursor
├── constants/         # CONFIG, NAV_ITEMS, SKILLS, EXPERIENCE, etc.
├── hooks/             # useGitHubRepos, useMousePosition, useCounter, useInView, etc.
├── types/             # TypeScript interfaces
└── index.css          # Design tokens, utilities, animations
```

## 🎨 Design System

- **Colors**: Indigo/Violet/Cyan gradient palette on deep dark background
- **Fonts**: Syne (headings) + DM Sans (body) + DM Mono (code)
- **Effects**: Glassmorphism, gradient borders, ambient orbs, noise texture
- **Animations**: Framer Motion throughout; GSAP-ready hooks

## 📦 Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion
- Lucide React (icons)
- react-github-calendar
- react-type-animation
