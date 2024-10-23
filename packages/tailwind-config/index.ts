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
      // Body
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",

      // Caps
      "caps-xs": ["0.75rem", { letterSpacing: "0.02em" }],
      "caps-sm": ["0.875rem", { letterSpacing: "0.02rem" }],
      "caps-base": ["1rem", { letterSpacing: "0.02em" }],
      "caps-lg": ["1.125rem", { letterSpacing: "0.02em" }],

      // Headings
      xl: "1.2rem",
      "2xl": "1.25rem",
      "3xl": "1.44rem",
      "4xl": "1.563rem",
      "5xl": "1.728rem",
      "6xl": "1.953rem",
      "7xl": "2.074rem",
      "8xl": "2.441rem",
      "9xl": "2.488rem",
      "10xl": "3.052rem",
    },

    lineHeight: {
      snug: "1.2",
      normal: "1.3",
      relaxed: "1.4",
      slack: "1.5",
      roomy: "1.7",
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
      white: "#ffffff",
      "grey-25": "#F8FAFB",
      "grey-50": "#F4F6F9",
      "grey-100": "#ECEFF3",
      "grey-200": "#DCE2E9",
      "grey-300": "#C6CFDB",
      "grey-400": "#AEB7CB",
      "grey-500": "#99A1BB",
      "grey-600": "#8389A8",
      "grey-700": "#6E7391",
      "grey-800": "#5C6077",
      "grey-900": "#4E5261",
      "grey-950": "#2D2F39",
      "pink-50": "#FFF0F4",
      "pink-100": "#FFE2EA",
      "pink-200": "#FFCADA",
      "pink-300": "#FF9FBB",
      "pink-400": "#FF6998",
      "pink-500": "#FF2670",
      "pink-600": "#ED1166",
      "pink-700": "#C80858",
      "pink-800": "#A80950",
      "pink-900": "#500124",
      pink: "#FF2670",
      lime: "#E4FF07",
      cyan: "#07FFFF",
      purple: "#7916F3",
      // greyLavender: "#DCDFEF",
      // grey: "#E1E3F1",
      // greyBlue: "#C8CCE4",
      // lightGrey: "#F4F6FA",
      // blue: "#111F77",
      current: "currentColor",
    },
    extend: {
      textColor: {
        DEFAULT: "#6E7391",
      },
      gridAutoRows: {
        "1fr": "1fr",
      },
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
      objectPosition: {
        "-20rem": "-20rem",
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
