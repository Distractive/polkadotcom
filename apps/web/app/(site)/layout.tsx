import type { Metadata } from "next"
import { draftMode } from "next/headers"
import Script from "next/script"
import { manrope, unbounded } from "@/styles/fonts"
import { VisualEditing } from "next-sanity"

import "@shared/ui/styles/global.css"

import { getFooter } from "@/sanity/queries/footer"
import { getNavigation } from "@/sanity/queries/navigation"
import { cn } from "@shared/ui/lib/utils"

import { env } from "@/env.mjs"
import { TailwindIndicator } from "@/components/tailwind-indicator"
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
        <Script
          src="https://cmp.osano.com/169unzUF2IaM42S5j/0f63db37-496b-4a14-a233-82bbdf3a4afd/osano.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.hsforms.net/forms/embed/v2.js"
          strategy="beforeInteractive"
        />
        <Script
          id="plausible"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
          data-domain="polkadot.network"
          defer
        />
        <Script
          id="hotjar"
          strategy="afterInteractive"
          src="https://static.hotjar.com/c/hotjar-5063108.js?sv=6"
          async
        />
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
        <meta name="theme-color" content="#fff" />
      </head>
      <body
        className={cn(
          unbounded.variable,
          manrope.variable,
          "flex min-h-screen flex-col font-default antialiased"
        )}
      >
        <NavigationLayout navigation={navigation} />
        <main role="main" className="flex-grow">
          {children}
        </main>
        <FooterLayout footer={footer} />
        {env.VERCEL_ENV === "development" && <TailwindIndicator />}
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
