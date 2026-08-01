import type { MetadataRoute } from "next";

// Whitelist explícita de crawlers de IA (GEO-01). O `Allow: /` do bloco `*` já cobria todos —
// o que a lista nominal muda é auditoria: é ela que as ferramentas GEO/AEO leem, e é ela que
// registra a decisão para quem mexer depois.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
];

const DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: "https://estetia.estetiacrm.com.br/sitemap.xml",
  };
}
