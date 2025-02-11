import { type Metadata } from "next"
import { getSingletonMeta } from "@/sanity/queries/page"

import { PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta("press-releases")

  if (!meta) {
    return {
      title: "Polkadot 404",
      description: "Page not found",
    }
  }

  return {
    title: "Polkadot Press Releases",
    description:
      "Stay updated with the latest Polkadot news and announcements. Official press releases covering network upgrades, partnerships, and ecosystem developments.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
      title: "Polkadot Press Releases",
      description:
        "Stay updated with the latest Polkadot news and announcements. Official press releases covering network upgrades, partnerships, and ecosystem developments.",
    },
  }
}

export default async function PressRelease() {
  return <Layout page={1} type={PRESS_RELEASE_POSTTYPE} tagSlug="" />
}
