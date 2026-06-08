import { clientConfig } from "@/config/client";

export default function Hero() {
  return (
    <section className="bg-accent py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-primary leading-tight">
          {clientConfig.copy.hero}
        </h1>
        <p className="text-lg text-primary/80">{clientConfig.tagline}</p>
        <a
          href="#agendamento"
          className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          {clientConfig.copy.cta}
        </a>
      </div>
    </section>
  );
}
