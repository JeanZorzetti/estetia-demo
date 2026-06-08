# Estratégia de Comercialização — Micro Software House Vertical (Estética) com Agent Teams AI como Fábrica

## Context

**Por que este documento existe:** O usuário quer ganhar dinheiro com o Agent Teams AI (app Electron OSS de terceiro — 777genius — clonado para teste, cheio de bugs que só ele domina). A pergunta de partida não era técnica, era de modelo de negócio: "como descubro a melhor forma de monetizar?".

**Restrições reais que moldaram a decisão (levantadas no brainstorm):**
- O app **não é dele** (OSS de terceiro) e é **pesado** (3GB RAM, depende de paginação no SSD na máquina de 16GB). Rodar 5 runtimes de agente em paralelo é o custo real, não o Electron em si.
- **Sem servidor potente** → nuvem está fora por ora.
- O usuário **recusou** vender conhecimento/setup/curso/consultoria.
- Já tem **produtos prontos** no nicho de estética (Estetia CRM, Sofia IA) mas **nunca vendeu serviço avulso** (site/automação) para clínica.

**Decisão central (validada passo a passo com o usuário):**
> Vender **software** (não a ferramenta, não conhecimento). O Agent Teams AI é a **fábrica invisível de produção** na máquina dele. O cliente recebe site/automação que roda sozinho — nunca vê um agente. Modelo: **micro software house de 1 pessoa, vertical em clínicas de estética, começando por software sob encomenda (site/LP) com upsell de automação recorrente.**

**Resultado pretendido:** primeiro cliente pagante de serviço em estética, validando a esteira oferta→entrega→recorrência, com a fábrica de agentes dando vantagem de custo/velocidade.

---

## 1. Modelo de Negócio

Micro software house de 1 pessoa. Agent Teams AI = linha de produção interna, nunca exposta ao cliente.

- **Não é** revenda do app, não é consultoria, não é curso. É **produto/serviço entregue**.
- **Vantagem de custo:** a fábrica de agentes comprime tempo de produção → entrega em dias o que agência faz em semanas, mantendo margem por hora alta (benchmark: solo dev + agente entrega MVP por R$5-25k onde agência cobra R$20-75k, ganhando mais por hora que sênior de agência).
- **Fosso:** concorrente que faz na mão não acompanha custo/velocidade. Vertical + domínio defende preço (nichado cobra 20-50% mais que generalista).

## 2. Vertical: Estética (decisão baseada em benchmark)

**Por que estética e não jurídico/dental (que pagam MAIS por cliente):**

| Critério | Estética (med spa) | Jurídico/Dental |
|---|---|---|
| Ticket bruto | Médio (retainer $2,5k-8k/mês) | Alto ($5k-15k/mês; PI até $100k MRR books) |
| Saturação | **Ainda aberta** (maioria usa agência genérica) | Lotado de especialistas |
| Crescimento | 12-15%/ano; buscas eletivas +20-30% YoY | Maduro |
| Vantagem injusta do usuário | **ALTA** (Estetia/Sofia já existem) | Nenhuma |
| ROI de automação | Quantificável (no-show -30% = R$16-24k/mês recuperados p/ clínica de 80 consultas) | Quantificável mas mais concorrido |

**Veredito:** estética não paga o máximo, mas é o melhor ponto de largada porque combina (1) vantagem injusta real, (2) nicho aberto, (3) ROI de automação que vende sozinho. Regra dos dados: "escolha um vertical e vá fundo" — ele já está 80% fundo sem ter vendido nada. Jurídico/dental = expansão futura (playbook replicável).

**Resiliência econômica:** sinal social (r/smallbusiness, "is business slowing down", 660 upvotes/512 comentários) mostra PMEs cortando gasto. Clínica de estética (margem alta, procedimento eletivo de ticket alto, R$1-3M receita/ano por unidade) aguenta pagar onde comércio local genérico aperta primeiro.

## 3. Oferta Produtizada (escopo fixo, não "orçamento sob medida")

**Oferta de entrada — "Site + Landing de alta conversão pra sua clínica":**
- Preço fixo, escopo fixo, entrega ~1 semana (fábrica comprime tempo).
- Ticket: **R$3k-6k**. Fecha rápido porque é tangível.
- Produtizar (não sob medida) = fica rápido, reaproveita templates, foge do "projeto que nunca acaba". Clínicas são parecidas o bastante.

**Upsell recorrente — "Automação de agendamento + follow-up de paciente":**
- Retainer mensal **R$500-1.500/mês**. Onde mora o LTV.
- Vendido DEPOIS que o site provou valor (confiança estabelecida).
- Pitch pronto com número: lembrete 24h/2h corta no-show 20-30% = R$16-24k/mês recuperados; resposta a lead <5min dispara conversão.

