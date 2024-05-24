import sharedConfig from "@shared/tailwind-config"
import type { Config } from "tailwindcss"

const config = {
  ...sharedConfig,
  content: [
    "./src/stories/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
    "../web/features/**/*.{ts,tsx}",
    "../web/styles/**/*.{ts,tsx}",
  ],
} satisfies Config

export default config
