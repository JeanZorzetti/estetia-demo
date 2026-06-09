// Conteúdo da landing B2B (home) — fala com o DONO de clínica. Fonte de verdade da copy.

export type PainCard = { title: string; description: string; icon: string; tone: "error" | "neutral" | "secondary" };
export type Step = { title: string; description: string; icon: string; highlight?: boolean };

export const b2bConfig = {
  brand: "EstetiaCRM",
  demoUrl: "/demo",

  hero: {
    eyebrow: "Exclusivo para Clínicas de Alta Performance",
    titleStart: "Sua clínica de estética merece um site que enche a agenda — ",
    titleEmphasis: "não um cartão de visitas digital.",
    subtitle:
      "Sites de alta conversão + automação inteligente que reduz faltas e captura cada lead. Entrega premium em apenas 1 semana.",
    cta: "Quero encher minha agenda",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCclAvwrDZ_WbVOQq7pqA23t4BxckKKK2D2kBJQO6qn5TEQ3ATYTxfQmU1cwj8UZGXegRV_UlDtzAf4EyNvfzDDI8EWEO-WyujP1gdlbuXk8c7_8MAHTvosaSx1WMPWbskyShohND6M1QZYspB7m9SwXxI863ntMPAM0AQBTfBzUqpi9I0p_WcYuECw9sc_z5ocnDaV-Ryjm6aehiZ5UDlXVFBZYs-7dnkzqpt8GuyLqp-r28q8Ano-mGkWw0Sh_25X_216nOhm_jTo",
  },

  pain: {
    title: "Você reconhece isso?",
    subtitle:
      "O design bonito não serve de nada se não transformar visitantes em pacientes sentados na sua recepção.",
    cards: [
      {
        title: "Agenda com buracos",
        description:
          "O marketing atrai, mas o agendamento manual é lento e faz o paciente desistir no meio do caminho.",
        icon: "calendar_month",
        tone: "error",
      },
      {
        title: "Lead some no direct",
        description:
          "Mensagens perdidas no Instagram e WhatsApp. Cada lead ignorado é faturamento que vai para a concorrência.",
        icon: "speaker_notes_off",
        tone: "neutral",
      },
      {
        title: "Paciente falta (No-show)",
        description:
          "Ninguém lembrou da consulta. O horário fica vazio e o profissional ocioso, gerando prejuízo imediato.",
        icon: "person_cancel",
        tone: "secondary",
      },
    ] as PainCard[],
  },

  solution: {
    title: "Eu construo o site + a automação que resolve isso.",
    body:
      "Você foca na excelência do atendimento e no cuidado com os pacientes. O sistema trabalha 24/7 nos bastidores cuidando de captar, agendar e lembrar para lotar a sua agenda.",
  },

  proof: {
    title: "Veja um exemplo real do que entrego",
    body:
      "As interfaces são desenhadas para transmitir a mesma sofisticação do seu espaço físico, com um fluxo de agendamento invisível e implacável na conversão.",
    cta: "Ver demo ao vivo",
  },

  roi: {
    title: "O fim do dinheiro na mesa",
    intro:
      "O lembrete automático inteligente corta faltas em até 30%. Veja o impacto real na sua clínica.",
    value: "R$ 16k - 24k",
    valueLabel: "recuperados por mês",
    footnote:
      "*Estimativa para uma clínica com 80 consultas/mês. Um investimento que se paga na primeira semana.",
  },

  steps: {
    title: "Como funciona a transformação",
    items: [
      { title: "1. Cadastre-se", description: "Preencha o formulário abaixo em menos de 1 minuto para demonstrar interesse.", icon: "how_to_reg" },
      { title: "2. Diagnóstico", description: "Conversamos brevemente pelo WhatsApp para entender o fluxo atual da sua clínica.", icon: "forum" },
      { title: "3. Lançamento", description: "Seu novo site e automação no ar, captando pacientes, em exatos 7 dias.", icon: "rocket_launch", highlight: true },
    ] as Step[],
  },

  offer: {
    title: "Um salto para a sua marca.",
    badge: "Oferta de Fundador",
    body: "Site de Captação completo + Automação básica de lembretes a partir de",
    price: "R$ 3.500",
    scarcity: "Vagas limitadas para este valor.",
    formIntro:
      "Vamos focar em iniciar uma conversa. Deixe seus dados e descubra como o EstetiaCRM se adapta à sua realidade.",
    reassurance: "Resposta humana em até 1 hora.",
  },
};
