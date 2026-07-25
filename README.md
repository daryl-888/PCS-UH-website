# UH Parallel Computing Society — Website

> **The future of computing is parallel.**

A production-ready Next.js site for the University of Houston Parallel Computing Society, styled as a futuristic GPU command center: ultra-dark green/black palette, glassmorphism HUD panels, a real-time Three.js GPU compute scene, terminal boot sequence, scanlines, and monospace system labels.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
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

## Deploy to Azure

The site is deployed as a **hybrid Next.js app on Azure Static Web Apps (SWA)** — the static pages (everything except `/api/join`) are served straight from Azure's global CDN, and the one API route runs on a small **managed backend function** that SWA provisions automatically. There's no VM or App Service Plan to size or keep running, so it scales to zero and costs nothing at rest — the right shape for a site that's ~99% static content. (App Service is the alternative if you outgrow this; see [Why not App Service](#why-not-app-service) below.)

> **Preview feature:** Next.js hybrid support on Azure Static Web Apps is in public preview as of this writing. It's stable enough for a low-traffic org site, but if Microsoft changes behavior, check [the hybrid Next.js docs](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid) before assuming this guide is still accurate.

### What's already set up in this repo

- `next.config.mjs` sets `output: "standalone"` — Next.js traces exactly which files each route needs instead of shipping all of `node_modules`, which keeps the deployed bundle under SWA's 250MB hybrid app limit and shrinks the managed function's cold start.
- `scripts/postbuild-standalone.mjs` copies `public/` and `.next/static` into `.next/standalone` after every build (the `build` npm script runs it automatically). Without this, the standalone server can't find the GPU model or any hashed CSS/JS.
- `.github/workflows/azure-static-web-apps.yml` is the CI/CD pipeline: push to `main` → build → deploy to production; open a PR → build → deploy to a disposable preview URL; close/merge the PR → preview environment torn down automatically.
- `.nvmrc` / `package.json#engines` pin Node to `20.9.0+`, which Next.js 16 requires.

### One-time setup

1. **Create the Static Web App resource.**
   - Azure Portal → **Create a resource** → search **Static Web Apps** → **Create**.
   - **Plan type**: Free (managed backend for the API route is included in every plan, including Free).
   - **Source**: GitHub → authenticate → pick this repo and the `main` branch.
   - **Build Details** → **Build Presets**: `Next.js`. Leave *App location*, *Api location*, and *Output location* at their defaults — the hybrid build preset infers them.
   - **Review + create**.

   Or via the Azure CLI, if you'd rather not click through the portal:
   ```bash
   az login
   az staticwebapp create \
     --name uh-pcs \
     --resource-group <your-resource-group> \
     --source https://github.com/<org>/<repo> \
     --branch main \
     --location eastus2 \
     --sku Free \
     --login-with-github
   ```

2. **Let it commit the workflow, then reconcile.** If you used the Portal/CLI GitHub integration, Azure pushes its own copy of the deploy workflow (with the deployment token already filled in as a repo secret named something like `AZURE_STATIC_WEB_APPS_API_TOKEN_<random>`). This repo already ships `.github/workflows/azure-static-web-apps.yml` — either delete Azure's auto-generated one and rename its secret to `AZURE_STATIC_WEB_APPS_API_TOKEN` to match ours, or delete ours and let Azure's stand. Don't keep both — you'll get two competing deployments.

3. **Set environment variables in two places** (Next.js needs them at both build time and request time):
   - **GitHub** → repo → **Settings → Secrets and variables → Actions** → add e.g. `RESEND_API_KEY` — this feeds the build step (see the `env:` block in the workflow).
   - **Azure Portal** → your Static Web App → **Settings → Environment variables** → add the same keys — this feeds the running API route at request time.

