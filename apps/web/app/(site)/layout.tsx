import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { manrope, unbounded } from "@/styles/fonts"
import { GoogleAnalytics } from "@next/third-parties/google"
import { VisualEditing } from "next-sanity"

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

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="70x70"
          href="/favicon/mstile-70x70.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/mstile-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="150x150"
          href="/favicon/mstile-150x150.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="310x150"
          href="/favicon/mstile-310x150.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="310x310"
          href="/favicon/mstile-310x310.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#E6007A" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#E6007A" />
      </head>
      <body
        className={cn(
          unbounded.variable,
          manrope.variable,
          "flex min-h-screen flex-col font-default antialiased"
        )}
      >
        {draftMode().isEnabled && (
          <div>
            <a className="bg-blue-300 block p-4" href="/api/disable-draft">
              Disable preview mode
            </a>
          </div>
        )}
        <NavigationLayout navigation={navigation} />
        <main className="grid-system flex-grow gap-y-page">{children}</main>
        <FooterLayout footer={footer} />
        <TailwindIndicator />
        {draftMode().isEnabled && <VisualEditing />}
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
    </html>
  )
}
