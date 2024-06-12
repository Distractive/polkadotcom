import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPage, getPageMeta } from "@/sanity/queries/page"

import { HeaderBlock } from "@/features/page/blocks/header"
import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { slug: string; childslug: string }
}

export async function generateMetadata({
  params: { slug, childslug },
}: Props): Promise<Metadata> {
  const meta = await getPageMeta(`${slug}/${childslug}`)
  return {
    title: meta.meta?.meta_title || meta.header.title || "Polkadot",
    description:
      meta.meta?.meta_description ||
      meta.header.body ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ""],
    },
  }
}

export default async function Page({ params: { slug, childslug } }: Props) {
  const data = await getPage(`${slug}/${childslug}`)

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
