import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sage + warm neutrals + gold accent (from the approved Stitch design).
        primary: "#56642b",
        "primary-container": "#d9eaa3",
        "on-primary": "#ffffff",
        "on-primary-container": "#253000",
        "sage-muted": "#7B8A51",
        "gold-accent": "#C5A059",
        background: "#fbf9f8",
        surface: "#fbf9f8",
        "surface-container": "#efeded",
        "warm-white": "#F9F8F6",
        "soft-beige": "#E9E5E0",
        "clinical-gray": "#D1D1D1",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#46483c",
        secondary: "#5e5e5d",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
