import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Estetia",
  description: "Como a Estetia coleta, usa e protege seus dados pessoais (LGPD).",
};

export default function PrivacidadePage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <header className="border-b border-clinical-gray/40 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-primary">Estetia</Link>
          <Link href="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">← Voltar</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="font-display text-4xl">Política de Privacidade</h1>
        <p className="text-on-surface-variant">Última atualização: junho de 2026</p>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">1. Quem somos</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A Estetia é um serviço da ROI Labs que constrói sites e automações
            para clínicas de estética. Esta política descreve como tratamos os
            dados pessoais coletados neste site, em conformidade com a Lei Geral
            de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">2. Quais dados coletamos</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Ao preencher o formulário de contato, coletamos: <strong>seu nome</strong>,{" "}
            <strong>o nome da sua clínica</strong> e <strong>seu número de WhatsApp</strong>.
            Não coletamos dados sensíveis. Podemos também coletar dados de navegação
            anônimos (analytics) para melhorar o site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">3. Para que usamos</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Os dados do formulário são usados exclusivamente para{" "}
            <strong>entrar em contato comercial</strong> sobre os serviços que você
            solicitou (site e automação para sua clínica). Base legal: execução de
            procedimentos preliminares a contrato, a seu pedido (art. 7º, V, LGPD).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">4. Onde os dados ficam</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Seus dados são armazenados no Sirius CRM, sistema de gestão de
            relacionamento da ROI Labs, hospedado em servidores seguros. Não
            vendemos nem compartilhamos seus dados com terceiros para fins de
            marketing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">5. Seus direitos</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Você pode, a qualquer momento, solicitar acesso, correção ou exclusão
            dos seus dados, bem como revogar o consentimento. Basta enviar um
            e-mail para <a href="mailto:contato@roilabs.com.br" className="text-primary hover:text-gold-accent transition-colors">contato@roilabs.com.br</a>.
            Responderemos em até 15 dias.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">6. Retenção</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Mantemos os dados de contato pelo tempo necessário à finalidade
            comercial. Leads sem interação são excluídos periodicamente.
          </p>
        </section>
      </main>
    </div>
  );
}
