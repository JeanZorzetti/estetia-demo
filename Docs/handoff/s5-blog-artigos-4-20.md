# Hand-off S5 — Blog: artigos 4–20 (plano de conteúdo 20/20 completo)

**Data:** 2026-07-12 · **Commits:** `8fb8861` (fundo 4–9 + fix links), `7a93319` (meio 10–17), `934825e` (topo 18–20)

## O que foi feito

- **17 artigos novos** em `src/lib/blog/posts/` (padrão dos 3 existentes: BlogPost .ts tipado, 8–10 FAQs por post, callouts, tabela, CTA → `/#orcamento`, cross-links internos). Blog foi de 3 → **20 artigos** (177 FAQs no total).
- **Fundo de funil (4–9):** agendamento online, landing page vs site, Wix vs profissional, quanto tempo leva, briefing, quando refazer.
- **Meio (10–17):** como aparecer no Google, Perfil da Empresa no Google, Instagram vs site, fotos, textos, botão WhatsApp, avaliações Google, 10 erros de site.
- **Topo (18–20):** como atrair pacientes (5 canais), marketing digital realista, presença online (ecossistema 4 peças).
- **Bugfix de passagem:** os 3 posts originais tinham links internos SEM o prefixo `/blog/` (6 links → 404). Corrigidos.

## Decisões e porquês

- **Pauta reconstruída** — o plan file original dos 20 artigos não existe mais; a razão 9 fundo/8 meio/3 topo veio da memória do projeto e os temas foram derivados da estratégia (`Docs/estrategia-comercializacao.md`, funil A: SEO → DONO de clínica).
- **Fronteira de keywords respeitada (anti-canibalização com o Doc-CRM):** Estetia = FORA da clínica (site/captação/marketing/Google); gestão interna/no-show/prontuário = estetiacrm.com.br. Cross-links para o CRM onde o assunto encosta (ex.: agendamento nível 3, no-show no post de preço).
- **Datas:** todos os 17 com `date: 2026-07-12` (data real de publicação; sem escalonamento fake).
- **`image`:** todos usam `/demo-aurora.jpg` (única imagem em `public/`). Melhoria futura: imagem própria por artigo (og:image diferenciado).
- **Sem menção a tráfego pago como recomendação** — artigos 19/20 tratam mídia paga como opcional e só pós-fundação (alinhado à tese orgânica; e publicidade em saúde tratada com cuidado em todos).

## Estado atual / verificação

- `tsc --noEmit`: zero erros nos arquivos do blog (erros pré-existentes no `BookingForm.test.tsx` — globals do vitest, já existiam antes e não afetam o build de prod).
- **Build local IMPOSSÍVEL nesta máquina** (gotcha conhecido: pnpm store global corrompido → `next/dist/compiled/jest-worker/processChild.js` MODULE_NOT_FOUND). O build real é o Docker do EasyPanel, como sempre.
- **Validação de dados executada** (script em scratchpad): 20 posts, slugs únicos, ≥8 FAQs cada, todos os `relatedSlugs` e links internos `/blog/*` resolvem, datas corretas.
- sitemap.ts e generateStaticParams derivam de `blogPosts` — os 17 novos entram automaticamente no sitemap e no SSG.

## Pendências / próximos passos

1. **Verificar em prod pós-deploy:** `/blog` lista 20 cards; abrir 2–3 slugs novos; conferir JSON-LD (Article + FAQPage) no view-source.
2. **GSC:** submeter/atualizar sitemap da propriedade `sc-domain:estetia.estetiacrm.com.br` e pedir indexação dos artigos de fundo (prioridade).
3. **Cadência daily:** a agenda do ROI Hub agora tem tarefa recorrente diária "publicar 1 artigo" por projeto — para a fabrica, os próximos artigos devem seguir a fronteira de keywords e o padrão deste sprint.
4. Imagem própria por artigo (og:image) — melhoria, não bloqueador.

## Gotchas para o próximo

- Não tentar `pnpm build` local; ver seção verificação. `tsc` roda ok via `node_modules\.bin\tsc.cmd`.
- Links internos em `content` SEMPRE com prefixo `/blog/` (posts são servidos em `/blog/[slug]`).
- FAQs: 8–12 por post (o campo alimenta o FAQPage JSON-LD da página).
