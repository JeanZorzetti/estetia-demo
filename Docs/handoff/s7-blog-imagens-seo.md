# Hand-off S7 — Blog: capa própria por artigo + infra de SEO de imagem

**Data:** 2026-07-13 · Tarefa do ROI Hub: "Trocar a imagem única dos 21 artigos por imagens de banco correlatas + infra de SEO de alt/og:image".

## O que foi feito

- **21 capas próprias** em `public/blog/<slug>.jpg` — uma foto correlata ao tema de cada artigo (calculadora p/ preço, cronômetro p/ prazo, mapa p/ Google Perfil da Empresa, blocos de montar p/ Wix, monitor quebrado p/ "quando refazer" etc.). Antes: os 21 apontavam para `/demo-aurora.jpg` (o print da demo Aurora, que continua sendo usado só na home).
- **`imageAlt` virou obrigatório** (`src/lib/blog/types.ts`) — era opcional; agora todo post futuro é obrigado a descrever a foto. Os alts descrevem **a imagem**, não o artigo (regra de acessibilidade e de image SEO).
- **og:image completo** nos posts e em `/blog`: `url` absoluta + `width`/`height` (1200×630) + `alt`, mais `twitter: summary_large_image`. Sem `width/height` o Facebook/LinkedIn às vezes ignora o card.
- **`metadataBase`** no `layout.tsx` (raiz) — mata o warning do Next e resolve OG relativa em qualquer página.
- **`<img>` com `width`/`height`** (1200×630) nas duas páginas do blog → zero CLS; hero com `fetchPriority="high"` (é o LCP), cards com `loading="lazy" decoding="async"`.
- **Sitemap de imagens**: cada URL de post agora leva `images: [capa]` (`src/app/sitemap.ts`) — habilita indexação no Google Imagens.
- **Constantes `COVER_WIDTH`/`COVER_HEIGHT`** exportadas de `@/lib/blog` — uma única fonte para og, `<img>` e o download das próximas capas.

## Decisões

- **Fonte: Unsplash, self-hospedado.** Baixadas com `?fm=jpg&q=70&w=1200&h=630&fit=crop&crop=entropy` → 41–138 KB cada (~1,8 MB no total). Self-host em vez de hotlink: sem dependência de terceiro no LCP e sem `remotePatterns` no `next.config`.
- **Só fotos da Unsplash License (gratuitas).** ⚠️ A busca devolve muito `plus.unsplash.com/premium_photo-*` = **Unsplash+ (assinatura paga)** — 9 das minhas primeiras escolhas caíram nisso e foram descartadas. Regra para as próximas: **só usar URL que comece com `images.unsplash.com/photo-`.**
- **Crops conferidos no olho** (contact-sheet 3×7 renderizado no browser): 2 dos 21 crops de entropia ficaram sem sentido (um virou impressora bege, outro pegou um sofá) e foram trocados. Não confie no `alt_description` da API — ele descreve a foto original, não o crop.
- **Ironia assumida:** o artigo `erros-site` lista "só fotos de banco de imagem" como erro. Ali o alvo é o site **da clínica** (precisa de foto real do espaço/equipe); o blog B2B da Estetia é outro contexto. Não muda a recomendação do artigo.

## Verificação

- `pnpm test:blog` → **23/23 verde** (novo script + `vitest.blog.config.ts`, config isolada em `environment: node`; a config padrão continua quebrada nesta máquina pelo pnpm store corrompido — em Docker/CI `pnpm test` roda normal).
  Novas asserções permanentes: capa única por post (nenhuma imagem repetida), `image` casa `^/blog/.+\.jpg$` **e existe no disco**, `imageAlt` com >20 chars.
- `tsc` local segue inútil (`next` sem tipos → TS2307 em cascata; os 20 `TS18048` de `[slug]/page.tsx` já existiam antes desta mudança — conferido com `git stash`).
- `next dev`/`next build` **não sobem nesta máquina** (MODULE_NOT_FOUND, pnpm store). Build real = Docker do EasyPanel via push.

## Pendências

- **Conferir em prod** (auto-deploy por push): `/blog` com 21 capas distintas e um post com `og:image` correto (validar em https://cards-dev.twitter.com/validator ou no debugger do LinkedIn).
- Indexação: sitemap de imagens novo → vale um "Solicitar indexação" no GSC depois do deploy.
- Capa dos próximos artigos da cadência diária: baixar do Unsplash no mesmo formato (1200×630) e salvar em `public/blog/<slug>.jpg` — o teste falha se esquecer.
