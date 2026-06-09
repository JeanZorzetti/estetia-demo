import { clientConfig } from "@/config/client";
import ServiceCard from "@/components/ServiceCard";

export default function ServiceList() {
  return (
    <section className="py-24 bg-warm-white relative" id="tratamentos">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="text-center mb-16">
          <span className="text-sm text-sage-muted tracking-widest uppercase mb-4 block">
            {clientConfig.servicesEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-on-surface">
            {clientConfig.servicesTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clientConfig.services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
