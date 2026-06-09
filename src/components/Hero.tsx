/* eslint-disable @next/next/no-img-element */
import { clientConfig } from "@/config/client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Interior da clínica de estética"
          className="w-full h-full object-cover object-center"
          src={clientConfig.heroImage}
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 pt-20 md:pt-0">
          <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
            {clientConfig.welcome}
          </span>
          <h1 className="font-display text-5xl md:text-[64px] leading-tight text-on-surface mb-6">
            {clientConfig.hero}
          </h1>
          <p className="text-lg text-on-surface-variant mb-10 max-w-lg">
            {clientConfig.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a
              className="inline-flex items-center justify-center bg-primary text-on-primary text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded w-full sm:w-auto hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 shadow-md"
              href="#agendar"
            >
              {clientConfig.cta}
            </a>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <span
                className="material-symbols-outlined text-gold-accent text-lg"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                verified
              </span>
              <span>{clientConfig.trustBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
