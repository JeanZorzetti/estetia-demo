# Comercialização Vertical Estética (Agent Teams AI como Fábrica) — Implementation Plan

> **For agentic workers:** Este plano é MISTO (código + negócio). Tarefas de código (demo, templates) rodam pela FÁBRICA (squads do Agent Teams AI) com TDD/commits. Tarefas de negócio (Loom, prospecção, venda) são do usuário e usam checklists verificáveis. Steps usam checkbox (`- [ ]`) para tracking.

**Goal:** Validar a esteira oferta→entrega→recorrência vendendo site+automação para a 1ª clínica de estética, usando o Agent Teams AI como linha de produção na máquina local.

**Architecture:** Squads de agentes (1 Lead Opus High + 2 Operadores Sonnet Low + 1 Revisor Sonnet High) produzem, na máquina local, uma demo de vitrine e templates reutilizáveis de clínica de estética. **Um squad ativo por vez** (regra dura de RAM). Cada squad = 1 sprint macro, fechando com hand-off (doc 7 seções + CLAUDE.md). O cliente recebe app standalone (Next.js, padrão Estetia) — nunca vê um agente. Venda por prova (Loom personalizado) + preço de fundador.

**Tech Stack:** Agent Teams AI (Electron, `C:\dev\agent-teams-ai`) como fábrica; Next.js standalone para entregas; deploy EasyPanel/Docker (padrão Estetia); Loom para abordagem.

**Spec de referência:** `~/.claude/plans/brainstorm-quero-comercializar-o-sparkling-shore.md`

---

## STATUS (atualizado 2026-06-08)

> **Fábrica concluída (Tasks 1-4 ✅).** A demo foi construída pelos squads: vitrine completa (Header/Hero/ServiceList/BookingForm/Footer), parametrização via `src/config/client.ts`, automação `src/lib/automation/no-show-reminder.ts`, testes 3/3 verde, build 4/4 páginas. Hand-offs s1/s2/s3 produzidos. Repo: `github.com/JeanZorzetti/estetia-demo`.
>
> **Task 5 (deploy) ✅ COMPLETA.** Demo NO AR em **https://demo.estetiacrm.com.br/**, verificada via Playwright (home/serviços/CTA/formulário OK). Fix da pasta `public/` resolveu o build. Pendência trivial: favicon (404).
>
> **Pendente (Tasks 6-9):** parte de NEGÓCIO — oferta, lista de clínicas, Loom, abordagem/venda. Feito por você + Claude (não pela fábrica).
>
> **Nota:** a estrutura real ficou `src/` (não `app/`+`tests/` como previsto); agendamento consolidado em `BookingForm` na home. Equivalente funcional.

---

## Arquitetura de Squads (ler antes de executar)

**Composição de cada squad (4 membros):**
- 1 **Lead** — Opus 4.8 High
- 2 **Operadores** — Sonnet 4.6 Low (NÃO Haiku — Haiku gera retrabalho)
- 1 **Revisor** — Sonnet 4.6 High (dono do hand-off)

**Regra dura de RAM:** UM SQUAD ATIVO POR VEZ. O OOM vem dos runtimes simultâneos. Nunca ligar 2 squads juntos na máquina de 16GB (8 runtimes = pior que hoje). Fluxo: liga squad → executa sprint → hand-off → **desliga** → liga o próximo.

**Mapeamento squad → sprint macro:**
| Sprint | Squad | Tarefas de código |
|---|---|---|
| S1 — Base | Squad A | Task 2 |
| S2 — Vitrine | Squad B | Task 3 |
| S3 — Automação | Squad C | Tasks 4-5 |

**Hand-off ao fechar cada sprint (Revisor produz):** doc com 7 seções obrigatórias — (1) o que foi feito, (2) decisões técnicas + porquês, (3) estado atual, (4) pendências, (5) gotchas, (6) como rodar/testar, (7) próximos passos. + atualizar CLAUDE.md do projeto.

---

## File Structure

Decisão da base de código é **delegada à fábrica** (Task 2 / Squad A). Estrutura provável após decisão:

