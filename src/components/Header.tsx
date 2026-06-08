import { clientConfig } from "@/config/client";

export default function Header() {
  return (
    <header className="bg-white border-b border-accent">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-primary font-bold text-xl tracking-tight">
          {clientConfig.clinicName}
        </span>
        <a
          href="#agendamento"
          className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          {clientConfig.copy.cta}
        </a>
      </div>
    </header>
  );
}
