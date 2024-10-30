import { type Metadata } from "next"

import { CASE_STUDY_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string }
}): Promise<Metadata> {
  const { slug, page } = params

  // Capitalize the first letter of each word in the slug
  const formattedTag = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `Polkadot Blog | ${formattedTag} | Page ${page}`,
    description: `Explore Polkadot case studies tagged with ${formattedTag}. Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    openGraph: {
      title: `Polkadot Blog | ${formattedTag} | Page ${page}`,
      description: `Explore Polkadot case studies tagged with ${formattedTag}. Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    },
  }
}

export default async function Page({
  params: { page, slug },
}: {
  params: { page: string; slug: string }
}) {
  return (
    <Layout
      page={Number(page)}
      tagSlug={slug}
      type={CASE_STUDY_POSTTYPE}
      withHeader={false}
    />
  )
}
