import { BlogPost } from "./types";

import { post as quantoCustaSite } from "./posts/quanto-custa-site-para-clinica-de-estetica";
import { post as siteGuia } from "./posts/site-para-clinica-de-estetica-guia";
import { post as exemplosSites } from "./posts/exemplos-sites-clinica-estetica";
import { post as agendamentoOnline } from "./posts/site-clinica-estetica-agendamento-online";
import { post as landingPage } from "./posts/landing-page-clinica-de-estetica";
import { post as wixOuProfissional } from "./posts/wix-ou-site-profissional-clinica-estetica";
import { post as quantoTempoLeva } from "./posts/quanto-tempo-leva-site-clinica-estetica";
import { post as briefing } from "./posts/briefing-site-clinica-de-estetica";
import { post as quandoRefazer } from "./posts/quando-refazer-site-clinica-de-estetica";

export type { BlogPost, FAQItem } from "./types";

export const blogPosts: BlogPost[] = [
  quantoCustaSite,
  siteGuia,
  exemplosSites,
  agendamentoOnline,
  landingPage,
  wixOuProfissional,
  quantoTempoLeva,
  briefing,
  quandoRefazer,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return (post.relatedSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p));
}
