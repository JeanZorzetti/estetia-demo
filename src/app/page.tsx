/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { b2bConfig } from "@/config/b2b";
import LeadForm from "@/components/b2b/LeadForm";

const painToneClass: Record<string, string> = {
  error: "bg-red-50 text-red-600",
  neutral: "bg-surface-container text-on-surface-variant",
  secondary: "bg-primary/10 text-primary",
};

export default function HomePage() {
  const c = b2bConfig;
  return (
    <div className="bg-background text-on-surface">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1200px] mx-auto">
          <span className="font-display text-2xl font-bold text-primary">{c.brand}</span>
          <nav className="hidden md:flex gap-8 items-center text-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#solucao">O que fazemos</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#como-funciona">Como funciona</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#orcamento">Orçamento</a>
          </nav>
          <a className="inline-flex bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors" href="#orcamento">
            Quero meu site
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 max-w-[1200px] mx-auto pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-8 lg:pr-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              {c.hero.eyebrow}
            </div>
            <h1 className="font-display text-5xl md:text-[64px] leading-tight">
              {c.hero.titleStart}
              <span className="text-gold-accent italic">{c.hero.titleEmphasis}</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl">{c.hero.subtitle}</p>
            <a className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:-translate-y-1 hover:shadow-lg transition-all duration-300" href="#orcamento">
              {c.hero.cta}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div className="relative h-[420px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <img alt="Clínica de estética premium" className="absolute inset-0 w-full h-full object-cover" src={c.hero.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="py-24 bg-surface-container px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl mb-4">{c.pain.title}</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">{c.pain.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.pain.cards.map((card) => (
              <div key={card.title} className="bg-surface p-8 rounded-3xl shadow-sm hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${painToneClass[card.tone]}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>{card.icon}</span>
                </div>
                <h3 className="font-display text-2xl mb-3">{card.title}</h3>
                <p className="text-on-surface-variant">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 px-6 bg-background text-center" id="solucao">
        <div className="max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-gold-accent text-5xl mb-6">diamond</span>
          <h2 className="font-display text-4xl leading-tight mb-8">{c.solution.title}</h2>
          <p className="text-lg text-on-surface-variant">{c.solution.body}</p>
        </div>
      </section>

      {/* Proof (demo) */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-clinical-gray/30">
            <img alt="Print real da demo Clínica Aurora" className="w-full h-auto object-cover aspect-video" src="/demo-aurora.jpg" />
          </div>
          <div className="lg:col-span-5 lg:pl-12 flex flex-col items-start gap-6">
            <h2 className="font-display text-4xl">{c.proof.title}</h2>
            <p className="text-on-surface-variant">{c.proof.body}</p>
            <Link href={c.demoUrl} className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors duration-300">
              <span className="material-symbols-outlined">visibility</span>
              {c.proof.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-24 px-6 bg-soft-beige">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-6">{c.roi.title}</h2>
          <p className="text-lg text-on-surface-variant mb-12">{c.roi.intro}</p>
          <div className="bg-white/70 backdrop-blur-sm border border-white/40 p-12 rounded-3xl">
            <div className="font-display text-5xl md:text-6xl text-gold-accent mb-2">{c.roi.value}</div>
            <div className="font-display text-2xl text-on-surface mb-4">{c.roi.valueLabel}</div>
            <p className="text-on-surface-variant max-w-lg mx-auto">{c.roi.footnote}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-background" id="como-funciona">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-4xl text-center mb-20">{c.steps.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-clinical-gray/40" />
            {c.steps.items.map((step) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 relative z-10 border-4 border-background ${step.highlight ? "bg-primary text-on-primary shadow-lg" : "bg-surface-container text-primary"}`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>{step.icon}</span>
                </div>
                <h3 className="font-display text-2xl mb-3">{step.title}</h3>
                <p className="text-on-surface-variant">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer + Lead capture */}
      <section className="py-24 px-6 bg-surface-container relative overflow-hidden" id="orcamento">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-4xl">{c.offer.title}</h2>
            <div className="p-6 bg-surface/60 backdrop-blur-sm rounded-2xl border border-clinical-gray/20">
              <p className="text-on-surface-variant">
                <strong className="text-on-surface block mb-1">{c.offer.badge}</strong>
                {c.offer.body} <span className="font-bold text-primary">{c.offer.price}</span>.
              </p>
              <p className="text-sm text-gold-accent uppercase tracking-widest mt-3">{c.offer.scarcity}</p>
            </div>
            <p className="text-on-surface-variant">{c.offer.formIntro}</p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-clinical-gray/40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-16 max-w-[1200px] mx-auto">
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="font-display text-2xl text-primary">{c.brand}</span>
            <p className="text-on-surface-variant max-w-sm">Tecnologia invisível, resultados palpáveis para clínicas de estética premium.</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wider mb-2">Links</span>
            <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/privacidade">Privacidade</Link>
            <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/termos">Termos de Uso</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wider mb-2">Contato</span>
            <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href={c.demoUrl}>Ver demo</Link>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#orcamento">Orçamento</a>
          </div>
        </div>
        <div className="text-center py-6 border-t border-clinical-gray/20 text-sm text-on-surface-variant/60">
          © {new Date().getFullYear()} {c.brand}. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
