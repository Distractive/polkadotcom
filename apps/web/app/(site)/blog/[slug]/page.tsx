import type { Metadata } from "next"
import { getPostMeta } from "@/sanity/queries/post"
import { getSlugs } from "@/sanity/queries/posts"

import { BASE_URL, BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/post/layout"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const meta = await getPostMeta(slug)
  const ogObject = {
    title: meta.meta_title || meta.title,
    description: meta.meta_description || meta.custom_excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {},
  }

  if (meta.image) {
    ogObject.openGraph = { images: [meta.image?.asset.url] }
  }

  return ogObject
}

export async function generateStaticParams() {
  const slugs = await getSlugs(BLOG_POSTTYPE)

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export default async function Slug({ params: { slug } }: Props) {
  return <Layout slug={slug} type={BLOG_POSTTYPE} />
}
