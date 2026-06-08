import { clientConfig } from "@/config/client";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-semibold text-lg">{clientConfig.clinicName}</span>
        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} {clientConfig.clinicName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
