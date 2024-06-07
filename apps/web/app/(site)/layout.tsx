import type { Metadata } from "next"
import { manrope, unbounded } from "@/styles/fonts"
import { GoogleAnalytics } from "@next/third-parties/google"

import { TailwindIndicator } from "@/components/tailwind-indicator"

import "@shared/ui/styles/global.css"

import { getFooter } from "@/sanity/queries/footer"
import { getNavigation } from "@/sanity/queries/navigation"
import { cn } from "@shared/ui/lib/utils"

import { env } from "@/env.mjs"
import FooterLayout from "@/features/footer/layout"
import NavigationLayout from "@/features/navigation/layout"

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
  const navigation = await getNavigation()

  console.log(navigation)

  return (
    <html lang="en">
      <body
        className={cn(
          unbounded.variable,
          manrope.variable,
          "font-default antialiased"
        )}
      >
        <NavigationLayout navigation={navigation} />
        <main className="grid-system gap-page">{children}</main>
        <FooterLayout footer={footer} />
        <TailwindIndicator />
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
    </html>
  )
}
