# Sprint 2 Hand-off — Vitrine / LP de Conversão

## 1. What was done

- Composed `src/app/page.tsx` as a full conversion landing page: `Header → Hero → ServiceList → BookingForm → Footer`.
- All five UI components created in `src/components/`: `Header`, `Hero`, `ServiceList`, `ServiceCard`, `Footer` (tom), plus `BookingForm` (bob).
- Added Tailwind CSS theme layer wiring: CSS custom properties (`--color-primary`, `--color-accent`) injected by `layout.tsx` from `clientConfig`; Tailwind tokens `bg-primary`/`bg-accent`/`text-primary`/`border-accent` mapped in `tailwind.config.ts`.
- Added vitest + @testing-library/react test suite with 2 tests for `BookingForm`.
- Fixed pnpm 10 build-script blocking: `pnpm.onlyBuiltDependencies` in `package.json` + `.npmrc` with `enable-pre-post-scripts=true`.

Deliverables:
```
src/
  app/page.tsx              — LP composition (Hero → ServiceList → BookingForm → Footer)
  components/
    Header.tsx              — Clinic name + CTA anchor
    Hero.tsx                — Hero section with copy/tagline from config
    ServiceList.tsx         — Responsive service grid
    ServiceCard.tsx         — Individual service card
    BookingForm.tsx         — Client-side mock booking form
    Footer.tsx              — Footer with dynamic year
  __tests__/
    BookingForm.test.tsx    — 2 vitest tests
tailwind.config.ts          — Theme token mapping
.npmrc                      — enable-pre-post-scripts=true
docs/handoff/s2-vitrine.md  — This file
```

---

## 2. UX / Technical decisions + why

| Decision | Reason |
|---|---|
| Page order: Hero → ServiceList → BookingForm → Footer | Conversion-oriented: establish value first, then CTA |
| Header CTA anchors to `#agendamento` | Smooth scroll to form; no JS router needed |
| `BookingForm` is a `"use client"` component | Uses React state for form + submission; RSC cannot hold mutable state |
| Mock submit (client-side state only) | No API/DB in this sprint — keeps scope clean |
| Service dropdown populated from `clientConfig.services` | Changing the config automatically updates dropdown options |
| CTA copy from `clientConfig.copy.cta` | Single source of truth; no hardcoded strings |
| Theme via CSS custom properties + Tailwind tokens | Swap client = edit `client.ts` only; no component changes needed |
| `import React from "react"` in `BookingForm.tsx` and test file | `@vitejs/plugin-react` v6 (oxc-transform) uses classic JSX runtime in vitest context; explicit import required in both the component and the test file |
| `"test": "vitest run"` script | pnpm resolves `.bin/vitest` to the project-local v4 binary, avoiding conflicts with any globally installed vitest |

---

## 3. Current state

- `NODE_ENV=production pnpm build` → **green** (4/4 static pages, no warnings)
- `pnpm lint` → **zero warnings/errors**
- `pnpm test` → **2/2 passing** (BookingForm submit + reset)
- Full LP rendered: Header + Hero (CTA above fold) + ServiceList + BookingForm + Footer
- No database, no authentication, no API routes
- Form is fully mock: submit shows confirmation screen, "Novo agendamento" resets state

---

## 4. Pending items

- Replace mock submit with a real booking endpoint (REST or Next.js server action) — Squad C scope.
- Phone field has no mask/validation (plain `type="tel"` only).
- No accessible error messages on required-field validation (browser native only).
- Metadata (`<title>`, `<meta description>`, OG tags) still uses placeholder strings in `layout.tsx`.
- `packageManager: "pnpm@9.0.0"` in `package.json` is stale (actual runtime is pnpm 10.x) — may generate Corepack warnings in CI.

---

## 5. Gotchas

### NODE_ENV must be set explicitly for local builds
This runner sets `NODE_ENV` to a non-standard value. `next build` falls back to development mode and fails pre-rendering.  
**Fix:** always run `NODE_ENV=production pnpm build`. In Vercel/Docker/CI this is automatic.

### pnpm 10 blocks lifecycle scripts by default
pnpm 10 introduced stricter controls on lifecycle scripts. Without `pnpm.onlyBuiltDependencies` in `package.json`, `next`, `sharp`, and `unrs-resolver` postinstall scripts are silently skipped, which can cause build failures.  
**Fix:** the `pnpm.onlyBuiltDependencies` field is already set — do not remove it. `.npmrc` with `enable-pre-post-scripts=true` provides an additional fallback.

### Windows + OneDrive: pnpm `.bin` symlinks not resolved by shell PATH
On this machine (Windows + OneDrive path with spaces), pnpm's `.bin` junction symlinks are not always resolved correctly when invoked via `pnpm exec <cmd>` or directly from the shell. Affects `next` and can affect other binaries.  
**Fix:** invoke Next.js directly: `node node_modules/.pnpm/next@<version>/node_modules/next/dist/bin/next`. For CI/Vercel this does not apply — standard `pnpm build` works.

### pnpm store corruption (Windows + OneDrive)
If `node_modules` is deleted and recreated in a path with spaces (OneDrive), junctions may point to empty targets.  
**Fix:** `pnpm store prune` followed by `pnpm install` — re-links all packages from the global store (`%LOCALAPPDATA%\pnpm\store`).

### `@vitejs/plugin-react` v6 uses classic JSX runtime in vitest
`@vitejs/plugin-react` v6 switched to `oxc-transform`. In vitest context it falls back to the classic JSX runtime, meaning `React` must be explicitly in scope in **every** file that renders JSX — both test files and component files.  
**Fix:** add `import React from "react"` at the top of any `.tsx` file used in tests. Already applied to `BookingForm.tsx` and `BookingForm.test.tsx`.

### vitest global version conflict
This machine has a global vitest@3.x installation that takes precedence over `npx vitest` in some shell contexts. The `"test"` script in `package.json` uses `"vitest run"` which pnpm resolves to the project-local v4 binary via `.bin`.  
**Fix:** always run tests via `pnpm test`, not `npx vitest` or a bare `vitest` call.

### `not-found.tsx` required in App Router
Without `src/app/not-found.tsx`, Next.js 15 falls back to the Pages Router runtime for `/404` pre-rendering, causing a crash. File must remain in the repo.

---

## 6. How to run / test

```bash
# Install dependencies
pnpm install

# Run tests (vitest)
pnpm test

# Lint
pnpm lint

# Production build (NODE_ENV explicit required in this local environment)
NODE_ENV=production pnpm build

# Dev server
pnpm dev   # → http://localhost:3000
```

To swap client: edit `src/config/client.ts` only — change `clinicName`, `tagline`, `services`, `copy`, `primaryColor`, `accentColor`.

---

## 7. Next steps for Squad C

1. **Real booking API:** implement a server action or REST endpoint and wire `BookingForm` to it. Add loading + error states.
2. **Form validation:** add phone mask (e.g. react-input-mask or a custom hook), client-side validation with accessible error messages.
3. **Multi-client config:** move `clientConfig` to `src/config/clients/[slug].ts`, select via `CLIENT_SLUG` env var — enables per-client builds without code changes.
4. **Analytics:** add conversion tracking on form submit (e.g. GTM, Plausible).
5. **SEO:** update `layout.tsx` metadata (`title`, `description`, OG tags) with real client content.
6. **Deploy:** `output: "standalone"` is already configured. Create a `Dockerfile` or connect to Vercel.
7. **Database (if needed):** use Prisma with singleton at `src/lib/prisma.ts` — never instantiate `PrismaClient` directly in components.