4. **Verify the deploy.** Check the **Actions** tab in GitHub for the workflow run, then open the URL from the Static Web App's **Overview** page. Confirm:
   - The GPU model renders (Network tab → the `.glb` request should return `200`/`304` with `Cache-Control: public, max-age=31536000, immutable`).
   - `/api/join` responds — submit the membership form, or `curl -X POST <your-url>/api/join -H "Content-Type: application/json" -d '{}'` should return a `422` validation error, not a `404`/`500`.
   - If the cache header from step 4 is missing, Azure's static-asset CDN may be serving `/models/*` directly instead of proxying through the Next.js function — add the same rule to `staticwebapp.config.json`'s `globalHeaders` as a fallback (not included by default since it's unnecessary if the Next.js server is handling it).

5. **(Optional) Custom domain.** Static Web App → **Custom domains** → add your domain → follow the CNAME/TXT instructions from your DNS provider. Azure issues and renews the TLS certificate for you.

### Why not App Service

Azure App Service is the more familiar "run a Node server" option, but it bills for an always-on compute instance (minimum B1 tier, ~$13/mo) whether or not anyone's visiting — the opposite of what we optimized for. Static Web Apps' managed backend only spins up to handle the occasional `/api/join` POST and otherwise costs nothing. Only reach for App Service if the site grows real server-rendered, per-request logic beyond one form handler.

## What to do when you make changes

This is a living checklist, not just a one-time setup — read it before merging anything to `main`.

- **Routine content edits** (`data/*.ts`, copy, colors in `tailwind.config.ts`) — just push to `main` or open a PR. The GitHub Actions workflow builds and deploys automatically; PRs get their own preview URL (posted as a PR comment by the Azure bot) so you can sanity-check before merging. No manual Azure Portal steps needed for this category, ever.

- **Replacing the GPU model** (`public/models/*.glb`) — the `/models/*` route is cached by browsers/CDN for a year as `immutable` (see `next.config.mjs`). If you swap the file's *contents* but keep the same filename, visitors with a cached copy won't see the update for up to a year. Always rename the file (e.g. add a version suffix) when replacing it, and update the `MODEL_URL` constant in `components/GpuModel.tsx` to match. If you add a new model, run it through `gltf-transform optimize` first (see below) — an uncompressed export can easily be 10x larger than it needs to be.

  ```bash
  npx @gltf-transform/cli optimize input.glb output.glb \
    --texture-compress webp --compress meshopt \
    --join false --flatten false --palette false --instance false --simplify false
  ```
  `--join`/`--flatten` are disabled to preserve node names that animations target (check `gltf-transform inspect` on the output — the `ANIMATIONS` table should still show the same channel count). Drop `--simplify false` if you're comfortable with the (default, near-lossless) mesh decimation.

- **Adding/changing environment variables** — update `.env.local` for local dev, the GitHub Actions secret (`Settings → Secrets and variables → Actions`) for the build step, and the Static Web App's **Environment variables** in the Azure Portal for the running API route. All three, every time — missing one is the most common "works locally, breaks in prod" bug with this setup.

- **Bumping the Node version** — update `.nvmrc` and `package.json#engines` together. Azure's build container reads `engines.node`; a mismatch doesn't fail loudly, it just silently builds with whatever Node version Azure defaults to.

- **New API routes** — hybrid SWA supports the full Next.js Route Handler API (including streaming, `force-dynamic`, etc.) via the managed backend, so no extra Azure config is needed for a new `app/api/**/route.ts` file. Redeploy and it's live.

- **Rolling back a bad deploy** — either `git revert` the offending commit and push (triggers a normal redeploy), or in the Azure Portal go to your Static Web App → **Deployment history** and you'll see prior GitHub Actions runs; re-running an older successful workflow run redeploys that commit's build.

- **Before merging anything that touches `next.config.mjs`, `package.json` scripts, or `scripts/postbuild-standalone.mjs`** — run `npm run build` locally and confirm `.next/standalone/server.js` exists and boots (`node .next/standalone/server.js`, then hit `http://localhost:3000/` and `/api/join`). This is exactly what Azure's build container does; if it doesn't work locally it won't work deployed.

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
scripts/        postbuild-standalone.mjs — copies static assets into
                .next/standalone for Azure's hybrid Next.js deploy
.github/        GitHub Actions workflow for Azure Static Web Apps CI/CD
```
