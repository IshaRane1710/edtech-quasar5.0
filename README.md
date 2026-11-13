# SkillForge

React 18 + Vite + TypeScript + Tailwind. Feature-based layout, route-level code splitting, ready for Vercel.

## Scripts
`npm run dev` · `npm run build` · `npm run preview` · `npm run lint` · `npm run typecheck`

## Structure
```
src/
  app/            App.tsx (providers + router), routes.tsx (lazy route table)
  components/
    ui/           ScoreRing, ProgressBar, Badge, SectionHeader, StatCard (barrel: @/components/ui)
    layout/       AppShell, LandingNavbar, LandingFooter
    feedback/     PageLoader
  features/       one folder per product area, each with:
    <feature>/pages/        route-level page (thin: composes sections)
    <feature>/components/   section components used only by that feature
    <feature>/data.ts       mock data   (constants.ts / utils.ts where needed)
    auth · landing · dashboard · ingestion · evaluation · analytics · learning-path · admin
  lib/            heatmap.ts (shared heat colours), supabase.ts (null-safe client)
  types/          shared domain types
```
Imports use the `@/` alias (= `src/`). Cross-feature imports go through a feature's public files (`@/features/auth`, `@/features/<x>/data`).

## Deploy on Vercel
1. Push the repo to GitHub and import it in Vercel (framework auto-detects as Vite; `vercel.json` already sets build, output `dist`, SPA rewrites and asset caching).
2. Optional env vars (Project Settings → Environment Variables): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (see `.env.example`). The app currently uses mock auth/data, so it works without them.
3. Or via CLI: `npm i -g vercel && vercel --prod`.

`vercel.json` rewrites every path to `index.html`, so deep links such as `/admin` or `/learning-path` don't 404 on refresh.
