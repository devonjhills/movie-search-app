import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Film Noir Design System Extensions
        "noir-shadow": "hsl(var(--noir-shadow))",
        "noir-highlight": "hsl(var(--noir-highlight))",
        "femme-fatale": "hsl(var(--femme-fatale))",
        champagne: "hsl(var(--champagne))",
        "cigarette-smoke": "hsl(var(--cigarette-smoke))",
        "venetian-blind": "hsl(var(--venetian-blind))",
        "rating-gold": {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        // Enhanced typography scale with better line heights for noir aesthetic
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "3.25rem" }],
        "6xl": ["3.75rem", { lineHeight: "4rem" }],
        // Dramatic noir typography
        hero: ["4.5rem", { lineHeight: "4.75rem", letterSpacing: "-0.025em" }],
        "noir-title": [
          "2.5rem",
          { lineHeight: "2.75rem", letterSpacing: "-0.01em" },
        ],
      },
      animation: {
        // Film noir inspired animations
        "fade-in-noir": "fadeInNoir 0.8s ease-out forwards",
        "slide-in-shadow": "slideInShadow 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "venetian-blind": "venetianBlind 1.2s ease-in-out forwards",
      },
      keyframes: {
        fadeInNoir: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInShadow: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        venetianBlind: {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0% 0)" },
        },
      },
      boxShadow: {
        // Noir-inspired shadows
        "noir-soft": "0 2px 8px hsl(var(--noir-shadow) / 0.15)",
        "noir-medium": "0 4px 16px hsl(var(--noir-shadow) / 0.25)",
        "noir-dramatic": "0 8px 32px hsl(var(--noir-shadow) / 0.4)",
        "noir-crimson": "0 4px 20px hsl(var(--primary) / 0.3)",
        "noir-gold": "0 4px 16px hsl(var(--accent) / 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
