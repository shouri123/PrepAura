/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Design System Tokens
        "background-base": "#090909",
        "background-elevated": "#0D0D0D",
        "surface": "#121212",
        "surface-elevated": "#171717",
        "surface-container": "#201f1f",
        "surface-container-low": "#1c1b1b",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-bright": "#1F1F1F",
        "surface-dim": "#131313",
        "surface-variant": "#353534",

        "border-hairline": "#242424",
        "border-strong": "#303030",

        "primary-container": "#ff6a00",
        "orange-hover": "#FF7A1A",
        "orange-border": "rgba(255, 106, 0, 0.35)",
        "orange-border-focus": "rgba(255, 106, 0, 0.65)",
        "orange-subtle": "rgba(255, 106, 0, 0.10)",

        "text-primary": "#F5F5F5",
        "text-secondary": "#A1A1A1",
        "text-muted": "#6F6F6F",

        "semantic-success": "#7FD38A",
        "semantic-warning": "#E6B35A",
        "semantic-error": "#E56B6F",
        "semantic-error-subtle": "rgba(229, 107, 111, 0.12)",

        // Shadcn UI Semantic Variables
        border: "#242424",
        input: "#242424",
        ring: "#ff6a00",
        background: "#090909",
        foreground: "#F5F5F5",
        primary: {
          DEFAULT: "#ff6a00",
          foreground: "#090909",
        },
        secondary: {
          DEFAULT: "#1c1b1b",
          foreground: "#F5F5F5",
        },
        destructive: {
          DEFAULT: "#E56B6F",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1c1b1b",
          foreground: "#A1A1A1",
        },
        accent: {
          DEFAULT: "#201f1f",
          foreground: "#F5F5F5",
        },
        popover: {
          DEFAULT: "#121212",
          foreground: "#F5F5F5",
        },
        card: {
          DEFAULT: "#121212",
          foreground: "#F5F5F5",
        },
        // Antique Modern Tokens
        "parchment": "#FAF7F2",
        "parchment-deep": "#F3ECE2",
        "lapis": "#1E1B4B",
        "lapis-muted": "#312E81",
        "antique-gold": "#D97706",
        "antique-gold-deep": "#B45309",
        "terracotta": "#E05A47",
        "celadon": "#0F766E",
        "celadon-light": "#CCFBF1",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        "2xl": "1rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "sans-serif"],
        serif: ["Fraunces", "Playfair Display", "serif"],
        modern: ["Plus Jakarta Sans", "Geist", "sans-serif"],
        display: ["Geist", "sans-serif"],
        "display-mobile": ["Geist", "sans-serif"],
        h1: ["Geist", "sans-serif"],
        "h1-mobile": ["Geist", "sans-serif"],
        h2: ["Geist", "sans-serif"],
        h3: ["Geist", "sans-serif"],
        "metric-display": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "body-sm": ["Geist", "sans-serif"],
        caption: ["Geist", "sans-serif"],
        "label-caps": ["Geist", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "400" }],
        display: ["64px", { lineHeight: "72px", letterSpacing: "-0.025em", fontWeight: "600" }],
        caption: ["13px", { lineHeight: "18px", letterSpacing: "0em", fontWeight: "400" }],
        h2: ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "metric-display": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "0em", fontWeight: "400" }],
        h1: ["44px", { lineHeight: "52px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h1-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.12em", fontWeight: "500" }],
      },
      spacing: {
        "page-padding-desktop": "2.5rem",
        "page-padding-mobile": "1.25rem",
        "sidebar-width": "260px",
        "container-max": "1440px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};