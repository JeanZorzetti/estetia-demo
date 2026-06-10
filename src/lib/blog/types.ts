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
  image: string;
  imageAlt?: string;
  author: string;
  /** 8-12 entries — rendered on page AND emitted as FAQPage JSON-LD. */
  faqs: FAQItem[];
  relatedSlugs?: string[];
}
