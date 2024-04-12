import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/stories/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  
} satisfies Config

export default config
