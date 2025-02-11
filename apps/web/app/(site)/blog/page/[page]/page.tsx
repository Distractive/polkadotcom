import { type Metadata } from "next"

import { BLOG_POSTTYPE } from "@/constants/global"
import { Newsletter } from "@/features/page/blocks/newsletter"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { page: string }
}): Promise<Metadata> {
  const { page } = params

  return {
    title: `Polkadot Blog | Page ${page}`,
    description: `Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    openGraph: {
      title: `Polkadot Blog | Page ${page}`,
      description: `Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    },
  }
}

// Only generate the first page statically
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
