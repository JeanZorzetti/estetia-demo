# Sprint 3 Hand-off — Deploy Config (Standalone + EasyPanel)

## What was done

- `Dockerfile` multi-stage added (deps → builder → runner) for Next.js standalone output.
- `.gitattributes` added with `eol=lf` to prevent CRLF issues from Windows/OneDrive dev environment.
- `next.config.ts` already had `output: "standalone"` — no change needed.

---

## EasyPanel setup

### Option A — Dockerfile (recommended)

1. Create a new service in EasyPanel → **App** → source: **Git repo** or **Docker image**.
2. If using Git: set **Build method** to `Dockerfile`. EasyPanel will auto-detect `Dockerfile` at repo root.
3. Set environment variables in EasyPanel service settings:
   ```
   NODE_ENV=production
   HOSTNAME=0.0.0.0
   PORT=3000
   ```
   > `HOSTNAME=0.0.0.0` is **critical** — without it the Next.js server binds to `127.0.0.1` and EasyPanel's reverse proxy cannot reach it.
4. Set **exposed port** to `3000`.
5. Deploy.

### Option B — nixpacks (alternative if Dockerfile not used)

EasyPanel supports nixpacks auto-detection for Node.js. If using nixpacks instead of Dockerfile:
- Add the env vars above in service settings.
- Set build command: `NODE_ENV=production pnpm build`
- Set start command: `node .next/standalone/server.js`

---

## Verifying standalone server locally

After `NODE_ENV=production pnpm build`:

```bash
# Copy public and static assets into standalone output (required by Next.js standalone)
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# Start the standalone server
HOSTNAME=0.0.0.0 PORT=3000 node .next/standalone/server.js
# → Server should respond at http://localhost:3000
```

> **Note:** The Dockerfile handles the asset copy in the builder stage via the COPY commands. For local testing you must copy them manually as shown above.

---

## Gotchas

### HOSTNAME must be 0.0.0.0
Next.js standalone server defaults to binding on `127.0.0.1`. EasyPanel's Traefik proxy connects from outside the container loopback — it needs `0.0.0.0`. Set via `ENV HOSTNAME=0.0.0.0` in Dockerfile (already done) and in EasyPanel env vars.

### NODE_ENV must be explicit for local builds
This dev machine has a non-standard `NODE_ENV`. Always run `NODE_ENV=production pnpm build`. In EasyPanel/Docker/CI this is set automatically.

### public/ and .next/static must be copied into standalone output
Next.js standalone output does NOT include `public/` or `.next/static/` — they must be copied separately. The Dockerfile's runner stage handles this. For local testing, copy manually (see above).

### .gitattributes eol=lf
Dev machine is Windows + OneDrive. Without `eol=lf`, shell scripts and Dockerfile may get CRLF line endings on commit, causing `exec format error` inside Linux containers.

### pnpm .bin symlinks (Windows only)
On this machine, `pnpm exec next` may not resolve correctly. Use `NODE_ENV=production pnpm build` via the package.json script. In Docker (Linux), this is not an issue.

---

## Build verification

- `NODE_ENV=production pnpm build` → green (4/4 static pages)
- Standalone output at `.next/standalone/server.js`
- `pnpm lint` → zero warnings
- `pnpm test` → 2/2 passing
