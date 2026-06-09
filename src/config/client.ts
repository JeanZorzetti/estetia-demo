export type Service = {
  name: string;
  description: string;
  /** Material Symbols Outlined icon name */
  icon: string;
};

export type Pillar = {
  title: string;
  description: string;
  icon: string;
};

export type ClientConfig = {
  clinicName: string;
  welcome: string;
  hero: string;
  heroSubtitle: string;
  trustBadge: string;
  heroImage: string;
  servicesEyebrow: string;
  servicesTitle: string;
  services: Service[];
  pillars: Pillar[];
  bookingTitle: string;
  bookingSubtitle: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string[];
  };
  cta: string;
};

export const clientConfig: ClientConfig = {
  clinicName: "Clínica Aurora",
  welcome: "Bem-vindo à Aurora",
  hero: "Sua melhor versão começa aqui",
  heroSubtitle:
    "Tratamentos estéticos de alta performance em um ambiente de luxo e serenidade.",
  trustBadge: "+2.000 pacientes • Profissionais certificados",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADkoyXMc_AZahyg_F_vfsAUg36VLq51tE-wyJWHnhHMSP8JXlt3HzHIRLiFPzuKxM5B6Z9pc2mNcv61iA6hwRcizy9xmDs4KMmMhUndx5Zo5aV6hUJQSyt-VHklczav6p_56zK3JZp5CX2FwFgCxpB8gvnCeBynkC_fYm2yfyQCaWnyKi1VL_7lFMtmI9PP9e5z-oj0t5F3Ohv8GGL94Vbtl46-BKhH9Jz1wW38PHuaC7PVUgRUem294PkehW0T6O402kGmFewyZU",
  servicesEyebrow: "Nossos Procedimentos",
  servicesTitle: "Excelência em Estética",
  services: [
    {
      name: "Limpeza de Pele",
      description:
        "Renovação celular profunda para uma pele luminosa, livre de impurezas e com textura aveludada.",
      icon: "spa",
    },
    {
      name: "Botox",
      description:
        "Suavização de linhas de expressão com naturalidade, prevenindo o envelhecimento e relaxando a musculatura facial.",
      icon: "face_retouching_natural",
    },
    {
      name: "Peeling",
      description:
        "Tratamento clareador e rejuvenescedor que estimula a produção de colágeno, reduzindo manchas e cicatrizes.",
      icon: "auto_awesome",
    },
    {
      name: "Skincare",
      description:
        "Protocolos personalizados de hidratação e nutrição para manter os resultados e a saúde da sua pele em dia.",
      icon: "water_drop",
    },
  ],
  pillars: [
    {
      title: "Profissionais Qualificados",
      description:
        "Nossa equipe é formada por especialistas altamente treinados e em constante atualização para garantir segurança e resultados de excelência.",
      icon: "workspace_premium",
    },
    {
      title: "Ambiente Acolhedor",
      description:
        "Cada detalhe da clínica foi pensado para proporcionar uma experiência de puro relaxamento, luxo e tranquilidade do início ao fim.",
      icon: "local_florist",
    },
    {
      title: "Resultados Reais",
      description:
        "Utilizamos tecnologia de ponta e protocolos baseados em evidências para entregar transformações visíveis e duradouras que realçam sua beleza natural.",
      icon: "trending_up",
    },
  ],
  bookingTitle: "Agende sua Avaliação",
  bookingSubtitle:
    "Preencha o formulário abaixo e nossa equipe entrará em contato.",
  contact: {
    phone: "(11) 99999-9999",
    email: "contato@clinicaaurora.com.br",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo, SP - 01310-100",
    hours: ["Seg - Sex: 08:00 - 20:00", "Sábados: 09:00 - 15:00", "Domingos: Fechado"],
  },
  cta: "Agendar Avaliação",
};
