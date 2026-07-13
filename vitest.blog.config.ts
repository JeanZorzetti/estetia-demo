import { defineConfig } from "vitest/config";
import path from "node:path";

// isolated config: the default setup (jsdom + jest-dom) is broken by this machine's
// corrupted pnpm store — blog data needs neither
export default defineConfig({
  test: { environment: "node", include: ["src/__tests__/blog-data.test.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
