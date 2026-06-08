# Comercialização Vertical Estética (Agent Teams AI como Fábrica) — Implementation Plan

> **For agentic workers:** Este plano é MISTO (código + negócio). Tarefas de código (demo, templates) rodam pela FÁBRICA (squads do Agent Teams AI) com TDD/commits. Tarefas de negócio (Loom, prospecção, venda) são do usuário e usam checklists verificáveis. Steps usam checkbox (`- [ ]`) para tracking.

**Goal:** Validar a esteira oferta→entrega→recorrência vendendo site+automação para a 1ª clínica de estética, usando o Agent Teams AI como linha de produção na máquina local.

**Architecture:** Squads de agentes (1 Lead Opus High + 2 Operadores Sonnet Low + 1 Revisor Sonnet High) produzem, na máquina local, uma demo de vitrine e templates reutilizáveis de clínica de estética. **Um squad ativo por vez** (regra dura de RAM). Cada squad = 1 sprint macro, fechando com hand-off (doc 7 seções + CLAUDE.md). O cliente recebe app standalone (Next.js, padrão Estetia) — nunca vê um agente. Venda por prova (Loom personalizado) + preço de fundador.

**Tech Stack:** Agent Teams AI (Electron, `C:\dev\agent-teams-ai`) como fábrica; Next.js standalone para entregas; deploy EasyPanel/Docker (padrão Estetia); Loom para abordagem.

**Spec de referência:** `~/.claude/plans/brainstorm-quero-comercializar-o-sparkling-shore.md`

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

- [ ] **Step 1: Liberar RAM e matar órfãos**

```powershell
Get-Process electron -ErrorAction SilentlyContinue | Stop-Process -Force
```
Expected: nenhum electron órfão; RAM livre.

- [ ] **Step 2: Subir o app (comando da memória)**

```powershell
fnm use 24
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
Remove-Item Env:ELECTRON_SKIP_BINARY_DOWNLOAD -ErrorAction SilentlyContinue
$env:NODE_OPTIONS="--max-old-space-size=4096"
cd C:\dev\agent-teams-ai; pnpm dev
```
Expected: app abre sem crash do auto-updater. Settings detecta runtime Claude.

- [ ] **Step 3: Criar os 3 squads (desligados)**

Montar Squad A, B, C, cada um com: 1 Lead Opus 4.8 High + 2 Operadores Sonnet 4.6 Low + 1 Revisor Sonnet 4.6 High. Conferir patch de modelo novo (opus-4-8 launchable) em `TeamProvisioningService.ts`.
Expected: 3 squads existem no config, NENHUM ligado ainda.

- [ ] **Step 4: Checkpoint**

Documentar em `docs/sales/fabrica-status.md`: fábrica operacional, 3 squads criados, regra "1 ativo por vez". Sem commit de código (app é de terceiro).

---

## Task 2 (Squad A / S1): Decidir base + esqueleto do repo

**Liga Squad A. Files (output):** `docs/handoff/s1-base.md`, `CLAUDE.md` inicial do repo, esqueleto do projeto.

- [ ] **Step 1: Tarefa pro Lead — avaliar base**

"Avaliar fork do Estetia CRM (`Doc-CRM`) vs template Next.js standalone enxuto, como base de DEMO de vitrine para clínica de estética. Critérios: peso, tempo de adaptação, reusabilidade entre clientes, facilidade de parametrizar. Entregar recomendação + justificativa. Depois montar o esqueleto do repo escolhido."

- [ ] **Step 2: Revisor valida**

Revisor (Sonnet High) confere recomendação + esqueleto. Decisão final é do usuário (aprovar/re-avaliar).
Expected: 1 recomendação clara com trade-offs + esqueleto buildável.

- [ ] **Step 3: Build gate do esqueleto**

Run: `pnpm build`
Expected: esqueleto compila (vazio mas verde).

- [ ] **Step 4: Hand-off S1 + desligar Squad A**

