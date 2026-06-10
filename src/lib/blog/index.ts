import { BlogPost } from "./types";

import { post as quantoCustaSite } from "./posts/quanto-custa-site-para-clinica-de-estetica";
import { post as siteGuia } from "./posts/site-para-clinica-de-estetica-guia";
import { post as exemplosSites } from "./posts/exemplos-sites-clinica-estetica";

export type { BlogPost, FAQItem } from "./types";

export const blogPosts: BlogPost[] = [quantoCustaSite, siteGuia, exemplosSites];

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
