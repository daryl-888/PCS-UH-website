# UH Parallel Computing Society — Website

> **The future of computing is parallel.**

A production-ready Next.js site for the University of Houston Parallel Computing Society, styled as a futuristic GPU command center: ultra-dark green/black palette, glassmorphism HUD panels, a real-time Three.js GPU compute scene, terminal boot sequence, scanlines, and monospace system labels.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — full custom token system (see `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, staggered hero, command-palette menu
- **Three.js + @react-three/fiber + drei** — the hero GPU cluster scene
- **React Hook Form + Zod** — validated membership form (client + server)
- **Lucide React** — icons

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Building without internet prints a harmless warning while Next tries to inline the Google Fonts stylesheet — the build still succeeds. Online (or on Vercel) the fonts get optimized automatically.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In [vercel.com/new](https://vercel.com/new), import the repo — Next.js is auto-detected, zero config needed.
3. Deploy. Every push to `main` redeploys.

## Customize — everything lives in `data/`

| File | What to edit |
| --- | --- |
| `data/nav.ts` | GitHub/Discord/LinkedIn/Instagram URLs, contact email (all marked `TODO`) |
| `data/events.ts` | Event titles, dates, rooms — update each semester |
| `data/officers.ts` | Real officer names, roles, majors, contact links |
| `data/projects.ts` | Project descriptions, repos, hover stats |
| `data/offerings.ts` | The six "Active Protocols" cards |
| `data/sponsors.ts` | Sponsorship benefits |
| `data/telemetry.ts` | Stats strip, fake terminal log lines, marquee terms |

Colors and fonts are defined once in `tailwind.config.ts` (`obsidian`, `gpu`, `mint`, `holo`, `uhred`, …). The UH red is intentionally used only as a ≤5% micro-accent (footer mark, error states).

## Wiring up the membership form

`components/Join.tsx` POSTs to `app/api/join/route.ts`, which validates with Zod and currently just logs. To receive real submissions:

**Resend (recommended):**
```bash
npm i resend
echo "RESEND_API_KEY=re_..." >> .env.local
```
Then uncomment the marked block in `app/api/join/route.ts`.

**Alternatives:** forward the payload to a Discord webhook, Google Sheet, or Airtable inside the same route — the validated `parsed.data` object is ready to ship anywhere.

## Motion & accessibility

- `prefers-reduced-motion` is respected everywhere: the boot sequence is skipped, the 3D scene renders a static frame, CSS/Framer animations collapse to simple fades.
- The boot sequence runs once per browser session (`sessionStorage`) and can be skipped with any key/click.
- Keyboard focus is visible site-wide; the mobile menu is a proper dialog; the form has labeled fields with inline `role="alert"` errors.
- 3D particle counts and device pixel ratio scale down automatically on mobile.

## Optional upgrade: self-hosted fonts

Fonts load via a Google Fonts `<link>` so the project builds anywhere. For zero-layout-shift, swap to `next/font/google` in `app/layout.tsx`:

```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// …apply the variables to <body className={`${inter.variable} …`}>
```

## Project structure

```
app/            layout, page, globals.css, api/join route
components/     Navbar, Hero, ComputeScene (Three.js), BootSequence,
                TelemetryStrip, Mission, Offerings, Projects, Events,
                Officers, Sponsors, Join, Footer + shared HUD primitives
data/           all editable content
lib/            cn() + media-query hooks
```
