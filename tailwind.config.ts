import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        prism: {
          navy: "#0A192F",
          dark: "#0F243E",
          primary: "#16467B",
          blue: "#1E5CA8",
          azure: "#2E86DE",
          sky: "#5FA8E6",
          ice: "#F0F5FA",
          charcoal: "#1A222C",
          muted: "#5B6877",
          border: "#E2E8F0",
          card: "#FFFFFF",
          gold: "#C5A880",
          "gold-light": "#F7F3EE",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(10, 25, 47, 0.04)",
        card: "0 4px 20px rgba(10, 25, 47, 0.06)",
        hover: "0 10px 30px rgba(10, 25, 47, 0.10)",
        elevated: "0 20px 40px rgba(10, 25, 47, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
