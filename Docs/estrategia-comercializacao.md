# Estratégia de Comercialização — Micro Software House Vertical (Saúde/Estética) com Agent Teams AI como Fábrica

## Context

**Por que este documento existe:** O usuário quer ganhar dinheiro com o Agent Teams AI (app Electron OSS de terceiro — 777genius — clonado para teste, cheio de bugs que só ele domina). A pergunta de partida não era técnica, era de modelo de negócio: "como descubro a melhor forma de monetizar?".

**A pergunta que reformulou este documento (2026-06-09):**
> A `demo.estetiacrm.com.br`, que usará **SEO** para obter cadastros, como converte esse cadastro em **venda de software/site sob demanda** para a vertical de saúde/estética?

Essa pergunta expôs uma lacuna: a versão anterior assumia **prospecção ativa local** (gravar Loom e abordar clínicas de Goiânia). O canal virou **SEO nacional/inbound** — o cliente acha você, você não persegue. Inbound e outbound convertem de formas opostas, então o funil foi redesenhado.

**Restrições reais (do brainstorm):**
- O app **não é dele** (OSS de terceiro) e é **pesado** (3GB RAM, paginação no SSD na máquina de 16GB). Rodar runtimes de agente em paralelo é o custo real.
- **Sem servidor potente** → SaaS multi-tenant/self-service está fora por ora.
- O usuário **recusou** vender conhecimento/setup/curso/consultoria.
- Já tem **produtos prontos** no nicho (Estetia CRM, Sofia IA) mas **nunca vendeu serviço avulso** (site/automação) para clínica.

**Decisão central (validada passo a passo):**
> Vender **software/site sob demanda** (não a ferramenta, não conhecimento). O Agent Teams AI é a **fábrica invisível de produção**. O cliente recebe site/automação que roda sozinho — nunca vê um agente. Modelo: **micro software house de 1 pessoa, vertical em clínicas de saúde/estética, captação por SEO inbound, fechamento 1-a-1, com upsell de automação recorrente.**

**Resultado pretendido:** primeiro cliente pagante via funil SEO → lead → venda, validando a esteira com a fábrica de agentes dando vantagem de custo/velocidade.

---

## 1. Modelo de Negócio

Micro software house de 1 pessoa. Agent Teams AI = linha de produção interna, nunca exposta ao cliente.

- **Não é** revenda do app, não é consultoria, não é curso. É **produto/serviço entregue**.
- **Vantagem de custo:** a fábrica de agentes comprime tempo de produção → entrega em dias o que agência faz em semanas, mantendo margem por hora alta (benchmark: solo dev + agente entrega MVP por R$5-25k onde agência cobra R$20-75k).
- **Fosso:** concorrente que faz na mão não acompanha custo/velocidade. Vertical + domínio defende preço (nichado cobra 20-50% mais que generalista).

## 2. Vertical: Saúde/Estética (decisão baseada em benchmark)

**Por que estética e não jurídico/dental (que pagam MAIS por cliente):**

| Critério | Estética (med spa) | Jurídico/Dental |
|---|---|---|
| Ticket bruto | Médio (retainer R$2,5k-8k/mês) | Alto |
| Saturação | **Ainda aberta** (maioria usa agência genérica) | Lotado de especialistas |
| Crescimento | 12-15%/ano; buscas eletivas +20-30% YoY | Maduro |
| Vantagem injusta do usuário | **ALTA** (Estetia/Sofia já existem) | Nenhuma |
| ROI de automação | Quantificável (no-show -30% = receita recuperada) | Quantificável mas mais concorrido |

**Veredito:** estética é o melhor ponto de largada — vantagem injusta real + nicho aberto + ROI que vende sozinho. Dental/odonto (domínio via Seven-MD) e jurídico = expansão futura (playbook replicável).

---

## 3. ★ O FUNIL DE CONVERSÃO: do SEO ao contrato (núcleo da estratégia)

Esta é a resposta à pergunta central. **Funil escolhido: A — SEO capta o DONO da clínica (B2B inbound).**

### 3.1 Quem o SEO capta (decisão crítica)

O SEO **não** deve mirar pacientes. Mira o **comprador: o dono/gestor de clínica** buscando como resolver a própria dor ("site para clínica de estética", "sistema de agendamento para clínica", "como diminuir falta de paciente", "marketing para clínica de estética"). Captar paciente encheria o funil de gente que quer agendar botox — não quem compra software.

### 3.2 A arquitetura de páginas (o ajuste que o funil exige)

Hoje a `demo.estetiacrm.com.br` é uma **clínica fictícia (Aurora)**. Sozinha, ela fala com paciente, não com dono. O funil precisa de duas camadas:

