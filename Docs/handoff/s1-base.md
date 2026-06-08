# Sprint 1 Hand-off — Base do Repositório

## 1. O que foi feito

Criado o esqueleto inicial do projeto de demo de clínica estética sobre **Next.js 15 App Router** com TypeScript.  
Implementada também a camada de parametrização por cliente em `src/config/client.ts`, consumida diretamente pela página placeholder.  
Adicionado `src/app/not-found.tsx` mínimo para corrigir falha de pré-renderização do `/404` no App Router (ver Gotchas).

Arquivos entregues neste sprint:
```
src/
  app/
    layout.tsx        — RootLayout + metadata
    page.tsx          — Página placeholder (consome clientConfig)
    not-found.tsx     — 404 handler para App Router
  config/
    client.ts         — Tipos ClientConfig/Service + objeto clientConfig
next.config.ts        — output: standalone
tsconfig.json         — strict, path alias @/*
.eslintrc.json        — next/core-web-vitals + next/typescript
.prettierrc           — semi, double-quotes, tabWidth 2, trailingComma es5
package.json          — pnpm, Next 15.3.3, React 19, TS 5
```

---

## 2. Decisões técnicas + porquê

| Decisão | Motivo |
|---|---|
| Next.js 15 App Router | Padrão atual da plataforma; SSR/SSG nativos; suporte a React Server Components |
| `output: "standalone"` | Imagem Docker mínima sem node_modules completo |
| TypeScript strict | Erros capturados em tempo de compilação; necessário para demos robustos |
| `src/config/client.ts` como config | Troca de cliente = alterar 1 arquivo de config; sem banco de dados nesta sprint |
| Prettier + ESLint `next/core-web-vitals` | Formatação e lint automáticos alinhados ao padrão Next.js |
| pnpm | Velocidade, deduplicação e lockfile determinístico |
| React 19 | Versão peer requerida pelo Next 15.3.3 |

---

## 3. Estado atual

- `pnpm build` **verde** (4/4 páginas estáticas geradas)
- `next lint` **zero warnings/errors**
- TypeScript em modo strict sem erros
- Página inicial renderiza dados do `clientConfig` (nome, tagline, serviços, CTA)
- Sem banco de dados, sem autenticação, sem estilos além do HTML bare-bones
- `primaryColor` e `accentColor` estão no config mas ainda não consumidos por nenhum componente (intencionalmente — aguardam camada de estilo)

---

## 4. Pendências

- Aplicar `primaryColor`/`accentColor` do config no CSS (Tailwind ou CSS Modules)
- Criar componentes de UI reais (Header, Hero, ServiceCard, Footer)
- Adicionar formulário de agendamento (pode ser estático/mock neste estágio)
- Configurar `eslint.config.mjs` flat config se necessário para Next 15 (`.eslintrc.json` funciona hoje)
- Não há `.env` nem banco de dados; se Squad B introduzir Prisma, seguir singleton pattern

---

## 5. Gotchas

### NODE_ENV não-padrão no runner
O ambiente de execução (AgentStudio) seta `NODE_ENV` para um valor não reconhecido pelo Next.js.  
`next build` usa o runtime de desenvolvimento quando `NODE_ENV` não é `"production"`, causando falha de pré-renderização.  
**Fix:** rodar o build explicitamente com `NODE_ENV=production next build` (ou via `cross-env` no Windows).  
Em deploys reais (Vercel, Docker, CI) isso não acontece porque `NODE_ENV=production` é padrão.

### pnpm e symlinks/junctions no OneDrive
`node_modules` usa junctions do Windows. Se a pasta for deletada e recriada em path com espaços (OneDrive), na primeira execução de `pnpm install` os junctions podem apontar para alvos vazios.  
**Fix:** deletar `node_modules` e rodar `pnpm install` novamente — os arquivos são relinked do store global (`%LOCALAPPDATA%\pnpm\store`).

### `not-found.tsx` obrigatório no App Router
Sem esse arquivo, o Next.js 15 faz fallback para o runtime Pages Router ao pré-renderizar `/404`, gerando `<Html> should not be imported outside of pages/_document`.  
**Fix:** manter `src/app/not-found.tsx` no repo.

### `packageManager` no package.json
O campo `"packageManager": "pnpm@9.0.0"` está defasado — pnpm atual é 10.x.  
Não causa falhas mas pode gerar warnings em CI com Corepack ativado.

---

## 6. Como rodar/testar

```bash
# Instalar dependências (pnpm)
pnpm install

# Servidor de desenvolvimento
pnpm dev
# → http://localhost:3000

# Build de produção (forçar NODE_ENV em ambientes com valor não-padrão)
NODE_ENV=production pnpm build

# Servir build de produção
pnpm start

# Lint
pnpm lint
```

Para trocar de cliente: editar `src/config/client.ts` — alterar `clinicName`, `tagline`, `services`, `copy`, `primaryColor`, `accentColor`.

---

## 7. Próximos passos para a Squad B

1. **Estilização:** aplicar `primaryColor`/`accentColor` do config. Recomendar Tailwind CSS com CSS custom properties para facilitar swap de tema.
2. **Componentes:** extrair `Header`, `Hero`, `ServiceList`, `ServiceCard`, `Footer` para `src/components/`.
3. **Multi-cliente:** considerar mover o config para `src/config/clients/[slug].ts` e selecionar via env var `CLIENT_SLUG` — possibilita builds por cliente sem alterar código.
4. **Formulário de agendamento:** pode ser estático (mailto ou form simulado) nesta fase.
5. **Deploy:** o `output: standalone` já está configurado. Criar `Dockerfile` ou apontar para Vercel.
6. **Banco de dados (se necessário):** usar Prisma com singleton conforme convenção do projeto (`src/lib/prisma.ts`).