Revisor produz `docs/handoff/s1-base.md` (7 seções) + escreve `CLAUDE.md` inicial. Commit. **Desligar Squad A** antes de seguir.

```bash
git add . && git commit -m "chore: esqueleto do repo da fabrica estetica + decisao de base (S1)"
```

---

## Task 3 (Squad B / S2): Demo de clínica fictícia

**Desliga A primeiro. Liga Squad B. Files:**
- Create: `app/page.tsx`, `app/agendar/page.tsx`
- Test: `tests/demo/conversion-page.test.ts`

- [ ] **Step 1: Squad B lê hand-off S1**

Lead lê `docs/handoff/s1-base.md` + `CLAUDE.md`. Arranca com contexto, sem reconstruir.

- [ ] **Step 2: Tarefa pro Lead — escopo da demo**

"Construir DEMO de clínica de estética fictícia ('Clínica Aurora'). Entregáveis: (1) home institucional, (2) LP de conversão com CTA de agendamento, (3) agendamento funcional (mock OK), (4) visual premium (sem AI-slop — seguir `feedback_no_lazy_features`). Build verde obrigatório."

- [ ] **Step 3: Test (Operador escreve) — LP tem CTA**

```typescript
import { render, screen } from '@testing-library/react'
import AgendarPage from '@/app/agendar/page'

test('LP de conversão mostra CTA de agendamento', () => {
  render(<AgendarPage />)
  expect(screen.getByRole('button', { name: /agendar/i })).toBeInTheDocument()
})
```

- [ ] **Step 4: Verificar falha (red)**

Run: `pnpm test tests/demo/conversion-page.test.ts`
Expected: FAIL (página não existe).

- [ ] **Step 5: Operadores implementam até verde (1 task = 1 verde)**

Run: `pnpm test tests/demo/conversion-page.test.ts`
Expected: PASS.

- [ ] **Step 6: Build gate**

Run: `pnpm build`
Expected: build standalone OK (conferir async params Next 16, Prisma singleton se aplicável).

- [ ] **Step 7: Hand-off S2 + desligar Squad B**

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

- [ ] **Step 1: Squad C lê hand-off S2**

Lead lê `docs/handoff/s2-vitrine.md` + `CLAUDE.md`.

- [ ] **Step 2: Tarefa pro Lead — lembrete/follow-up**

"Implementar fluxo de lembrete (24h e 2h antes) + follow-up pós-consulta. Mock de canal (WhatsApp/SMS/email) OK. Objetivo: DEMONSTRAR redução de no-show no Loom de venda."

- [ ] **Step 3: Test — agenda 2 lembretes**

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

- [ ] **Step 4: Verificar falha (red)**

Run: `pnpm test tests/automation/no-show-reminder.test.ts`
Expected: FAIL.

- [ ] **Step 5: Operadores implementam até verde**

Run: `pnpm test tests/automation/no-show-reminder.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/automation/ tests/automation/
git commit -m "feat: automacao de lembrete 24h/2h para reduzir no-show"
```

---

## Task 5 (Squad C / S3): Deploy da demo

**Mesmo Squad C. Files:** `Dockerfile` / config EasyPanel (padrão Estetia).

- [ ] **Step 1: Configurar deploy standalone**

`output: standalone`, `ENV HOSTNAME=0.0.0.0` no Dockerfile (senão proxy não alcança), `.gitattributes eol=lf`.

- [ ] **Step 2: Deploy no EasyPanel**

Auto-deploy via GitHub (branch main). Subdomínio `demo-aurora.roilabs.com.br`.
Expected: demo acessível por URL pública.

- [ ] **Step 3: Verificar live**

Abrir URL no browser: home carrega, LP converte (CTA), agendamento responde, sem erro de console.
Expected: navegável end-to-end por um estranho.

- [ ] **Step 4: Hand-off S3 (final) + desligar Squad C**

Revisor: `docs/handoff/s3-automacao.md` (7 seções, inclui URL da demo + gotchas de deploy) + atualiza `CLAUDE.md`. Registrar URL em `docs/sales/fabrica-status.md`. Commit. **Desligar Squad C.**

