import type { Metadata } from "next";
import { clientConfig } from "@/config/client";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clínica Estética Demo",
  description: "Demo para clínica estética",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      style={
        {
          "--color-primary": clientConfig.primaryColor,
          "--color-accent": clientConfig.accentColor,
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  );
}
