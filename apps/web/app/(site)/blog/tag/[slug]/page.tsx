import { type Metadata } from "next"

import { BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params

  // Capitalize the first letter of each word in the slug
  const formattedTag = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `Polkadot Blog | ${formattedTag}`,
    description: `Explore Polkadot blog posts tagged with ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security`,
    openGraph: {
      title: `Polkadot Blog | ${formattedTag}`,
      description: `Explore Polkadot blog posts tagged with ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security.`,
    },
  }
}

export default async function Tag({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return (
    <Layout page={1} type={BLOG_POSTTYPE} tagSlug={slug} withHeader={false} />
  )
}
