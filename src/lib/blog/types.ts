export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Fact-dense description for LLMs/AI Overviews (used as meta description). */
  aiDescription?: string;
  /** HTML string. Allowed building blocks: p, h2, h3, ul/ol/li, table, strong, a,
   *  and div.callout-stat / div.callout-warning / div.callout-cta. */
  content: string;
  date: string;
  lastModified?: string;
  category: string;
  /** Path under /public/blog — one image per post, 1200x630 (og:image ratio). */
  image: string;
  /** Required: describes the photo itself, not the article. Feeds <img alt> and og:image:alt. */
  imageAlt: string;
  author: string;
  /** 8-12 entries — rendered on page AND emitted as FAQPage JSON-LD. */
  faqs: FAQItem[];
  relatedSlugs?: string[];
}
