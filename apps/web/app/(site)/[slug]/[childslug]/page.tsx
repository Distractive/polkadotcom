import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPage, getPageMeta } from "@/sanity/queries/page"

import type { BreadcrumbProps } from "@/features/page/blocks/breadcrumb"
import { HeaderBlock } from "@/features/page/blocks/header"
import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { slug: string; childslug: string }
}

export async function generateMetadata({
  params: { slug, childslug },
}: Props): Promise<Metadata> {
  const meta = await getPageMeta(`${slug}/${childslug}`)

  if (!meta)
    return {
      title: "Polkadot 404",
      description: "Page not found",
    }

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

  const breadcrumb: BreadcrumbProps = {
    items: [
      { slug: `/${slug}` ?? "", title: data?.parent?.title ?? "" },
      { slug: `/${slug}/${childslug}` ?? "", title: data?.title ?? "" },
    ],
  }

  if (!data) return notFound()

  return (
    <>
      <HeaderBlock header={data.header} breadcrumb={breadcrumb} />
      <section className="col-span-full grid gap-page">
        <PageBuilder pageBuilder={data.pageBuilder} />
      </section>
    </>
  )
}
