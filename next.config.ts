import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/blog/quanto-custa-site-clinica-estetica",
        destination: "/blog/quanto-custa-site-para-clinica-de-estetica",
        permanent: true,
      },
      {
        source: "/blog/site-para-clinica-de-estetica",
        destination: "/blog/site-para-clinica-de-estetica-guia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
