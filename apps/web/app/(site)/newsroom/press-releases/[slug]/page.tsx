import { type Metadata } from "next"
import { getPostMeta } from "@/sanity/queries/post"
import { getSlugs } from "@/sanity/queries/posts"

import { BASE_URL, PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import Layout from "@/features/post/layout"

interface Props {
  params: { slug: string }
}

export const dynamicParams = true
export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const meta = await getPostMeta(slug)

  if (!meta) {
    return {
      title: "",
      description: "",
    }
  }

  return {
    title: meta.meta_title || meta.title,
    description: meta.meta_description || meta.custom_excerpt,
    alternates: { canonical: `${BASE_URL}/newsroom/press-releases/${slug}` },
  }
}

export async function generateStaticParams() {
  const slugs = await getSlugs(PRESS_RELEASE_POSTTYPE)

  if (!slugs?.length) return []

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export default async function Slug({ params: { slug } }: Props) {
  return <Layout type={PRESS_RELEASE_POSTTYPE} slug={slug} />
}
