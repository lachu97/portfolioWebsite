# Portfolio — CLAUDE.md

Owner: **Lakshmi Narasimhan** (React Native Engineer, SDE II)
Stack: React 19 + TypeScript + Vite + Tailwind CSS v4

---

## Commands

```bash
npm run dev      # dev server at localhost:5173
npm run build    # tsc + vite build (always run to verify before finishing)
npm run lint     # eslint
npm run preview  # preview production build
```

Always run `npm run build` after changes to confirm zero TypeScript errors before claiming a task is done.

---

## Project Structure

```
src/
├── constants/index.ts          # ALL data lives here — edit this first for content changes
├── types/index.ts              # TypeScript types (GitHubRepo, GitHubUser)
├── hooks/index.ts              # useGitHubRepos, useMousePosition, useScrollProgress, useCounter, useInView, useMagnetic
├── main.tsx                    # Lenis smooth scroll init + React root
├── index.css                   # Global CSS, CSS variables, custom utilities
├── App.tsx                     # Root — loader, left scroll progress bar, section order
├── pic/pic.png                 # Owner profile photo (used in Navbar)
├── assets/hero.png             # Hero image (unused currently)
├── resume/myresume.pdf         # Owner's resume PDF
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed top nav, scroll progress bar, profile photo
│   │   ├── Footer.tsx          # Footer with nav links + socials
│   │   └── CommandPalette.tsx  # ⌘K command palette
│   ├── sections/
│   │   ├── Hero.tsx            # Landing — animated orbs, TypeAnimation, metrics banner
│   │   ├── About.tsx           # Bio, highlights, circular SVG skill rings
│   │   ├── TechStack.tsx       # Icon grid using react-icons/si with brand color glow
│   │   ├── Experience.tsx      # Timeline with TiltCard, branded tech tags
│   │   ├── Projects.tsx        # Featured OSS cards + live GitHub repos grid
│   │   ├── Stats.tsx           # Counters, GitHub calendar, LeetCode stats
│   │   └── Contact.tsx         # mailto form + social links
│   └── ui/
│       ├── TiltCard.tsx        # Reusable 3D tilt + glow on hover (used in Experience + TechStack)
│       ├── Loader.tsx          # Intro loading screen (~0.35s)
│       └── CustomCursor.tsx    # Custom cursor
```

---

## Data — Where to Edit

**All personal data is in `src/constants/index.ts`.** This is the single source of truth.

| Export | What it controls |
|--------|-----------------|
| `CONFIG` | Name, title, tagline, email, GitHub username, LinkedIn URL, LeetCode username, location |
| `SKILLS` | Circular ring skills in About section (categories: mobile, frontend, backend, devops) |
| `TECH_STACK` | Stack icon grid (categories: Mobile, Frontend, Backend, DevOps). Icons use `react-icons/si` keys |
| `EXPERIENCE` | Timeline entries — company, role, period, description, tech tags, link, highlight flag |
| `STATS` | 4 counter stats on Stats section |
| `LEETCODE_FALLBACK` | LeetCode stats shown (real data fetched from LeetCode GraphQL API if available) |
| `NAV_ITEMS` | Navbar links |

**`src/hooks/index.ts`** — `FALLBACK_REPOS` array at the bottom contains fallback GitHub repos shown if API fails.

---

## Owner Details

```
Name:     Lakshmi Narasimhan
Role:     React Native Engineer, SDE II
Email:    stellarworks03@gmail.com
GitHub:   lachu97
LinkedIn: lakshminarasimhan-rn
LeetCode: Lakshu1797 (702 solved — 357 Easy, 302 Medium, 43 Hard, rank #87211)
Location: Chennai, India
```

### Work Experience (chronological, newest first)
1. **IntuitionX** — SDE II, React Native & Full-Stack (Contract) — Mar 2026–Present (Remote)
2. **Concentrix** — SDE II, React Native iOS & Android — Oct 2024–Jan 2026 (Chennai)
3. **eShakti** — SDE I, React Native iOS & Android — May 2023–May 2024 (Chennai)
4. **Foodhub** — Software Engineer, React Native — Jul 2022–Mar 2023 (Chennai)
5. **Colan Infotech** — Android/iOS Developer Intern — Sep 2020–Jun 2022 (Chennai)

### Key Projects
- **react-native-securekv** — npm package, encrypted KV storage using Android Keystore + iOS Keychain
- **VectorDB** — self-hosted vector DB, pgvector HNSW, sub-0.6ms p95, FastAPI + React + Docker

### Education
B.Tech + M.Tech, Computer Engineering — IIITDM Kancheepuram (2015–2020)

---

## Design System

### CSS Variables (`src/index.css`)
```css
--bg-primary:      #030712      /* page background */
--bg-secondary:    #0a0f1e      /* card background */
--text-primary:    #f0f4ff      /* headings */
--text-secondary:  #c8d6e8      /* body text */
--text-muted:      #8899aa      /* labels, captions */
--accent-1:        #6366f1      /* indigo — primary accent */
--accent-2:        #8b5cf6      /* violet */
--accent-3:        #06b6d4      /* cyan */
```

