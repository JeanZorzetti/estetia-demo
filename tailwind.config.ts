import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // These map to CSS custom properties set from clientConfig in layout.tsx.
        // To swap client theme, edit src/config/client.ts only.
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};

export default config;
