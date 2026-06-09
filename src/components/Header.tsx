import { clientConfig } from "@/config/client";

export default function Header() {
  return (
    <nav className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-sm border-b border-transparent transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 h-16">
        <a className="font-display text-xl text-primary tracking-tight" href="#">
          {clientConfig.clinicName}
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <a className="text-secondary hover:text-primary transition-colors" href="#tratamentos">
            Tratamentos
          </a>
          <a className="text-secondary hover:text-primary transition-colors" href="#sobre">
            Sobre
          </a>
          <a className="text-secondary hover:text-primary transition-colors" href="#agendar">
            Contato
          </a>
        </div>
        <a
          className="inline-flex items-center justify-center bg-primary text-on-primary text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300"
          href="#agendar"
        >
          {clientConfig.cta}
        </a>
      </div>
    </nav>
  );
}
