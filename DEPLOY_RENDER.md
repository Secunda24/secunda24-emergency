# GitHub And Render Setup

## GitHub upload

This project is ready to upload from the `clientflow-portal` folder.

Recommended flow:

```bash
git init -b main
git add .
git commit -m "Launch Secunda24 Emergency prototype"
git remote add origin https://github.com/YOUR-USERNAME/secunda24-emergency.git
git push -u origin main
```

Notes:

- `node_modules`, `.next`, logs, and local env files are already ignored.
- Commit `.env.example`, `render.yaml`, `README.md`, and this file.
- Do not commit `.env.local` or any real secrets.

## Render deploy options

### Option 1: Blueprint deploy

If you connect the GitHub repo to Render and keep `render.yaml` in the repo root, Render can create the web service automatically from the blueprint.

Current blueprint file:

- `render.yaml`

### Option 2: Manual web service settings

Use these values in the Render dashboard:

- Service type: Web Service
- Name: `secunda24-emergency`
- Runtime: `Node`
- Root directory: leave blank if this repo root is the Next.js app
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`
- Node version: `20.20.2`

## Render environment variables

Set these in Render:

```text
NODE_VERSION=20.20.2
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_PORTAL_NAME=Secunda24 Emergency
NEXT_PUBLIC_COMPANY_NAME=Secunda24
NEXT_PUBLIC_LOGO_PLACEHOLDER=S24
NEXT_PUBLIC_ACCENT_HSL=210 88% 52%
NEXT_PUBLIC_SITE_URL=https://YOUR-RENDER-URL.onrender.com
```

Optional only if you later wire Supabase-backed auth or data:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## After deploy

Update:

- `NEXT_PUBLIC_SITE_URL` in Render to your real Render URL
- `.env.local` locally if you want the same public URL during testing

## Demo recommendation

For partner demos, use a paid Render tier if you want to avoid cold starts. The included config stays simple and blueprint-friendly, but you can change the plan in the Render dashboard after import.
