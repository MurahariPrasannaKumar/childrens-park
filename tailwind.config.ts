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
        background: "#F7FCF8",
        "background-secondary": "#ECF7EF",
        card: "#FFFFFF",
        border: "rgba(18,53,36,0.10)",
        foreground: "#123524",
        muted: "#607568",
        ink: {
          DEFAULT: "#063B22",
          secondary: "#07502E",
          card: "#0B4A2A",
          foreground: "#F5FFF8",
          muted: "#B8D4C1",
          border: "rgba(245,255,248,0.12)",
        },
        accent: {
          DEFAULT: "#168A4A",
          secondary: "#0F6B38",
          soft: "#DDF4E5",
        },
        clay: {
          DEFAULT: "#6FA83C",
          secondary: "#4C8C2C",
        },
        sage: {
          DEFAULT: "#2F7A52",
          secondary: "#1F5A38",
        },
        cloud: {
          DEFAULT: "#1E8F6F",
          secondary: "#14684F",
        },
        lime: "#B8E85B",
        mint: "#CFF7DC",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-fraunces)", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #168A4A 0%, #24A95E 50%, #8BDFA7 100%)",
        "gradient-sunset": "linear-gradient(90deg, #07552C 0%, #168A4A 45%, #45C878 100%)",
        "gradient-glow": "radial-gradient(circle at center, rgba(22,138,74,0.16) 0%, transparent 70%)",
        "gradient-ink": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(36,169,94,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(168,230,188,0.14) 0%, transparent 60%)",
        "paper-grid": "linear-gradient(rgba(18,53,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,53,36,0.04) 1px, transparent 1px)",
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 40px rgba(22, 138, 74, 0.18)",
        "glow-lg": "0 0 80px rgba(22, 138, 74, 0.24)",
        card: "0 4px 18px rgba(18, 53, 36, 0.06)",
        "card-lg": "0 20px 60px rgba(18, 53, 36, 0.10)",
        "ink-glow": "0 0 60px rgba(36, 169, 94, 0.22)",
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
