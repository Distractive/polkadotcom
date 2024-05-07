import type { Metadata } from "next"
import { inter, unbounded } from "@/styles/fonts"

import { TailwindIndicator } from "@/components/tailwind-indicator"

import "@shared/ui/styles/global.css"

import { cn } from "@shared/ui/lib/utils"

export const metadata: Metadata = {
  title: "Polkadot: Web3 Interoperability | Decentralized Blockchain",
  description:
    "Polkadot empowers blockchain networks to work together under the protection of shared security.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          unbounded.variable,
          inter.variable,
          "font-default antialiased"
        )}
      >
        {children}
        <TailwindIndicator />
      </body>
    </html>
  )
}
