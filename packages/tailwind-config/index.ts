import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "22.5rem",
      md: "45.5rem",
      lg: "64rem",
      xl: "90rem",
      "2xl": "120rem",
    },
    fontFamily: {
      display: ["var(--font-unbounded)", "system-ui", "sans-serif"],
      default: ["var(--font-manrope)", "system-ui", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.125rem",
      "5xl": "2.5rem",
      "6xl": "2.75rem",
      "7xl": "3.25rem",
    },
    lineHeight: {
      snug: "1.2",
      normal: "1.3",
      relaxed: "1.4",
      slack: "1.5",
      roomy: "1.6",
    },
    fontWeight: {
      light: "300",
      medium: "400",
      bold: "600",
    },
    letterSpacing: {
      wide: "0.02em",
    },
    colors: {
      black: "#000000",
      "grey-100": "#FAF9F9",
      "grey-200": "#F3F3F4",
      "grey-300": "#E7E7EC",
      "grey-400": "#D5D4D8",
      "grey-500": "#4C4C4C",
      white: "#ffffff",
      pink: "#E6007A",
      purple: "#552BBF",
      "purple-400": "#3B00CF",
      "purple-500": "#0B064A",
      current: "currentColor",
    },
    extend: {
      spacing: {
        page: "var(--spacing-page)",
        section: "var(--spacing-section)",
        card: "var(--spacing-card)",
        copy: "var(--spacing-copy)",
        gutter: "var(--spacing-gutter)",
        nav: "var(--spacing-nav)",
        "nav-height": "var(--spacing-nav-height)",
        "header-top": "var(--spacing-header-top)",
      },
      boxShadow: {
        card: "0px 24px 32px 0px rgba(0, 0, 0, 0.05)",
        "internal-border": "1px 1px 0px 0px #E7E7EC",
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
      },
      transition: {
        visibility: "visibility, opacity",
        backdropBlur: "backdrop-filter",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)")
    }),
  ],
} satisfies Config

export default config
