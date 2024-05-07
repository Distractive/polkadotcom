import sharedConfig from "@shared/tailwind-config"
import type { Config } from "tailwindcss"

const config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
} satisfies Config

export default config
