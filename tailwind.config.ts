import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "page-bg": "#F2E2CB",
        "warm-ivory": "#F2E2CB",
        ivory: "#F2E2CB",
        champagne: "#F2E2CB",
        "antique-gold": "#D4A04A",
        gold: "#D4A04A",
        "deep-burgundy": "#76252F",
        burgundy: "#76252F",
        "dusty-rose": "#E9D6D2",
        "muted-sage": "#64745B",
        "sage-green": "#64745B",
        "dark-brown": "#2C1E18",
        brown: "#2C1E18",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "-apple-system", "sans-serif"],
        accent: ["var(--font-italiana)", "serif"],
        italiana: ["var(--font-italiana)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
