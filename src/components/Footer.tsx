import { clientConfig } from "@/config/client";

export default function Footer() {
  const { contact } = clientConfig;
  return (
    <footer className="bg-surface-container w-full py-10 border-t border-clinical-gray">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-secondary">
        <div>
          <span className="font-display text-2xl text-primary block mb-4">
            {clientConfig.clinicName}
          </span>
          <p className="text-sm mb-4">
            Beleza &amp; bem-estar atemporais. Uma clínica de estética de luxo
            focada na sua melhor versão.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-on-surface mb-4">
            Contato
          </h4>
          <ul className="space-y-2 text-sm">
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
            <li className="mt-4">
              <span className="block font-medium text-on-surface">Endereço</span>
              {contact.address}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-on-surface mb-4">
            Horário de Funcionamento
          </h4>
          <ul className="space-y-2 text-sm">
            {contact.hours.map((h) => (
              <li key={h} className="border-b border-clinical-gray/30 pb-1">
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-on-surface mb-4">
            Links Úteis
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-gold-accent transition-colors" href="#">
                Termos de Uso
              </a>
            </li>
            <li>
              <a className="hover:text-gold-accent transition-colors" href="#">
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-4 text-center mt-8 pt-8 border-t border-clinical-gray/50 text-xs">
          © {new Date().getFullYear()} {clientConfig.clinicName}. Todos os
          direitos reservados.
        </div>
      </div>
    </footer>
  );
}
