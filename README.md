# FitLog — Workout Library

A dark, responsive workout library and daily training log built to match the supplied FitLog Figma/screenshots.

## Technologies
- Next.js App Router
- React + TypeScript
- CSS (responsive custom styling)
- Lucide React icons
- FitLog REST API
- localStorage for Today's Plan and Saved workouts

## Features
1. Responsive 3-column workout library with API data.
2. Workout detail pages with specs, instructions and actions.
3. Today's Plan with a five-lift cap, live metrics, sorting, mark-done and remove actions.
4. Saved workouts tab with persistent localStorage data.
5. Toast notifications for plan/save/done/remove actions.
6. Loading states and a 404 page.
7. Responsive mobile/tablet/desktop layout matching the supplied dark UI.

## API
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Run locally
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

## Production
```bash
npm run build
npm start
```

Deploy on Vercel, Netlify, Cloudflare Pages, or another Next.js-compatible host.

## Git commits
For the assignment requirement, make at least 8 meaningful commits as you build, for example:
- `feat: create responsive navbar`
- `feat: add workout library API`
- `feat: build workout cards`
- `feat: add workout detail page`
- `feat: add today's plan and saved tabs`
- `feat: persist workout data in localStorage`
- `feat: add sorting and toast notifications`
- `docs: add project README`
