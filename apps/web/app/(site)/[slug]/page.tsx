import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getPage, getPageMeta, getSlugs } from "@/sanity/queries/page"

import { HeaderBlock } from "@/features/page/blocks/header"
import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const meta = await getPageMeta(slug)
  if (!meta)
    return {
      title: "Polkadot 404",
      description: "Page not found",
    }

  return {
    title:
      meta.meta?.meta_title || (meta.header && meta.header.title) || "Polkadot",
    description:
      meta.meta?.meta_description ||
      (meta.header && meta.header.body) ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getSlugs("landing")

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export default async function Page({ params: { slug } }: Props) {
  const isDraftMode = draftMode().isEnabled
  const data = await getPage(slug, isDraftMode)
  if (!data) return notFound()
  return (
    <>
      {data.header && <HeaderBlock header={data.header} />}
      <section className="flex flex-col gap-page">
        <PageBuilder pageBuilder={data.pageBuilder} />
      </section>
    </>
  )
}
