import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COVER_HEIGHT,
  COVER_WIDTH,
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";

const SITE_URL = "https://estetia.estetiacrm.com.br";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = {
    url: `${SITE_URL}${post.image}`,
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    alt: post.imageAlt,
  };
  return {
    title: `${post.title} | Estetia`,
    description: post.aiDescription ?? post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.aiDescription ?? post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: { "@type": "Organization", name: "Estetia", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "pt-BR",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 py-4">
          <Link href="/" className="font-display text-2xl font-bold text-primary">
            Estetia
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-on-surface-variant hover:text-primary transition-colors">
              Blog
            </Link>
            <Link
              href="/#orcamento"
              className="inline-flex bg-primary text-on-primary px-5 py-2.5 rounded-full font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Quero meu site
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <nav className="text-sm text-on-surface-variant mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">
            ← Voltar ao blog
          </Link>
        </nav>

        <span className="text-xs uppercase tracking-widest text-gold-accent mb-4 block">
          {post.category}
        </span>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-on-surface-variant mb-10">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(`${post.date}T12:00:00`).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.imageAlt}
          width={COVER_WIDTH}
          height={COVER_HEIGHT}
          fetchPriority="high"
          className="w-full h-auto rounded-3xl border border-clinical-gray/30 shadow-sm mb-12"
        />

        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQ — rendered AND in JSON-LD */}
        <section className="mt-16">
          <h2 className="font-display text-3xl mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {post.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl border border-clinical-gray/30 p-6"
              >
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center gap-4">
                  {faq.question}
                  <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <p className="text-on-surface-variant leading-relaxed mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl mb-6">Leia também</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="bg-white rounded-2xl border border-clinical-gray/30 p-6 hover:-translate-y-1 hover:shadow-md transition-all"
                >
                  <span className="font-display text-lg leading-snug block mb-2">
                    {rel.title}
                  </span>
                  <span className="text-sm text-primary">Ler artigo →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 bg-soft-beige rounded-3xl p-8 md:p-10 text-center">
          <h2 className="font-display text-3xl mb-3">
            Sua clínica merece um site que enche a agenda
          </h2>
          <p className="text-on-surface-variant mb-6 max-w-lg mx-auto">
            Site de captação + automação de lembretes, entregues em 1 semana.
            Resposta humana em até 1 hora.
          </p>
          <Link
            href="/#orcamento"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            Quero meu site
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-clinical-gray/30 py-8 text-center text-sm text-on-surface-variant">
        © {new Date().getFullYear()} Estetia ·{" "}
        <Link href="/" className="hover:text-primary transition-colors">Home</Link> ·{" "}
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
      </footer>
    </div>
  );
}