```bash
git add . && git commit -m "feat: deploy standalone da demo + handoff S3"
```

---

## Task 6: Oferta produtizada (NEGÓCIO — usuário)

**Files:** `docs/sales/oferta.md`

- [ ] **Step 1: Oferta de entrada**

"Site + Landing de alta conversão pra sua clínica" — escopo fixo, ~1 semana, R$3k-6k (fundador: metade nas 2 primeiras). Listar exatamente o que inclui.

- [ ] **Step 2: Upsell recorrente**

"Automação de agendamento + follow-up" — R$500-1.500/mês. Pitch: no-show -20-30% = R$16-24k/mês recuperados (clínica 80 consultas). Vender ROI, não horas.

- [ ] **Step 3: Garantia/risco baixo**

Escolher: preço de fundador OU garantia "não gostou, não paga". Documentar.

---

## Task 7: Lista de clínicas-alvo (NEGÓCIO — usuário)

**Files:** `docs/sales/clinicas-alvo.md`

- [ ] **Step 1: Levantar 10 clínicas reais**

Critério: estética/dermato local, site fraco OU sem agendamento online OU só DM no Instagram. Anotar: nome, site atual, problema visível, contato.

- [ ] **Step 2: Priorizar por "dor visível"**

Ordenar pelas de problema mais óbvio. Top 5 marcadas prioridade.

---

## Task 8: Roteiro + gravação dos Loom (NEGÓCIO — usuário)

**Files:** `docs/sales/roteiro-loom.md`

- [ ] **Step 1: Roteiro ~3 min**

(a) "Oi [nome], vi o site da [clínica] e notei [problema]" → (b) demo resolvendo → (c) ROI ("recupera ~R$X/mês em no-show") → (d) CTA suave ("topa 15 min?").

- [ ] **Step 2: Testar com 1 pessoa de fora**

Gravar 1 Loom de teste. Pergunta: "ficou claro o valor em 3 min?" Ajustar se não.

- [ ] **Step 3: Gravar os 10 Loom personalizados**

Um por clínica (Task 7), apontando o problema específico daquela + demo.

---

## Task 9: Abordagem e fechamento (NEGÓCIO — validação de mercado)

**Files:** `docs/sales/pipeline.md`

- [ ] **Step 1: Enviar os 10 Loom**

DM Instagram / email / WhatsApp. Registrar data de envio. Expected: 10 enviados.

- [ ] **Step 2: Acompanhar respostas (meta ≥1)**

Pipeline: visto/respondeu/agendou. Follow-up após 3-4 dias. Expected D+30: ≥1 interessada.

- [ ] **Step 3: Fechar 1ª venda (preço de fundador)**

Call → fechar site. Expected D+60: 1º contrato.

- [ ] **Step 4: Entregar e fazer upsell**

Fábrica entrega o site real (novo ciclo de squads). Após prova de valor, oferecer retainer. Expected D+90: 1º retainer ativo + case em `docs/sales/cases.md`.

---

## Self-Review (cobertura do spec)

- **Modelo de negócio** → Tasks 1, 2, 5. ✓
- **Vertical estética** → todo o plano. ✓
- **Arquitetura de squads (1 ativo/vez, 4 membros, hand-off)** → seção dedicada + Tasks 2, 3, 4. ✓
- **Oferta produtizada** → Task 6. ✓
- **Aquisição 1º cliente** → Tasks 3, 7, 8, 9. ✓
- **Fábrica invisível** → Tasks 1-5. ✓
- **Precificação** → Task 6. ✓
- **Métricas D+30/60/90** → Task 9. ✓
- **Roadmap expansão** → Fase 1 do spec; replicar com outros templates depois. ✓

Sem placeholders de código. Tipos consistentes (`scheduleReminders`/`offsetHours` únicos). Regra de RAM (1 squad/vez) reforçada em todas as tasks de squad.
