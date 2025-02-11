import { type Metadata } from "next"

import { PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string }
}): Promise<Metadata> {
  const { page } = params

  return {
    title: `Polkadot Press Releases |  Page ${page}`,
    description: `Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    openGraph: {
      title: `Polkadot Press Releases | Page ${page}`,
      description: `Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
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
  return <Layout page={Number(page)} tagSlug="" type={PRESS_RELEASE_POSTTYPE} />
}