**Escada de receita (LTV 12 meses: R$6k-25k+):**
```
Demo (fábrica) → Loom personalizado → venda site (R$3-6k, fecha rápido)
  → entrega em dias (fábrica) → prova de valor
  → upsell automação (retainer R$500-1.5k/mês) → LTV
  → case/depoimento → próxima venda mais fácil
```

## 4. Aquisição do 1º Cliente (do zero)

Gargalo = prova + abordagem (tem produto, zero cliente de serviço).

**Passo 1 — Demo irresistível (não portfólio genérico):**
Usar a fábrica pra montar UM site + LP de clínica fictícia impecável, com automação de agendamento/follow-up funcionando. Vira arma de venda: mostrar resultado pronto, não "eu faço sites".

**Passo 2 — Abordagem por prova (Loom personalizado):**
Escolher 5-10 clínicas reais da cidade. Pra cada uma, gravar Loom de ~3 min mostrando (a) problema concreto no site/agendamento atual + (b) demo resolvendo + (c) ROI explícito ("recupera ~R$X/mês em no-show"). Trabalhoso por clínica, mas a fábrica dá o tempo e a conversão é muito maior que e-mail frio.

**Passo 3 — Oferta de risco baixo pro cliente:**
Preço de fundador ("primeiras 2 clínicas pagam metade, estou montando portfólio do nicho") OU garantia ("não gostou, não paga"). Troca margem por case + depoimento, que destravam vendas seguintes.

## 5. A Fábrica Invisível (Agent Teams AI) — Arquitetura de Squads

Atualizada com aprendizados reais de operação do app (substitui o modelo antigo "lead Opus + Haiku devs").

**Composição de cada squad (4 membros):**
- 1 **Lead** — Opus 4.8 **High** (orquestra, decide, distribui)
- 2 **Operadores** — Sonnet 4.6 **Low** (volume de execução; substituem os Haiku, que entregavam qualidade ruim e geravam retrabalho = mais custo, não menos)
- 1 **Revisor** — Sonnet 4.6 **High** (valida antes de fechar o sprint; dono do hand-off)

**Regra dura de RAM — UM SQUAD ATIVO POR VEZ:**
- O OOM (`agent_teams_ai_oom_root_cause.md`) vem dos *runtimes simultâneos*, não da contagem lógica de membros. Granularizar em squads NÃO resolve sozinho — só resolve se **apenas um squad estiver ligado a cada momento**.
- Os outros squads existem no config mas ficam **desligados**. Fluxo: liga squad → executa o sprint macro → revisor monta hand-off → desliga squad → liga o próximo.
- 4 runtimes de um squad ≈ carga gerenciável; 2 squads (8 runtimes) = OOM pior que hoje. Nunca paralelizar squads na máquina atual de 16GB.

**1 squad = 1 sprint macro:**
- Cada squad é responsável por um sprint macro inteiro (casa com a regra global "um sprint por sessão" e com "não paralelizar deploy").
- Isolamento natural: como só um squad roda por vez e cada um cobre um sprint, o paralelismo perigoso fica impossível por design.

**Hand-off robusto entre squads (doc estruturado + CLAUDE.md):**
- Ao fechar o sprint, o **Revisor** produz um doc de hand-off com seções obrigatórias: (1) o que foi feito, (2) decisões técnicas e porquês, (3) estado atual do código, (4) pendências, (5) gotchas descobertos, (6) como rodar/testar, (7) próximos passos pro squad seguinte.
- Além do doc, o squad **atualiza o CLAUDE.md do projeto** (fonte de verdade) com o que mudou — o próximo squad já pega contexto no arranque, sem reconstruir do zero.
- Conecta com o Context Keeper: o problema de handoff entre sessões de agente é o mesmo padrão.

**Saída pro cliente:** site/automação standalone (Next.js, padrão Estetia). Zero Electron, zero agente, zero RAM dele.

**Disciplina (do `agent_teams_operating_playbook.md`):** 1 task = 1 verde; gate de build no pre-commit; CLAUDE.md = fonte de verdade; não force-approve pra fugir de bloqueio.

**Limite consciente:** peso/OOM é problema da produção, contido na máquina dele. Não escala além dela por ora — o negócio é entrega artesanal acelerada, não SaaS multi-tenant. (24GB+ de RAM é o fix real se quiser rodar squads em paralelo no futuro.)

## 6. Precificação (resumo)

