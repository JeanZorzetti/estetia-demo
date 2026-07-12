// @vitest-environment node
import { describe, it, expect } from "vitest";
import { blogPosts, getPostBySlug } from "@/lib/blog";

const slugs = new Set(blogPosts.map((p) => p.slug));
// non-blog routes an article may legitimately link to (src/app/*)
const siteRoutes = new Set(["/", "/demo", "/privacidade", "/termos"]);

describe("blog data", () => {
  it("has unique slugs", () => {
    expect(slugs.size).toBe(blogPosts.length);
  });

  it.each(blogPosts.map((p) => [p.slug, p] as const))(
    "%s: 8-12 FAQs, links and relatedSlugs resolve",
    (_slug, post) => {
      expect(post.faqs.length).toBeGreaterThanOrEqual(8);
      expect(post.faqs.length).toBeLessThanOrEqual(12);

      for (const related of post.relatedSlugs ?? []) {
        expect(getPostBySlug(related), `relatedSlug ${related}`).toBeDefined();
      }

      // internal links: posts need the /blog/ prefix and a real slug; anything
      // else must be an existing site route (a bare "/slug" would 404)
      for (const [, href] of post.content.matchAll(/href="(\/[^"#]*)"/g)) {
        if (href.startsWith("/blog/")) {
          expect(slugs.has(href.slice("/blog/".length)), `dead link ${href}`).toBe(true);
        } else {
          expect(siteRoutes.has(href), `unknown route ${href}`).toBe(true);
        }
      }
    }
  );
});
