# Hand-off S6 — Blog: cadência diária (artigo 21+)

**Data:** 2026-07-12 · Início da tarefa recorrente diária do ROI Hub ("Publicar 1 artigo novo no blog").

## O que foi feito

- **Artigo 21** — `agencia-ou-freelancer-site-clinica-de-estetica` (fundo de funil, categoria "Site & Captação"): comparativo de fornecedor (agência × freelancer × fábrica × "sobrinho"), tabela, 7 perguntas de contrato, teste de portfólio, 10 FAQs. Cross-links para quanto-custa, wix-ou-profissional, briefing, quanto-tempo-leva, erros.
- **Teste permanente** `src/__tests__/blog-data.test.ts` — valida todo post: slug único, 8–12 FAQs, `relatedSlugs` resolvem, links internos com prefixo `/blog/` apontando para slug existente (e links não-blog restritos às rotas reais do site). 22/22 verde.

## Decisões

- **Tema escolhido por lacuna, não por volume bruto:** o plano 20/20 do S5 cobriu preço/DIY/prazo/briefing, mas não "qual fornecedor contratar" — decision-stage, alta intenção comercial, zero canibalização com os 20 e com o Doc-CRM (segue a fronteira: Estetia = fora da clínica; gestão interna = estetiacrm.com.br).
- **Desvantagem da própria oferta declarada no texto** (fábrica não serve para site fora do padrão) — credibilidade > pitch; o artigo fecha com as mesmas 7 perguntas apontadas para nós.

## Verificação

- `vitest run src/__tests__/blog-data.test.ts` → 22/22. Rodado com config isolada (`environment: node`) porque o setup padrão (jsdom + jest-dom) está quebrado pelo pnpm store corrompido **desta máquina** — em Docker/CI `pnpm test` roda normal.
- `tsc` local segue inútil aqui (`next` sem tipos, mesmo gotcha). Build real = Docker do EasyPanel, como sempre.

## Fila sugerida para os próximos dias (fundo → meio)

1. Domínio, hospedagem e e-mail profissional: o que a clínica precisa contratar (fundo)
2. Antes/depois no site e as regras de publicidade em saúde (meio, dor real)
3. Site lento / velocidade: quanto custa em paciente perdida (meio)
4. SEO local: bairro + procedimento (meio, checar canibalização com "como aparecer no Google")

## Gotchas

- Links internos em `content` SEMPRE com `/blog/` — o teste agora falha se esquecer.
- FAQs: 8–12 (o teste trava fora da faixa; o campo alimenta o FAQPage JSON-LD).
- Índice: novo post precisa de import + entrada no array em `src/lib/blog/index.ts` (sitemap e SSG derivam dele).
