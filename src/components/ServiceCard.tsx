import type { Service } from "@/config/client";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white border border-accent rounded-2xl p-6 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-primary font-semibold text-lg">{service.name}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}
