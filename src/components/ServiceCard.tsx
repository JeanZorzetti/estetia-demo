import type { Service } from "@/config/client";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-soft-beige p-8 rounded-lg group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-transparent hover:border-clinical-gray">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 text-primary shadow-sm">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          {service.icon}
        </span>
      </div>
      <h3 className="font-display text-xl mb-3 text-on-surface">{service.name}</h3>
      <p className="text-on-surface-variant mb-6 flex-grow leading-relaxed">
        {service.description}
      </p>
      <a
        className="inline-flex items-center text-primary text-sm font-medium uppercase tracking-wide hover:text-gold-accent transition-colors mt-auto"
        href="#agendar"
      >
        Saiba mais
        <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
      </a>
    </div>
  );
}