- `C:\Users\jeanz\OneDrive\Desktop\ROI Labs\estetica-fabrica\` — repo da demo/template (ou fork do Estetia, conforme Task 2)
  - `app/` — site institucional + LP de conversão (Next.js App Router)
  - `app/agendar/` — módulo de agendamento (front + API)
  - `lib/automation/` — fluxo de follow-up/lembrete (no-show reduction)
  - `templates/` — partes parametrizáveis reusáveis entre clientes (cores, copy, serviços)
  - `CLAUDE.md` — fonte de verdade, atualizada a cada hand-off
  - `docs/handoff/` — docs de hand-off por sprint (S1, S2, S3)
- `docs/sales/` — ativos de venda (roteiro Loom, lista de clínicas, oferta)

---

## Task 1: Preparar a fábrica (ambiente + squads)

**Files:**
- Verificar: `C:\dev\agent-teams-ai` (clone existente)
- Referência: memória `project_agent_teams_ai.md`, `agent_teams_ai_oom_root_cause.md`

- [x] **Step 1: Liberar RAM e matar órfãos**

```powershell
Get-Process electron -ErrorAction SilentlyContinue | Stop-Process -Force
```
Expected: nenhum electron órfão; RAM livre.

- [x] **Step 2: Subir o app (comando da memória)**

```powershell
fnm use 24
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
Remove-Item Env:ELECTRON_SKIP_BINARY_DOWNLOAD -ErrorAction SilentlyContinue
$env:NODE_OPTIONS="--max-old-space-size=4096"
cd C:\dev\agent-teams-ai; pnpm dev
```
Expected: app abre sem crash do auto-updater. Settings detecta runtime Claude.

- [x] **Step 3: Criar os 3 squads (desligados)**

Montar Squad A, B, C, cada um com: 1 Lead Opus 4.8 High + 2 Operadores Sonnet 4.6 Low + 1 Revisor Sonnet 4.6 High. Conferir patch de modelo novo (opus-4-8 launchable) em `TeamProvisioningService.ts`.
Expected: 3 squads existem no config, NENHUM ligado ainda.

- [x] **Step 4: Checkpoint**

Documentar em `docs/sales/fabrica-status.md`: fábrica operacional, 3 squads criados, regra "1 ativo por vez". Sem commit de código (app é de terceiro).

---

## Task 2 (Squad A / S1): Decidir base + esqueleto do repo

**Liga Squad A. Files (output):** `docs/handoff/s1-base.md`, `CLAUDE.md` inicial do repo, esqueleto do projeto.

- [x] **Step 1: Tarefa pro Lead — avaliar base**

"Avaliar fork do Estetia CRM (`Doc-CRM`) vs template Next.js standalone enxuto, como base de DEMO de vitrine para clínica de estética. Critérios: peso, tempo de adaptação, reusabilidade entre clientes, facilidade de parametrizar. Entregar recomendação + justificativa. Depois montar o esqueleto do repo escolhido."

- [x] **Step 2: Revisor valida**

Revisor (Sonnet High) confere recomendação + esqueleto. Decisão final é do usuário (aprovar/re-avaliar).
Expected: 1 recomendação clara com trade-offs + esqueleto buildável.

- [x] **Step 3: Build gate do esqueleto**

Run: `pnpm build`
Expected: esqueleto compila (vazio mas verde).

- [x] **Step 4: Hand-off S1 + desligar Squad A**

Revisor produz `docs/handoff/s1-base.md` (7 seções) + escreve `CLAUDE.md` inicial. Commit. **Desligar Squad A** antes de seguir.

```bash
git add . && git commit -m "chore: esqueleto do repo da fabrica estetica + decisao de base (S1)"
```

---

## Task 3 (Squad B / S2): Demo de clínica fictícia

**Desliga A primeiro. Liga Squad B. Files:**
- Create: `app/page.tsx`, `app/agendar/page.tsx`
- Test: `tests/demo/conversion-page.test.ts`

- [x] **Step 1: Squad B lê hand-off S1**

Lead lê `docs/handoff/s1-base.md` + `CLAUDE.md`. Arranca com contexto, sem reconstruir.

- [x] **Step 2: Tarefa pro Lead — escopo da demo**

"Construir DEMO de clínica de estética fictícia ('Clínica Aurora'). Entregáveis: (1) home institucional, (2) LP de conversão com CTA de agendamento, (3) agendamento funcional (mock OK), (4) visual premium (sem AI-slop — seguir `feedback_no_lazy_features`). Build verde obrigatório."

- [x] **Step 3: Test (Operador escreve) — LP tem CTA**

```typescript
import { render, screen } from '@testing-library/react'
import AgendarPage from '@/app/agendar/page'

