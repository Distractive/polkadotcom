import type { Metadata } from "next"
import { manrope, unbounded } from "@/styles/fonts"

import { TailwindIndicator } from "@/components/tailwind-indicator"

import "@shared/ui/styles/global.css"

import { getFooter } from "@/sanity/queries/footer"
import { cn } from "@shared/ui/lib/utils"

import FooterLayout from "@/features/footer/layout"

export const metadata: Metadata = {
  title: "Polkadot: Web3 Interoperability | Decentralized Blockchain",
  description:
    "Polkadot empowers blockchain networks to work together under the protection of shared security.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const footer = await getFooter()

  return (
    <html lang="en">
      <body
        className={cn(
          unbounded.variable,
          manrope.variable,
          "font-default antialiased"
        )}
      >
        <main className="grid-system gap-page py-page">{children}</main>
        <FooterLayout footer={footer} />
        <TailwindIndicator />
      </body>
    </html>
  )
}