1. **Página B2B de captação** (a que o SEO rankeia) — fala com o DONO:
   *"Sites e automação que enchem a agenda da sua clínica de estética."*
   Conteúdo: dor (agenda vazia, no-show, lead perdido no Instagram) → solução → **prova** → CTA de cadastro.
   - Onde: raiz `estetiacrm.com.br` e/ou páginas de conteúdo SEO (`/para-clinicas`, blog de fundo de funil).
2. **Demo Aurora** (`demo.estetiacrm.com.br`) — vira **prova viva clicável**: "veja um exemplo do que entrego". O dono navega, vê o nível premium, e pensa *"quero esse padrão na minha clínica"*.

> A demo não é a oferta. É o portfólio. A oferta está na página B2B.

### 3.3 A esteira completa (cadastro → venda → recorrência)

```
SEO (conteúdo B2B p/ dono de clínica)
  → dono acha a página de captação
  → clica na demo Aurora (PROVA: "olha o que ele entrega")
  → cadastra (nome, clínica, WhatsApp) = LEAD B2B MORNO
  → contato 1-a-1 (WhatsApp/call): diagnóstico rápido + oferta
  → fecha SITE de captação (R$3.500 / fundador R$1.750)
  → fábrica entrega em dias (parametriza a Aurora p/ a clínica real)
  → prova de valor → upsell AUTOMAÇÃO (retainer R$697/mês)
  → case/depoimento → alimenta SEO (conteúdo) + fecha próximos mais fácil
```

### 3.4 Por que SEO inbound (e não Loom/prospecção ativa)

- **Escala sem o seu tempo de prospecção:** conteúdo rankeado trabalha 24/7; você não persegue clínica uma a uma.
- **Lead morno, não frio:** quem busca "site para clínica" já tem a dor — conversão muito maior que abordagem fria.
- **Nacional, não local:** Goiânia é irrelevante; o conteúdo capta dono de clínica de qualquer lugar do Brasil.
- **Composto:** cada artigo/case fica rankeando e gerando lead por meses.

### 3.5 O elo fraco (consciente) e a mitigação

- **SEO B2B é nicho** (pouco volume de busca) e **lento** (meses pra rankear). Mitigação: conteúdo de fundo de funil com alta intenção ("quanto custa site para clínica", "como reduzir no-show") + a demo como diferencial visual que nenhum concorrente genérico tem.
- **Termo competitivo:** "site para clínica" disputa com agências/SaaS antigos. Mitigação: ir fundo no nicho estética (long-tail) onde o domínio do usuário ganha.
- **Por isso o SEO é planejado só quando o produto/serviço estiver ~95% pronto** (keywords/páginas dependem da oferta final). Ver seção 7.

---

## 4. Oferta Produtizada (escopo fixo)

**Detalhe completo e benchmark em `Docs/sales/oferta.md`.** Resumo:

**Posicionamento:** NÃO vender "site" (comoditizado R$970) nem "agendamento" (SaaS R$40/mês). Vender **"site de captação + automação que enche a agenda"** — ancora em preço de agência de marketing.

- **Entrada — "Site de Captação":** R$3.500 (fundador R$1.750). Escopo fixo, entrega ~1 semana.
- **Upsell recorrente — "Agenda Cheia" (automação):** R$697/mês + setup R$1.500. Pitch ROI: se paga com 2 no-shows evitados.
- **Pacote:** R$5.000 + R$697/mês (fundador R$2.500 + R$697/mês). LTV 12m ~R$10.9k.
- **Risco baixo:** preço de fundador (metade no setup, 2 primeiras, em troca de case).

## 5. A Fábrica Invisível (Agent Teams AI) — Arquitetura de Squads

**Composição de cada squad (4 membros):**
- 1 **Lead** — Opus 4.8 **High** (orquestra, decide, distribui)
- 2 **Operadores** — Sonnet 4.6 **Low** (volume; substituem Haiku, que gerava retrabalho)
- 1 **Revisor** — Sonnet 4.6 **High** (valida antes de fechar; dono do hand-off)

**Regra dura de RAM — UM SQUAD ATIVO POR VEZ:** o OOM (`agent_teams_ai_oom_root_cause.md`) vem dos *runtimes simultâneos*. 1 squad (4 runtimes) ≈ gerenciável; 2 squads (8) = OOM pior. Fluxo: liga → executa sprint → hand-off → **desliga** → liga o próximo. (24GB+ RAM é o fix p/ paralelizar no futuro.)

**1 squad = 1 sprint macro** (casa com "um sprint por sessão" e "não paralelizar deploy").

**Hand-off ao fechar (Revisor):** doc de 7 seções (feito / decisões+porquês / estado / pendências / gotchas / como rodar / próximos passos) + atualiza CLAUDE.md. Próximo squad lê o hand-off no arranque (mesmo padrão do Context Keeper).

