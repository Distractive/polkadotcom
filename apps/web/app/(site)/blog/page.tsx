import { type Metadata } from "next"
import { getSingletonMeta } from "@/sanity/queries/page"

import { BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta("blog")
  if (!meta)
    return {
      title: "Polkadot 404",
      description: "Page not found",
    }

  return {
    title: "Polkadot Blog",
    description:
      "Explore the Polkadot ecosystem through in-depth articles,and insights. Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
      title: "Polkadot Blog",
      description:
        "Explore the Polkadot ecosystem through in-depth articles,and insights. Polkadot empowers blockchain networks to work together under the protection of shared security.",
    },
  }
}

export default async function Blog() {
  return <Layout page={1} type={BLOG_POSTTYPE} tagSlug="" />
}
