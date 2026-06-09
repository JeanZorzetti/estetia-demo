import { clientConfig } from "@/config/client";

export default function WhyUs() {
  return (
    <section className="py-24 bg-background" id="sobre">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {clientConfig.pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-gold-accent">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: '"wght" 200' }}
                >
                  {pillar.icon}
                </span>
              </div>
              <h3 className="font-display text-2xl mb-4 text-on-surface">
                {pillar.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
