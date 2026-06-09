import type { Metadata } from "next";
import { clientConfig } from "@/config/client";
import "./globals.css";

export const metadata: Metadata = {
  title: `${clientConfig.clinicName} | Estética de Luxo`,
  description: clientConfig.heroSubtitle,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  );
}
