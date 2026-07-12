import { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "botao-whatsapp-site-clinica-de-estetica",
  title:
    "Botão de WhatsApp no Site da Clínica: Onde Colocar, Como Configurar e os Erros Que Custam Leads",
  excerpt:
    "O WhatsApp é onde a paciente brasileira fecha — mas o botão mal colocado vira ruído, e o link sem mensagem pronta vira 'oi' perdido. O guia completo: posição, mensagem, horário e o fluxo depois do clique.",
  aiDescription:
    "Botão de WhatsApp em site de clínica de estética: posição flutuante no canto inferior direito (padrão reconhecido), visível em toda página mas sem cobrir CTA principal; link wa.me com mensagem pré-preenchida contextual ('Olá! Vi o site e quero agendar uma avaliação de [serviço]') qualifica o lead e poupa digitação. Formulário e WhatsApp coexistem: formulário estrutura e alimenta automação, WhatsApp atende quem quer conversa imediata. Erro crítico: botão para número que ninguém responde — resposta em minutos multiplica conversão; acima de 5h o lead esfriou.",
  date: "2026-07-12",
  lastModified: "2026-07-12",
  category: "Site & Conversão",
  image: "/demo-aurora.jpg",
  imageAlt:
    "Botão flutuante de WhatsApp em site de clínica de estética no celular",
  author: "Equipe Estetia",
  relatedSlugs: [
    "site-clinica-estetica-agendamento-online",
    "site-para-clinica-de-estetica-guia",
    "instagram-ou-site-clinica-de-estetica",
  ],
  faqs: [
    {
      question: "Onde colocar o botão de WhatsApp no site da clínica?",
      answer:
        "Flutuante no canto inferior direito — é a posição que o usuário brasileiro já reconhece de olho fechado. Visível em todas as páginas, mas dimensionado para não cobrir o CTA principal nem o rodapé no celular. No topo da página, o WhatsApp pode aparecer também como link no header.",
    },
    {
      question: "O que é o link wa.me e como configurar?",
      answer:
        "É o link oficial de conversa direta: wa.me/55DDDNUMERO abre o chat com a clínica sem a pessoa salvar contato. Adicione a mensagem pré-preenchida com ?text= — por exemplo, 'Olá! Vi o site e quero agendar uma avaliação'. Um clique, conversa aberta, contexto pronto.",
    },
    {
      question: "Qual mensagem pré-preenchida usar?",
      answer:
        "Contextual à página: no botão geral, 'Olá! Vi o site de vocês e quero agendar uma avaliação'; na página de um procedimento, 'Olá! Quero saber mais sobre [procedimento]'. A mensagem pronta poupa a digitação, vence a timidez do 'oi' e já chega qualificando o interesse.",
    },
    {
      question: "Botão de WhatsApp substitui o formulário?",
      answer:
        "Não — são públicos diferentes: o WhatsApp atende quem quer conversar agora; o formulário estrutura o pedido (serviço, contato, preferência) e alimenta a automação de confirmação e lembrete. Sites que convertem bem oferecem os dois, com o formulário como caminho principal.",
    },
    {
      question: "WhatsApp normal ou WhatsApp Business?",
      answer:
        "Business, sem discussão: perfil com endereço e horários, mensagem automática de ausência, respostas rápidas para as perguntas repetidas e etiquetas para organizar contatos. É gratuito e transforma o número da clínica em canal profissional.",
    },
    {
      question: "E se a clínica não conseguir responder rápido?",
      answer:
        "Configure a mensagem automática de saudação/ausência com expectativa honesta ('Respondemos em até 1h no horário comercial') e priorize responder leads do site — o lead esfria em horas. Se a recepção não dá conta, automação de primeira resposta deixa de ser luxo.",
    },
    {
      question: "O botão de WhatsApp atrapalha o SEO ou a velocidade do site?",
      answer:
        "Um botão bem implementado (link direto com ícone leve) pesa quase nada. O que atrapalha são widgets de chat de terceiros carregando scripts pesados — se o efeito visual é o mesmo, prefira o link wa.me simples com ícone em SVG.",
    },
    {
      question: "Devo colocar o número pessoal do dono no botão?",
      answer:
        "Nunca — o canal precisa sobreviver a férias, troca de equipe e crescimento. Número comercial fixo no WhatsApp Business, com mais de uma pessoa habilitada a responder, e o histórico de conversas fica sendo patrimônio da clínica, não do celular de alguém.",
    },
  ],
  content: `
<p>O WhatsApp é onde a paciente brasileira marca, remarca, pergunta e fecha. Colocar um botão dele no site parece trivial — e é exatamente por parecer trivial que quase toda clínica faz pela metade: <strong>botão sem mensagem pronta, número que demora horas, widget pesado que atrasa a página</strong>. Este guia fecha as pontas: posição, configuração, mensagem e — o mais importante — o que acontece depois do clique.</p>

<h2>Posição: o Padrão Existe por um Motivo</h2>

<ul>
  <li><strong>Flutuante, canto inferior direito:</strong> é onde o polegar espera. Reinventar a posição é gastar conversão em criatividade.</li>
  <li><strong>Presente em todas as páginas</strong> — a dúvida surge em qualquer ponto da leitura.</li>
  <li><strong>Dimensionado com respeito:</strong> não pode cobrir o CTA principal nem os botões do rodapé no celular. O WhatsApp é o atalho, não o sequestrador da página.</li>
</ul>

<h2>Configuração: o Link Que Trabalha</h2>

<p>O formato oficial é o <strong>wa.me</strong>:</p>

<p><em>wa.me/5562999999999?text=Olá! Vi o site de vocês e quero agendar uma avaliação</em></p>

<ul>
  <li><strong>Mensagem pré-preenchida sempre:</strong> poupa digitação, vence a timidez do "oi" solto e chega qualificando.</li>
  <li><strong>Contextual por página:</strong> na página do peeling, "Quero saber mais sobre peeling". O lead já abre a conversa dizendo o que quer — a recepção agradece.</li>
  <li><strong>Ícone leve (SVG), sem widget de terceiros:</strong> plugins de chat carregam scripts pesados que atrasam a página inteira para entregar o mesmo clique.</li>
</ul>

<div class="callout-warning">
  <strong>O erro que anula tudo: botão para número que ninguém responde.</strong> O lead do site esfria em horas — quem responde em minutos multiplica a conversão; acima de 5 horas, a paciente já marcou na concorrente. Antes de instalar o botão, resolva QUEM responde e em quanto tempo. Botão sem operação é só decoração verde.
</div>

<h2>WhatsApp Business: o Mínimo Profissional</h2>

<ol>
  <li><strong>Perfil completo:</strong> nome da clínica, endereço, horários, site, catálogo de serviços.</li>
  <li><strong>Saudação automática</strong> com expectativa honesta: "Olá! Respondemos em até 1h no horário comercial."</li>
  <li><strong>Mensagem de ausência</strong> fora do horário — com promessa de retorno pela manhã (e cumprimento dela).</li>
  <li><strong>Respostas rápidas</strong> para as 10 perguntas repetidas (endereço, estacionamento, formas de pagamento).</li>
  <li><strong>Número comercial, nunca o pessoal do dono:</strong> o canal — e o histórico de conversas — é patrimônio da clínica.</li>
</ol>

<h2>WhatsApp E Formulário: Não É Ou/Ou</h2>

<table>
  <thead>
    <tr><th>Canal</th><th>Quem usa</th><th>Força</th></tr>
  </thead>
  <tbody>
    <tr><td>Formulário</td><td>Quem prefere deixar o pedido estruturado</td><td>Dados completos + dispara automação (confirmação, lembrete 24h/2h)</td></tr>
    <tr><td>Botão WhatsApp</td><td>Quem quer conversar agora</td><td>Imediatismo e calor humano</td></tr>
  </tbody>
</table>

<p>Os sites que mais convertem oferecem os dois — formulário como caminho principal (é ele que alimenta a máquina de <a href="/blog/site-clinica-estetica-agendamento-online">agendamento e lembretes</a>) e o botão como válvula para os apressados. Detalhe de mestre: o formulário pede o WhatsApp da paciente; a resposta chega onde ela vive.</p>

<h2>Depois do Clique: os 3 Primeiros Minutos</h2>

<p>O fluxo que separa clínica que capta de clínica que coleciona "oi":</p>

<ol>
  <li><strong>Minuto 0:</strong> saudação automática confirma que a mensagem chegou e dá o prazo.</li>
  <li><strong>Primeira resposta humana</strong> (ou automatizada inteligente): agradece, faz UMA pergunta de avanço — "prefere manhã ou tarde?" — e caminha para a data.</li>
  <li><strong>Fechou horário:</strong> confirmação + lembrete 24h/2h automáticos. Sem isso, parte das marcações vira falta e o esforço todo evapora.</li>
</ol>

<div class="callout-stat">
  <strong>A régua do nicho:</strong> conversão saudável do site fica em 2-5% das visitas virando contato (formulário + WhatsApp somados). Se o tráfego existe e o número não aparece, o problema está na página (CTA, prova, velocidade) ou na resposta (lenta demais) — os dois têm conserto rápido.
</div>

<div class="callout-cta">
  <strong>Quer o combo pronto — botão, formulário e automação conversando?</strong> A Estetia entrega o site de captação com WhatsApp integrado, mensagem contextual por página e lembrete anti-falta, em 1 semana. <a href="/#orcamento">Peça sua avaliação gratuita</a>: respondemos (no WhatsApp, claro) em até 1 hora.
</div>

<h2>Resumo</h2>

<p>Botão flutuante no canto inferior direito, link wa.me com mensagem pré-preenchida contextual, WhatsApp Business configurado, número comercial e — acima de tudo — operação de resposta em minutos. WhatsApp e formulário convivem: um estrutura e automatiza, o outro acolhe o apressado. O botão é a parte fácil; a conversão mora no que acontece depois do clique.</p>
`,
};
