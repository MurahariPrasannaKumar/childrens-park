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
        background: "#0A0A0A",
        "background-secondary": "#141414",
        card: "#161616",
        border: "rgba(255,255,255,0.12)",
        foreground: "#FFFFFF",
        muted: "#A3A3A3",
        night: {
          DEFAULT: "#000000",
          secondary: "#0A0A0A",
          card: "#161616",
          foreground: "#FFFFFF",
          muted: "#A3A3A3",
          border: "rgba(255,255,255,0.12)",
        },
        accent: {
          DEFAULT: "#FFB020",
          secondary: "#E3900A",
        },
        coral: {
          DEFAULT: "#FF6B57",
          secondary: "#E8482F",
        },
        violet: {
          DEFAULT: "#7C5CFC",
          secondary: "#5B3DDB",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-bebas-neue)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #FFB020 0%, #FF6B57 50%, #7C5CFC 100%)",
        "gradient-sunset": "linear-gradient(135deg, #FF6B57 0%, #FFB020 50%, #7C5CFC 100%)",
        "gradient-glow": "radial-gradient(circle at center, rgba(255,176,32,0.18) 0%, transparent 70%)",
        "gradient-night": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,92,252,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(255,107,87,0.25) 0%, transparent 60%), #000000",
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 176, 32, 0.18)",
        "glow-lg": "0 0 80px rgba(255, 176, 32, 0.25)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
        "card-lg": "0 20px 60px rgba(0, 0, 0, 0.5)",
        "night-glow": "0 0 60px rgba(124, 92, 252, 0.25)",
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
        "spin-slow-reverse": "spin-reverse 55s linear infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
