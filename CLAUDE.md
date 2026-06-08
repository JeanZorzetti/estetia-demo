# CLAUDE.md — Clínica Estética Demo

Fonte de verdade do projeto para contexto de agentes e desenvolvedores.

## Visão geral

Demo de site para clínica estética, parametrizável por cliente.  
Stack: **Next.js 15 App Router**, TypeScript strict, React 19, pnpm.

## Estrutura

```
src/
  app/           — Rotas App Router (layout, page, not-found)
  config/        — Config tipada por cliente (client.ts)
  components/    — Header, Hero, ServiceList, ServiceCard, BookingForm, Footer
  lib/           — Utilitários compartilhados (ex: prisma singleton se necessário)
  __tests__/     — Testes vitest (BookingForm.test.tsx, no-show-reminder.test.ts)
  lib/
    automation/  — Lógica de automação (no-show-reminder.ts)
docs/
  handoff/       — Hand-offs de sprint (s1-base.md, s2-vitrine.md)
```

## Convenções

- **TypeScript strict** em tudo. Sem `any` implícito.
- **Path alias `@/*`** mapeia para `src/*`. Usar sempre em imports.
- **App Router only** — não criar nada em `pages/`.
- **Parâmetros de rota assíncronos:** `params` e `searchParams` são Promises no Next 15. Sempre `await params` em rotas dinâmicas.
- **Prisma:** se banco for adicionado, usar singleton em `src/lib/prisma.ts` — nunca instanciar `PrismaClient` diretamente nos componentes.
- **Formatação:** Prettier com config em `.prettierrc` (semi, double quotes, tabWidth 2, trailingComma es5, printWidth 100).
- **Lint:** ESLint `next/core-web-vitals` + `next/typescript`. `pnpm lint` deve passar sem warnings.
- **Commits:** mensagens em inglês. Escopo pequeno e focado por feature.
- **Comentários de código:** em inglês. Apenas onde a lógica não é autoexplicativa.

## Parametrização por cliente

O arquivo `src/config/client.ts` contém o objeto `clientConfig` com:
- `clinicName`, `tagline`, `primaryColor`, `accentColor`
- `services[]` com `name` e `description`
- `copy.hero` e `copy.cta`

Para trocar de cliente, editar apenas esse arquivo.  
Futuramente: mover para `src/config/clients/[slug].ts` e selecionar via `CLIENT_SLUG` env var.

## Build e testes

```bash
pnpm install
NODE_ENV=production pnpm build   # NODE_ENV explícito necessário neste ambiente de dev local
pnpm dev                          # http://localhost:3000
pnpm lint
pnpm test                         # vitest — 2 testes (BookingForm)
```

> **Atenção:** este ambiente tem `NODE_ENV` não-padrão. Em Vercel/Docker/CI, `NODE_ENV=production` é automático e `pnpm build` funciona normalmente.

### Quirks do ambiente local (Windows + OneDrive)

- **pnpm `.bin` symlinks:** em alguns contextos de shell, `pnpm exec next` não resolve. Usar `node node_modules/.pnpm/next@<version>/node_modules/next/dist/bin/next` diretamente se necessário.
- **pnpm store corrompido:** se `pnpm install` falhar com junctions inválidos, rodar `pnpm store prune && pnpm install`.
- **vitest global:** esta máquina tem vitest@3.x global que conflita com o v4 do projeto. Usar sempre `pnpm test` (resolve o binário local via `.bin`).

## Estado do projeto (pós Sprint 3)

- LP de conversão completa: Header + Hero (CTA acima da dobra) + ServiceList + BookingForm + Footer
- Todos os componentes em `src/components/` consomem `clientConfig` e tokens Tailwind do tema
- BookingForm: formulário mock client-side (nome, telefone, serviço, mensagem) com confirmação e reset
- Tema via CSS custom properties injetadas em `layout.tsx` — trocar cliente = editar só `src/config/client.ts`
- `pnpm test` verde (3/3), `NODE_ENV=production pnpm build` verde (4/4 páginas estáticas)
- Sem banco de dados, sem autenticação, sem API real
- **Automação de lembretes:** `src/lib/automation/no-show-reminder.ts` — `scheduleReminders()` retorna 2 lembretes (24h e 2h antes da consulta). Envio pelo canal mockado por design.
- **Deploy standalone:** `Dockerfile` multi-stage pronto para EasyPanel. `output: "standalone"` em `next.config.ts`. `.gitattributes` com `eol=lf`.
- **URL pública:** `[PENDING DEPLOY]` — ver `Docs/handoff/s3-deploy.md` e `Docs/sales/fabrica-status.md`.
- Ver `Docs/handoff/s3-automacao.md` para decisões técnicas, gotchas e próximos passos do Sprint 3.

### Convenções adicionais (Sprint 2)

- **React import em arquivos de teste e componentes testados:** `@vitejs/plugin-react` v6 usa classic JSX runtime no vitest — sempre adicionar `import React from "react"` em `.tsx` usados em testes.
- **`pnpm.onlyBuiltDependencies`:** não remover do `package.json` — necessário para scripts de postinstall do Next.js/sharp no pnpm 10.

### Convenções adicionais (Sprint 3)

- **Dockerfile:** não modificar sem testar `node .next/standalone/server.js` localmente — HOSTNAME=0.0.0.0 e cópia de `public/` + `.next/static/` são obrigatórios.
- **pnpm install EBUSY:** rodar duas vezes se necessário após `pnpm store prune`. É um quirk do Windows + OneDrive.
- **`__tests__/` inclui .ts e .tsx:** `no-show-reminder.test.ts` é TypeScript puro (sem JSX) — não adicionar `import React` nele.
