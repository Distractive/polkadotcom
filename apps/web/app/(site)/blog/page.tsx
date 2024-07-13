import { type Metadata } from "next"
import { getSingletonMeta } from "@/sanity/queries/page"

import { BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamic = "force-static"
export const dynamicParams = true

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta("blog")
  if (!meta)
    return {
      title: "Polkadot 404",
      description: "Page not found",
    }

  return {
    title: meta.meta?.meta_title || "Polkadot",
    description:
      meta.meta?.meta_description ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
    },
  }
}

export default async function Blog() {
  return <Layout page={1} type={BLOG_POSTTYPE} tagSlug="" />
}
