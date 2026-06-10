import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Estetia — Captação de pacientes para clínicas de estética",
  description:
    "Guias práticos sobre site, captação de pacientes e marketing digital para donos de clínica de estética. Sem teoria vazia: números, checklists e exemplos reais.",
  alternates: { canonical: "https://estetia.estetiacrm.com.br/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 py-4">
          <Link href="/" className="font-display text-2xl font-bold text-primary">
            Estetia
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/demo" className="text-on-surface-variant hover:text-primary transition-colors">
              Ver demo
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

      <main className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-2xl mb-14">
          <span className="text-sm text-sage-muted tracking-widest uppercase mb-3 block">
            Blog Estetia
          </span>
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Captação de pacientes para clínicas de estética
          </h1>
          <p className="text-on-surface-variant text-lg">
            Guias práticos sobre site, marketing e automação — escritos para
            donos de clínica, com números e checklists. Zero teoria vazia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-clinical-gray/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.imageAlt ?? post.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs uppercase tracking-widest text-gold-accent mb-3">
                  {post.category}
                </span>
                <h2 className="font-display text-xl leading-snug mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                  Ler artigo
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-clinical-gray/30 py-8 text-center text-sm text-on-surface-variant">
        © {new Date().getFullYear()} Estetia ·{" "}
        <Link href="/" className="hover:text-primary transition-colors">Home</Link> ·{" "}
        <Link href="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link>
      </footer>
    </div>
  );
}
