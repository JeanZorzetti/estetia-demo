import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso | Estetia",
  description: "Termos de uso do site da Estetia.",
};

export default function TermosPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <header className="border-b border-clinical-gray/40 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-primary">Estetia</Link>
          <Link href="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">← Voltar</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="font-display text-4xl">Termos de Uso</h1>
        <p className="text-on-surface-variant">Última atualização: junho de 2026</p>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">1. O serviço</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Este site apresenta os serviços da Estetia (ROI Labs): criação de
            sites de captação e automações de agendamento para clínicas de
            estética. O envio do formulário expressa interesse comercial e não
            constitui contrato.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">2. A demonstração</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A página <Link href="/demo" className="text-primary hover:text-gold-accent transition-colors">/demo</Link> exibe
            uma clínica fictícia (&ldquo;Clínica Aurora&rdquo;) criada exclusivamente para
            demonstrar o padrão de entrega. Nomes, números e depoimentos ali
            exibidos são ilustrativos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">3. Estimativas de resultado</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Valores de recuperação de receita citados no site (ex.: redução de
            faltas com lembretes automáticos) são estimativas baseadas em
            benchmarks de mercado e variam conforme o volume e o ticket de cada
            clínica. Não constituem promessa de resultado.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">4. Propriedade intelectual</h2>
          <p className="text-on-surface-variant leading-relaxed">
            O conteúdo deste site (textos, design, código) pertence à ROI Labs e
            não pode ser reproduzido sem autorização.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">5. Contato</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Dúvidas sobre estes termos:{" "}
            <a href="mailto:contato@roilabs.com.br" className="text-primary hover:text-gold-accent transition-colors">contato@roilabs.com.br</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