### Base Font Size
`html { font-size: 20px }` — all Tailwind rem values scale from this.

### Typography
- **Syne** — headings, logo, section titles (font-800 for h1/h2)
- **DM Sans** — body text, descriptions, buttons
- **DM Mono** — labels, tags, code, section numbers

### Key CSS Classes
- `.gradient-border-card` — dark card with gradient border via `::before` pseudo-element
- `.glass` — frosted glass background + blur
- `.text-gradient` — indigo→violet→cyan gradient text
- `.orb` — blurred ambient light circle
- `.mesh-bg` — radial gradient page background

---

## Animation Patterns

- **Framer Motion** for all element animations. Standard easing: `[0.16, 1, 0.3, 1]` (custom spring-like)
- **Standard duration**: `0.4s` for section reveals, `0.3s` for micro-interactions
- **Stagger delays**: `i * 0.07` to `i * 0.1` between list items
- **Lenis** smooth scroll: `duration: 1.0`, `wheelMultiplier: 1.1` (configured in `main.tsx`)
- **TiltCard** (`src/components/ui/TiltCard.tsx`) — reusable 3D tilt component. Pass `glowColor` for brand-colored glow on hover, `maxTilt` for intensity (default 8°)
- `useInView(threshold)` hook — triggers animations when element enters viewport (disconnects observer after first trigger)

---

## Icons

Tech stack icons use **`react-icons/si`** (Simple Icons). Import pattern:
```tsx
import { SiReact, SiTypescript } from 'react-icons/si';
```
Icon keys in `TECH_STACK` constants match these import names exactly (e.g. `"SiReact"`, `"SiKotlin"`).
The `ICON_MAP` in `TechStack.tsx` maps string keys → icon components.

**Before adding a new tech icon:**
```bash
node -e "const si = require('react-icons/si'); console.log(!!si['SiYourIcon'])"
```
Verify it exists — not all brands have icons in the set.

UI icons use **`lucide-react`**.

---

## GitHub & LeetCode Data

- **GitHub repos**: fetched live from `https://api.github.com/users/lachu97/repos` (sorted by stars, max 30, no forks/archived)
- **GitHub calendar**: `react-github-calendar` component, username from `CONFIG.GITHUB_USERNAME`
- **LeetCode**: NO live API call — uses `LEETCODE_FALLBACK` in constants. To update stats, query:
  ```bash
  curl -s 'https://leetcode.com/graphql' \
    -H 'Content-Type: application/json' \
    -d '{"query":"{ matchedUser(username: \"Lakshu1797\") { submitStats { acSubmissionNum { difficulty count } } profile { ranking } } }"}'
  ```
  Then update `LEETCODE_FALLBACK` in `src/constants/index.ts`.

---

## Contact Form

`Contact.tsx` uses `mailto:` — submitting the form opens the user's email client with pre-filled subject and body. No backend required. Email goes to `stellarworks03@gmail.com`.

---

## Instructions for AI Agents

### Adding/changing personal data
Edit `src/constants/index.ts` only. Never hardcode data inside components — always reference `CONFIG`, `SKILLS`, `TECH_STACK`, `EXPERIENCE`, `STATS`, or `LEETCODE_FALLBACK`.

### Adding a new section
1. Create `src/components/sections/NewSection.tsx`
2. Import and add to `src/App.tsx` in the `<main>` block (between existing sections)
3. Add a nav item to `NAV_ITEMS` in `src/constants/index.ts`
4. Follow section number convention: `01 — About`, `02 — Stack`, etc.

### Adding a tech stack icon
1. Verify icon exists in `react-icons/si` (see check command above)
2. Add to `TECH_STACK` in constants with `icon: "SiIconName"`
3. Import and add to `ICON_MAP` in `TechStack.tsx`

### Modifying animations
- Change speed globally: adjust `duration` values (currently `0.4s` standard)
- Change scroll smoothness: edit Lenis config in `main.tsx`
- Change tilt intensity: adjust `maxTilt` prop on `TiltCard` usages

### Styling rules
- Use Tailwind utility classes. CSS variables for colors (not hardcoded hex in classNames)
- New cards: use `gradient-border-card` class
- New glass elements: use `glass` class
- Framer Motion for any animation — no CSS `transition` on animated elements (conflicts)
- Always `will-change: transform` on elements that animate position/scale

### Profile photo
Located at `src/pic/pic.png`. To change: replace the file at that path (keep same filename) or update the import in `Navbar.tsx`.

### DO NOT
- Hardcode personal data in components — use constants
- Add new npm packages without checking if existing ones cover the need (framer-motion, lucide-react, react-icons/si cover most cases)
- Use `text-xs` for user-facing text — minimum `text-sm` at 20px base font
- Skip `npm run build` verification after changes
