export type Service = {
  name: string;
  description: string;
};

export type ClientConfig = {
  clinicName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  services: Service[];
  copy: {
    hero: string;
    cta: string;
  };
};

export const clientConfig: ClientConfig = {
  clinicName: "Clínica Estética Demo",
  tagline: "Beleza e bem-estar ao seu alcance",
  primaryColor: "#7C5CBF",
  accentColor: "#F0E6FF",
  services: [
    { name: "Limpeza de Pele", description: "Tratamento facial profundo" },
    { name: "Botox", description: "Suavização de linhas de expressão" },
    { name: "Peeling", description: "Renovação celular e luminosidade" },
  ],
  copy: {
    hero: "Descubra tratamentos estéticos de excelência",
    cta: "Agende sua consulta",
  },
};
