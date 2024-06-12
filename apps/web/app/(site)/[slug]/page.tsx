import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPage, getPageMeta } from "@/sanity/queries/page"

import { HeaderBlock } from "@/features/page/blocks/header"
import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const meta = await getPageMeta(slug)
  return {
    title: meta.meta?.meta_title || meta.title || "Polkadot",
    description:
      meta.meta?.meta_description ||
      meta.body ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
    },
  }
}
export default async function Page({ params: { slug } }: Props) {
  const data = await getPage(slug)
  if (!data) return notFound()
  return (
    <>
      <HeaderBlock header={data.header} />
      <section className="col-span-12 grid gap-section">
        <PageBuilder pageBuilder={data.pageBuilder} />
      </section>
    </>
  )
}
