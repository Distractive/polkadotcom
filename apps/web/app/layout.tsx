import type { Metadata } from "next"
import { inter, unbounded } from "@/styles/fonts"

import { TailwindIndicator } from "@/components/tailwind-indicator"

import "@shared/ui/styles/global.css"

import { getFooterMenu } from "@/sanity/queries/footer"
import { cn } from "@shared/ui/lib/utils"

import Menu from "@/features/footer/menu"
import SocialLinks from "@/features/footer/social-links"

export const metadata: Metadata = {
  title: "Polkadot: Web3 Interoperability | Decentralized Blockchain",
  description:
    "Polkadot empowers blockchain networks to work together under the protection of shared security.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const footerMenu = await getFooterMenu()

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
        <footer className="bg-[#0B064A]">
          <Menu menu={footerMenu.menu} />
          <SocialLinks items={footerMenu.socialLinks} />
        </footer>
        <TailwindIndicator />
      </body>
    </html>
  )
}