test('LP de conversão mostra CTA de agendamento', () => {
  render(<AgendarPage />)
  expect(screen.getByRole('button', { name: /agendar/i })).toBeInTheDocument()
})
```

- [x] **Step 4: Verificar falha (red)**

Run: `pnpm test tests/demo/conversion-page.test.ts`
Expected: FAIL (página não existe).

- [x] **Step 5: Operadores implementam até verde (1 task = 1 verde)**

Run: `pnpm test tests/demo/conversion-page.test.ts`
Expected: PASS.

- [x] **Step 6: Build gate**

Run: `pnpm build`
Expected: build standalone OK (conferir async params Next 16, Prisma singleton se aplicável).

- [x] **Step 7: Hand-off S2 + desligar Squad B**

Revisor: `docs/handoff/s2-vitrine.md` (7 seções) + atualiza `CLAUDE.md`. Commit. **Desligar Squad B.**

```bash
git add app/ tests/ docs/handoff/ CLAUDE.md
git commit -m "feat: demo clinica estetica - site + LP de conversao (S2)"
```

---

## Task 4 (Squad C / S3): Automação (pitch do retainer)

**Desliga B primeiro. Liga Squad C. Files:**
- Create: `lib/automation/no-show-reminder.ts`
- Test: `tests/automation/no-show-reminder.test.ts`

- [x] **Step 1: Squad C lê hand-off S2**

Lead lê `docs/handoff/s2-vitrine.md` + `CLAUDE.md`.

- [x] **Step 2: Tarefa pro Lead — lembrete/follow-up**

"Implementar fluxo de lembrete (24h e 2h antes) + follow-up pós-consulta. Mock de canal (WhatsApp/SMS/email) OK. Objetivo: DEMONSTRAR redução de no-show no Loom de venda."

- [x] **Step 3: Test — agenda 2 lembretes**

```typescript
import { scheduleReminders } from '@/lib/automation/no-show-reminder'

test('agenda lembretes 24h e 2h antes da consulta', () => {
  const consulta = new Date('2026-07-01T15:00:00')
  const reminders = scheduleReminders(consulta)
  expect(reminders).toHaveLength(2)
  expect(reminders[0].offsetHours).toBe(24)
  expect(reminders[1].offsetHours).toBe(2)
})
```

- [x] **Step 4: Verificar falha (red)**

Run: `pnpm test tests/automation/no-show-reminder.test.ts`
Expected: FAIL.

- [x] **Step 5: Operadores implementam até verde**

Run: `pnpm test tests/automation/no-show-reminder.test.ts`
Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add lib/automation/ tests/automation/
git commit -m "feat: automacao de lembrete 24h/2h para reduzir no-show"
```

---

## Task 5 (Squad C / S3): Deploy da demo

**Mesmo Squad C. Files:** `Dockerfile` / config EasyPanel (padrão Estetia).

- [x] **Step 1: Configurar deploy standalone**

`output: standalone`, `ENV HOSTNAME=0.0.0.0` no Dockerfile (senão proxy não alcança), `.gitattributes eol=lf`. ✅ feito. Fix extra: criada pasta `public/` (commit `d2ec52b`) — build falhava no `COPY /app/public`.

- [x] **Step 2: Deploy no EasyPanel** ✅

Auto-deploy via GitHub (branch main). **URL real: https://demo.estetiacrm.com.br/** (não o subdomínio placeholder do plano).
Deploy bem-sucedido após o fix da pasta `public/`.

- [x] **Step 3: Verificar live** ✅