| Item | Preço | Tipo |
|---|---|---|
| Site + LP clínica | R$3k-6k (fundador: metade nas 2 primeiras) | One-time |
| Retainer automação | R$500-1.500/mês | Recorrente |
| Pacote completo (site + automação) | R$4k-7k setup + retainer | Misto |

Princípio de venda dos dados: **vender ROI, não horas** ("economizo R$X/mês, cobro R$Y/mês").

## 7. Métricas (validar o modelo)

- **D+30:** 1 demo pronta + 10 clínicas abordadas via Loom.
- **D+60:** 1º cliente pago (site).
- **D+90:** 1º retainer de automação ativo + 1 case/depoimento documentado. (Espelha kill/validate criteria que ele usa em outros micro-SaaS.)
- **Norte:** 5 clínicas com retainer = base recorrente que sustenta foco no nicho.

## 8. Roadmap de Expansão (médio prazo)

1. **Fase 1 (agora):** validar venda em estética (1º cliente → 1º retainer → case).
2. **Fase 2:** padronizar fábrica (templates + playbook de produção repetível) e escalar p/ 5-10 clínicas.
3. **Fase 3:** replicar playbook para vertical adjacente de ticket maior (dental/odonto — também já tem domínio via Seven-MD) ou jurídico. A fábrica e a esteira de venda são replicáveis; troca-se os templates e o nicho.
4. **Fase 4 (opcional, se houver caixa/servidor):** produtizar o que mais se repetir entre clientes num micro-SaaS vertical (volta à "Opção A" do brainstorm, agora financiada pela encomenda).

---

## Verificação (como testar a estratégia end-to-end)

Esta é uma estratégia de negócio, não código — a "verificação" é a execução validada por mercado:

1. **Fábrica funciona:** rodar o Agent Teams AI (comando da memória `project_agent_teams_ai.md`) e produzir a demo de clínica fictícia (site + LP + agendamento) end-to-end, com gate de build verde. Prova que a linha de produção entrega.
2. **Oferta comunica valor:** gravar 1 Loom de teste sobre a demo e medir se o ROI fica claro em 3 min (testar com 1 pessoa de fora antes de mandar pra clínica real).
3. **Mercado responde:** abordar 10 clínicas; meta de ≥1 resposta interessada (taxa de Loom personalizado costuma bater isso).
4. **Venda fecha:** 1º contrato assinado (mesmo a preço de fundador) = modelo validado.
5. **Recorrência pega:** 1º retainer de automação ativo = LTV provado, esteira completa.

Critério de sucesso da estratégia: chegar ao passo 5 em ~90 dias. Se 10 Looms personalizados + preço de fundador não gerarem nenhuma venda em 60 dias, revisar oferta/abordagem antes de trocar de vertical.

---

## Anexo: Mapeamento de Squads por Sprint Macro

Aplica a arquitetura da seção 5 (1 squad ativo por vez; cada squad = 1 Lead Opus High + 2 Operadores Sonnet Low + 1 Revisor Sonnet High; hand-off doc + CLAUDE.md ao fechar).

As tarefas de **código** do plano de execução são agrupadas em sprints macro, um squad por vez:

| Sprint macro | Squad | Escopo (tarefas de código) | Hand-off ao fechar |
|---|---|---|---|
| **S1 — Base** | Squad A | Avaliar e decidir base (Estetia vs template novo); montar esqueleto do repo | Doc: base escolhida + estrutura + como rodar. CLAUDE.md inicial do repo. |
| **S2 — Vitrine** | Squad B (liga após desligar A) | Demo de clínica fictícia: home + LP de conversão + agendamento; build verde | Doc: páginas feitas, decisões de UX, estado, pendências. CLAUDE.md atualizado. |
| **S3 — Automação** | Squad C (liga após desligar B) | Fluxo de lembrete 24h/2h + follow-up; deploy standalone da demo | Doc: automação, como testar, URL da demo, gotchas de deploy. CLAUDE.md atualizado. |

Regras operacionais (duras):
- **Nunca dois squads ligados ao mesmo tempo** (OOM). Fechar um, fazer hand-off, desligar, ligar o próximo.
- Cada sprint macro termina com: build verde + doc de hand-off (7 seções) + CLAUDE.md atualizado, validados pelo Revisor.
- As tarefas de **negócio** (oferta, lista de clínicas, Loom, abordagem, venda) são do usuário — não usam squad.

As 9 tarefas detalhadas (com TDD/commits onde há código e checklists onde é negócio) vivem em `projeto-novo/plano-execucao.md`, a ser atualizado para refletir este mapeamento de squads na próxima edição (fora do plan mode).
