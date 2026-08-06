import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F5",
        "background-secondary": "#F3F0E8",
        card: "#FFFFFF",
        border: "rgba(31,27,20,0.10)",
        foreground: "#231F1B",
        muted: "#6B6459",
        ink: {
          DEFAULT: "#211D18",
          secondary: "#2B2620",
          card: "#2E2922",
          foreground: "#FAF9F5",
          muted: "#ABA294",
          border: "rgba(250,249,245,0.12)",
        },
        accent: {
          DEFAULT: "#D97757",
          secondary: "#BF5D3E",
          soft: "#F0DACB",
        },
        clay: {
          DEFAULT: "#C2704C",
          secondary: "#9C5836",
        },
        sage: {
          DEFAULT: "#6B7A5E",
          secondary: "#4F5C44",
        },
        cloud: {
          DEFAULT: "#6E7C87",
          secondary: "#4C5960",
        },
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-fraunces)", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #D97757 0%, #C2704C 50%, #BF5D3E 100%)",
        "gradient-sunset": "linear-gradient(135deg, #BF5D3E 0%, #D97757 45%, #DA9A5D 100%)",
        "gradient-glow": "radial-gradient(circle at center, rgba(217,119,87,0.16) 0%, transparent 70%)",
        "gradient-ink": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(217,119,87,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(107,122,94,0.16) 0%, transparent 60%), #211D18",
        "paper-grid": "linear-gradient(rgba(31,27,20,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(31,27,20,0.05) 1px, transparent 1px)",
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 40px rgba(217, 119, 87, 0.18)",
        "glow-lg": "0 0 80px rgba(217, 119, 87, 0.24)",
        card: "0 2px 10px rgba(35, 31, 27, 0.06)",
        "card-lg": "0 20px 60px rgba(35, 31, 27, 0.10)",
        "ink-glow": "0 0 60px rgba(217, 119, 87, 0.22)",
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
        "spin-slow-reverse": "spin-reverse 55s linear infinite",
        "ferris-spin": "ferris-spin 14s linear infinite",
        "ferris-spin-reverse": "ferris-spin-reverse 14s linear infinite",
        blink: "blink 1.1s step-end infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "ferris-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "ferris-spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