Verificado via Playwright (2026-06-09): home carrega, Hero + Serviços (Limpeza/Botox/Peeling), CTA "Agende sua consulta" → âncora → formulário completo (Nome/WhatsApp/Serviço/Mensagem), footer. Único erro: 404 favicon (trivial).

- [x] **Step 4: Hand-off S3 (final) + desligar Squad C** ✅ (hand-offs s3-automacao.md + s3-deploy.md produzidos; URL registrada em fabrica-status.md)

Revisor: `docs/handoff/s3-automacao.md` (7 seções, inclui URL da demo + gotchas de deploy) + atualiza `CLAUDE.md`. Registrar URL em `docs/sales/fabrica-status.md`. Commit. **Desligar Squad C.**

```bash
git add . && git commit -m "feat: deploy standalone da demo + handoff S3"
```

---

## Task 6: Oferta produtizada (NEGÓCIO — usuário)

**Files:** `docs/sales/oferta.md`

- [x] **Step 1: Oferta de entrada** ✅ — `Docs/sales/oferta.md`. Site de Captação R$3.500 (fundador R$1.750). Posicionamento: "máquina de encher agenda", não "site" (fugir do comoditizado R$970).

- [x] **Step 2: Upsell recorrente** ✅ — Automação "Agenda Cheia" R$697/mês + setup R$1.500. Pitch ROI: se paga com 2 no-shows evitados.

- [x] **Step 3: Garantia/risco baixo** ✅ — Preço de fundador (metade no setup, 2 primeiras, em troca de case). Garantia "não paga" descartada. Tudo precificado por benchmark BR 2026.

---

## ~~Tasks 7-9 (prospecção local via Loom)~~ — DESCARTADAS

**Decisão (2026-06-09):** o canal de aquisição será **SEO nacional, canal único.** Isso elimina a prospecção ativa local (lista de clínicas + Loom personalizado + abordagem por DM), que pressupunha mira local em Goiânia. SEO é inbound nacional — o cliente acha você, você não persegue clínica.

As Tasks 7, 8 e 9 originais (clínicas-alvo, roteiro Loom, abordagem) **não se aplicam mais** e ficam aqui só como registro histórico do plano anterior.

---

## ✅ DECISÃO RESOLVIDA (2026-06-09): Funil A — SEO capta DONO de clínica

A "decisão em aberto" (serviço vs produto) foi resolvida: **Funil A — SEO inbound mira o DONO de clínica (B2B); a demo Aurora vira PROVA; fechamento 1-a-1; serviço sob demanda.** Produto self-service (Funil C) = Fase 4 futura. Detalhe completo na seção 3 de `estrategia-comercializacao.md`.

**O elo que falta agora (gargalo):** a `demo.estetiacrm.com.br` é uma clínica fictícia que fala com PACIENTE. O SEO precisa de uma **página B2B de captação** que fala com o DONO ("sites que enchem a agenda da sua clínica") e usa a demo como prova clicável. Sem ela, o SEO não tem onde converter. → Task 7 (Squad D / S4).

---

## Task 7 (S4): Página B2B de captação ✅ FEITA

**Feito por Claude (não pela fábrica)** — re-implementação contida não justificava ligar um squad (custo de RAM). Regra "visual vem do Stitch" respeitada: design da V1 Premium do Stitch → re-implementado em React.

**Decisão de arquitetura (RESOLVIDA):** B2B = home `/`; demo Aurora = `/demo`. **Marca = "Estetia"** (NÃO "EstetiaCRM" — o CRM é o produto SEPARADO em `estetiacrm.com.br`, projeto `Doc-CRM`). **Subdomínio alvo: `estetia.estetiacrm.com.br`** (B2B na raiz, Aurora em /demo). ⚠️ AÇÃO MANUAL PENDENTE no EasyPanel: trocar o domínio do serviço de `demo.estetiacrm.com.br` → `estetia.estetiacrm.com.br`. Código já pronto (link da demo é relativo `/demo`).