**Saída pro cliente:** site/automação standalone (Next.js, padrão Estetia). Zero Electron, zero agente, zero RAM dele.

**Disciplina (`agent_teams_operating_playbook.md`):** 1 task = 1 verde; gate de build no pre-commit; CLAUDE.md = fonte de verdade; não force-approve pra fugir de bloqueio.

**Limite consciente:** peso/OOM contido na máquina dele. Não escala além dela por ora — entrega artesanal acelerada, não SaaS multi-tenant.

## 6. Precificação (resumo)

| Item | Cheio | Fundador | Tipo |
|---|---|---|---|
| Site de Captação | R$3.500 | R$1.750 | One-time |
| Automação (setup) | R$1.500 | R$750 | One-time |
| Automação (retainer) | R$697/mês | R$697/mês | Recorrente |
| **Pacote** | R$5.000 + R$697/mês | R$2.500 + R$697/mês | Misto |

Princípio: **vender ROI, não horas**.

## 7. Aquisição (SEO) — sequenciamento

**O SEO é a ÚLTIMA milha — planejado e ligado só quando o produto/serviço estiver ~95% pronto.** Planejar cedo = desperdício (keywords/páginas dependem da oferta final).

**Pré-requisitos antes de ligar o SEO:**
1. Demo Aurora premium no ar ✅ (`demo.estetiacrm.com.br`).
2. Oferta definida ✅ (`Docs/sales/oferta.md`).
3. **Página B2B de captação** construída (a que rankeia — fala com o dono; ver 3.2). ⬜ Pendente.
4. Plano de SEO: keywords long-tail de fundo de funil + calendário de conteúdo + páginas. ⬜ Pendente.

**Métricas (a definir junto com o plano de SEO):** tráfego orgânico → taxa de cadastro (lead) → taxa lead→call → taxa call→venda → 1º retainer. (As antigas métricas D+30/60/90 pressupunham prospecção local e foram descartadas.)

## 8. Roadmap de Expansão

1. **Fase 1 (agora):** fechar o funil A — página B2B + plano SEO → 1º lead → 1ª venda → 1º retainer → case.
2. **Fase 2:** padronizar fábrica (templates + playbook) e escalar conteúdo SEO (mais artigos = mais leads compostos).
3. **Fase 3:** replicar para vertical adjacente (dental/odonto via Seven-MD, ou jurídico). Fábrica + funil são replicáveis; troca-se templates, conteúdo e nicho.
4. **Fase 4 — Funil C (produto self-service):** transformar a fábrica artesanal num PRODUTO onde a clínica se cadastra e gera o próprio site/sistema (SaaS-like, autoatendimento via SEO). É o destino que escala sem o tempo do usuário — mas exige servidor + multi-tenant + billing, então **só quando a Fase 1 estiver gerando caixa**. Financiado pela encomenda.

---

## Verificação (como testar a estratégia end-to-end)

1. **Fábrica funciona:** ✅ demo Aurora produzida pelos squads e no ar.
2. **Demo comunica premium:** ✅ redesign sage/dourado (Stitch) no ar — prova visual que diferencia.
3. **Página B2B capta:** construir a página de captação B2B; testar se um dono de clínica entende a oferta em 30s e se cadastra.
4. **SEO traz tráfego:** após ligar o SEO, medir tráfego orgânico de termos B2B.
5. **Lead vira venda:** 1º cadastro B2B → call → contrato (mesmo a preço de fundador) = funil validado.
6. **Recorrência pega:** 1º retainer de automação ativo = LTV provado.

Critério de sucesso: chegar ao passo 6. Kill/revisão: se a página B2B + SEO não gerarem nenhum lead qualificado em 90 dias após ligados, revisar conteúdo/keywords/oferta antes de trocar de vertical.

---

## Anexo: Mapeamento de Squads por Sprint Macro

| Sprint macro | Squad | Escopo (código) | Hand-off |
|---|---|---|---|
| **S1 — Base** | Squad A | Decidir base + esqueleto | Doc + CLAUDE.md inicial ✅ |
| **S2 — Vitrine** | Squad B | Demo: home + LP + agendamento | Doc + CLAUDE.md ✅ |
| **S3 — Automação** | Squad C | Lembrete 24h/2h + deploy | Doc + URL demo ✅ |
| **S4 — Página B2B** (próximo) | Squad D | Página de captação B2B (fala com o dono) + integração com a demo | Doc + CLAUDE.md |

Regras (duras): nunca 2 squads ligados juntos (OOM); cada sprint fecha com build verde + hand-off 7 seções + CLAUDE.md, validados pelo Revisor. Tarefas de **negócio** (oferta, conteúdo SEO, fechamento) são do usuário — não usam squad.

Plano de execução detalhado em `Docs/plano-execucao.md`.
