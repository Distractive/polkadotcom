import type { Metadata } from "next"
import { draftMode } from "next/headers"
import Script from "next/script"
import { manrope, unbounded } from "@/styles/fonts"
import { GoogleAnalytics } from "@next/third-parties/google"
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
        <a
          href="#main-content"
          className={cn(
            "group absolute -left-[9999px] -top-[9999px] z-[999] border-b border-b-grey-400 bg-grey-100 p-4 opacity-100 outline-none",
            "focus:left-0 focus:right-0 focus:top-0 focus:opacity-100"
          )}
        >
          <span
            tabIndex={0}
            className="inline-block rounded-lg bg-blue px-10 py-4 font-display text-xs uppercase tracking-wide text-white group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#1351d8]"
          >
            Skip to main content
          </span>
        </a>
        <NavigationLayout navigation={navigation} />
        <main className="flex-grow">{children}</main>
        <FooterLayout footer={footer} />
        {env.VERCEL_ENV === "development" && <TailwindIndicator />}
        {draftMode().isEnabled && <VisualEditing />}
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
    </html>
  )
}