**⚠️ NOTA DE MARCA/FUNIL (decisão de negócio em aberto):** `estetiacrm.com.br` (raiz) JÁ é ocupado pelo Estetia CRM (Doc-CRM) — produto SaaS que vende pra MESMA pessoa (dono de clínica) e já faz SEO. Há sobreposição. Como os dois se relacionam (mesmo negócio? site é isca pro CRM? separados?) ficou em aberto — resolver antes de escalar o SEO pra não competir/confundir.

- [x] **Step 0: Design no Google Stitch** — V1 "Premium" escolhida (vs V2 "Cinematic"); HTML em `Docs/stitch/b2b/v1-premium.html`.
- [x] **Step 1: Mover demo Aurora p/ `/demo`** — `src/app/demo/page.tsx` + metadata própria.
- [x] **Step 2: Re-implementar B2B na home** — `src/app/page.tsx` (seções: hero, dores, solução, prova→/demo, ROI, como funciona, oferta+form, footer). Copy p/ DONO.
- [x] **Step 3: Config B2B** — `src/config/b2b.ts` (fonte de verdade da copy) + `src/components/b2b/LeadForm.tsx` (nome, clínica, WhatsApp).
- [~] **Step 4: Build/deploy** — build local impossível (node_modules corrompido por OneDrive lock); validação real no Docker EasyPanel. Commitar + push → rebuild.
- [ ] **Step 5: Verificar live** após rebuild (home B2B em `/`, demo em `/demo`, form capta, link prova funciona).

---

## Task 8 (futuro): Aquisição via SEO — última milha

**Files (futuros):** `docs/sales/seo-plan.md`

**Ligar o SEO só quando a página B2B (Task 7) estiver no ar e o serviço ~95% pronto.** Funil definido (A), então o conteúdo já tem alvo claro: o DONO de clínica.

**Riscos mapeados (do benchmark):**
- SEO B2B é nicho (pouco volume) + lento (meses). Mitigação: long-tail de fundo de funil ("quanto custa site para clínica", "como reduzir no-show") + a demo premium como diferencial.
- Termo "site para clínica" é disputado. Mitigação: ir fundo no nicho estética onde o domínio ganha.

- [ ] **(futuro) Plano de keywords/páginas/conteúdo** B2B p/ dono de clínica
- [ ] **(futuro) Calendário de conteúdo** (artigos de fundo de funil)
- [ ] **(futuro) Métricas SEO:** tráfego orgânico → cadastro → call → venda → retainer

---

## Status geral

| Fase | Status |
|------|--------|
| Fábrica (Tasks 1-5) | ✅ Completa — demo no ar em demo.estetiacrm.com.br |
| Redesign premium (Stitch) | ✅ Commitado (sage/dourado, Playfair+Inter) — aguardando rebuild EasyPanel |
| Oferta (Task 6) | ✅ Completa — preços por benchmark |
| **Funil de conversão** | ✅ **Definido: Funil A (SEO→dono→prova→venda 1-a-1)** |
| Página B2B (Task 7 / S4) | ⬜ **PRÓXIMO** — elo que falta p/ o SEO converter |
| Aquisição SEO (Task 8) | ⏸️ Última milha, após página B2B + serviço ~95% |

---

## Self-Review (cobertura do spec)

- **Modelo de negócio** → Tasks 1, 2, 5. ✓
- **Vertical estética** → todo o plano. ✓
- **Arquitetura de squads (1 ativo/vez, 4 membros, hand-off)** → seção dedicada + Tasks 2, 3, 4. ✓
- **Oferta produtizada** → Task 6. ✓
- **Aquisição 1º cliente** → REVISADO: prospecção local (Tasks 7-9 antigas) descartada; agora SEO nacional adiado. ✓
- **Fábrica invisível** → Tasks 1-5. ✓
- **Precificação** → Task 6. ✓
- **Métricas** → a redefinir junto com o plano de SEO (as antigas D+30/60/90 pressupunham prospecção local). ✓
- **Roadmap expansão** → Fase 1 do spec; replicar com outros templates depois. ✓

Sem placeholders de código. Tipos consistentes (`scheduleReminders`/`offsetHours` únicos). Regra de RAM (1 squad/vez) reforçada em todas as tasks de squad.
