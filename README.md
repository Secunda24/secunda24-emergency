<!--
Prototype includes: a public landing page, an interactive mobile app demo, and a dispatcher / partner dashboard prototype for Secunda24 Emergency.
Run with: npm install && npm run dev
Routes: / (landing page), /demo/app (mobile app prototype), /demo/dashboard (dispatcher dashboard)
-->

# Secunda24 Emergency

Secunda24 Emergency is a polished front-end demo prototype for verified emergency reporting in Secunda. The experience is designed for partner walkthroughs with local security companies, medical responders, and Secunda24 admin stakeholders. It uses seeded local mock data only and does not include a backend.

## Stack

- Next.js 14 App Router
- React + TypeScript
- Tailwind CSS
- shadcn/ui component primitives
- Lucide React
- Framer Motion

## Included in the prototype

- Public landing page with hero, product story, partner pitch, demo screen overview, and early access form
- Interactive mobile app prototype with onboarding, verification, alert selection, location picker, short summary, confirmation, and recent alerts history
- Dispatcher / partner dashboard with incident stats, live feed, partner routing panel, coverage map placeholder, and audit/compliance detail flow
- Seeded Secunda-area mock incidents, partners, coverage zones, and recent alerts

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Main routes

- `/` -> Landing page
- `/demo/app` -> Mobile app prototype
- `/demo/dashboard` -> Dispatcher / partner dashboard prototype

## Deployment

- GitHub + Render setup guide: `DEPLOY_RENDER.md`
- Render blueprint file: `render.yaml`

## Notes

- This is a front-end only working prototype for demos, not a production dispatch system.
- Reports route to the mock dispatcher / partner dashboard workflow and do not connect to SAPS.
- Identity, timestamp, GPS location, and device/IP metadata are shown as accountability signals using local mock state.
