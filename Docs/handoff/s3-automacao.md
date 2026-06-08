# Sprint 3 Hand-off — Automação + Deploy

## 1. What was done

**Automation (tom):**
- Wrote test first (RED): `src/__tests__/no-show-reminder.test.ts` — verifies `scheduleReminders()` returns two `ScheduledReminder` objects at 24h and 2h before the appointment.
- Implemented `src/lib/automation/no-show-reminder.ts` until test turned GREEN.
- `pnpm test` result: **3/3 passing** (2 BookingForm + 1 scheduleReminders).

**Deploy config (bob):**
- `Dockerfile` — multi-stage build (deps → builder → runner) for Next.js standalone output.
- `.gitattributes` — `* text=auto eol=lf` to prevent CRLF issues from Windows/OneDrive dev environment.
- `Docs/handoff/s3-deploy.md` — full EasyPanel setup instructions (Option A Dockerfile, Option B nixpacks), local verification steps, all gotchas.

**Review + hand-off (alice):**
- Verified tests 3/3 ✅, build 4/4 ✅, standalone output ✅, Dockerfile ✅.
- Wrote this document and updated CLAUDE.md + `Docs/sales/fabrica-status.md`.

Deliverables:
```
src/
  __tests__/
    no-show-reminder.test.ts   — TDD test for scheduleReminders (new)
  lib/
    automation/
      no-show-reminder.ts      — scheduleReminders() implementation (new)
Dockerfile                     — multi-stage Next.js standalone (new)
.gitattributes                 — eol=lf normalization (new)
Docs/
  handoff/
    s3-deploy.md               — EasyPanel deploy instructions (bob)
    s3-automacao.md            — This file
  sales/
    fabrica-status.md          — Demo status + URL for sales use
```

---

## 2. Technical decisions + why

| Decision | Reason |
|---|---|
| TDD cycle (RED first) | Validates test is meaningful before implementation; task requirement |
| `scheduleReminders()` returns array, not void | Pure function — no side effects; channel sending is intentionally out of scope (mock-able at integration time) |
| `REMINDER_OFFSETS_HOURS = [24, 2] as const` | Single source of truth for offset config; easy to extend without changing logic |
| `sendAt = appointmentAt - offsetHours * 3600000` | Plain arithmetic on `Date.getTime()` — no date library dependency needed for this scope |
| TypeScript `ReminderChannel` union type | Compile-time constraint on valid channels; prevents silent typos |
| Multi-stage Dockerfile (deps → builder → runner) | Final image contains only the standalone output (~50MB), not dev dependencies or source |
| `ENV HOSTNAME=0.0.0.0` in Dockerfile | Next.js standalone defaults to `127.0.0.1`; EasyPanel's Traefik reverse proxy requires `0.0.0.0` |
| `public/` and `.next/static/` copied separately in Dockerfile | Next.js standalone output does NOT include these — required for assets to be served |
| `.gitattributes eol=lf` | Windows dev environment would otherwise commit CRLF line endings into Dockerfile and shell scripts, breaking Linux containers with `exec format error` |

---

## 3. Current state

- `pnpm test` (vitest v4.1.8 local): **3/3 passed** ✓
- `NODE_ENV=production next build`: **4/4 static pages** ✓ — standalone at `.next/standalone/server.js`
- `pnpm lint`: zero warnings/errors
- Dockerfile present and verified correct (multi-stage, HOSTNAME set, assets copied)
- `.gitattributes` normalized to LF
- **No database, no authentication, no real API** — BookingForm is still mock client-side only
- **Live public URL: PENDING DEPLOY** — see section 6 for deploy instructions

---

## 4. Pending items

- **Live deployment:** push repo to EasyPanel (or Vercel) to get a public URL — see `Docs/handoff/s3-deploy.md` for step-by-step. The repo is ready; only infra action required.
- **Real booking endpoint:** `BookingForm` still submits to mock state. Wire to a server action or REST endpoint for real appointments.
- **Phone field validation:** no mask or accessible error messages (browser native only).
- **Multi-client config:** move `clientConfig` to `src/config/clients/[slug].ts`, select via `CLIENT_SLUG` env var.
- **SEO metadata:** `layout.tsx` has placeholder `<title>` and `<meta description>`.
- **`packageManager` field:** `pnpm@9.0.0` in `package.json` is stale (runtime is pnpm 10.x) — may generate Corepack warnings in CI.

