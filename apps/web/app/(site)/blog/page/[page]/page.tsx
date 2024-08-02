import { type Metadata } from "next"
import { getSingletonMeta } from "@/sanity/queries/page"

import { BLOG_POSTTYPE } from "@/constants/global"
import { Newsletter } from "@/features/page/blocks/newsletter"
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
    title: meta.meta?.meta_title || "Polkadot",
    description:
      meta.meta?.meta_description ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
    },
  }
}

/**
 * Only generate the first page statically
 */
export async function generateStaticParams() {
  return [{ page: "1" }]
}

export default async function Page({
  params: { page },
}: {
  params: { page: string }
}) {
  return (
    <>
      <Layout page={Number(page)} tagSlug="" type={BLOG_POSTTYPE} />
      <Newsletter />
    </>
  )
}