---

## 5. Gotchas

### HOSTNAME=0.0.0.0 is critical for EasyPanel
Next.js standalone binds to `127.0.0.1` by default. EasyPanel's Traefik proxy connects from outside the container loopback — it will time out unless `HOSTNAME=0.0.0.0` is set. Already in Dockerfile ENV; also set it in EasyPanel service env vars as a belt-and-suspenders.

### public/ and .next/static/ must be copied separately
Next.js standalone output does NOT include `public/` or `.next/static/`. The Dockerfile runner stage copies them. For local standalone testing, copy manually:
```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
HOSTNAME=0.0.0.0 PORT=3000 node .next/standalone/server.js
```

### NODE_ENV must be explicit for local builds
This dev machine has a non-standard `NODE_ENV`. Always run `NODE_ENV=production pnpm build`. In Docker/EasyPanel/Vercel it is automatic.

### pnpm EBUSY on Windows + OneDrive (install)
`pnpm install` may error with `EBUSY: resource busy or locked` on the first run after `pnpm store prune`. Run `pnpm install` a second time — 444/445 packages resolve on the first run and all complete on the second.

### pnpm .bin symlinks (Windows only)
`pnpm exec next` or `npx next` may not resolve on this machine. Use `NODE_ENV=production pnpm build` via the package.json script, or invoke directly: `node node_modules/.pnpm/next@15.3.3_.../node_modules/next/dist/bin/next build`. Inside Docker (Linux) the standard `pnpm build` works fine.

### pnpm store corruption (Windows + OneDrive)
If `node_modules` junctions break, run `pnpm store prune && pnpm install` (twice if needed).

### vitest global version conflict
This machine has a global vitest@3.x. Always run `pnpm test` — resolves the project-local v4 binary via `.bin`.

### React import in .tsx test files
`@vitejs/plugin-react` v6 uses classic JSX runtime in vitest context. Always add `import React from "react"` to any `.tsx` file used in tests.

---

## 6. How to run / test + live demo URL

```bash
# Install
pnpm install           # run twice if EBUSY on first run

# Tests
pnpm test              # vitest v4 — 3/3 expected

# Lint
pnpm lint

# Production build
NODE_ENV=production pnpm build   # 4/4 static pages expected

# Dev server
pnpm dev               # → http://localhost:3000

# Standalone server (after build)
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
HOSTNAME=0.0.0.0 PORT=3000 node .next/standalone/server.js
# → http://localhost:3000
```

**Live demo URL: `[PENDING DEPLOY]`**

Deploy instructions in `Docs/handoff/s3-deploy.md`. Once deployed, update:
- This file (section 6)
- `Docs/sales/fabrica-status.md`
- `CLAUDE.md` (Estado do projeto)

---

## 7. Next steps — real client delivery

1. **Deploy now:** push to EasyPanel using `Docs/handoff/s3-deploy.md`. Takes ~10 min once infra is ready.
2. **Record Loom:** screen-record the live demo (~3 min): show current problem with a real clinic's booking flow → show this demo solving it → state the ROI ("recover ~R$X/month in no-shows with 24h+2h reminders").
3. **Personalize per clinic:** edit `src/config/client.ts` with real clinic name, services, and colors → rebuild → deploy to a clinic-specific subdomain. Takes < 15 min per client.
4. **Wire real booking:** implement a Next.js server action or REST endpoint for `BookingForm`. Use a lightweight DB (SQLite via Prisma, or a hosted Postgres) for appointments.
5. **Enable reminders:** connect `scheduleReminders()` to a job queue (e.g. BullMQ, Trigger.dev) and a real SMS/WhatsApp provider (Twilio, Z-API).
6. **Pricing:** R$3–6k setup + R$300–600/month SaaS per clinic. The demo is the sales tool — time-to-close is short when the prospect sees their own clinic name on screen.
