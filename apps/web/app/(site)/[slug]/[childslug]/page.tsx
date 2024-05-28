import type { Metadata } from "next"
import { getPage, getPageMeta } from "@/sanity/queries/page"

import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { childslug: string }
}

export async function generateMetadata({
  params: { childslug },
}: Props): Promise<Metadata> {
  const meta = await getPageMeta(childslug)
  return {
    title: meta.meta.meta_title,
    description:
      meta.meta.meta_description ||
      meta.body ||
      "Polkadot empowers blockchain networks to work together under the protection of shared security.",
    openGraph: {
      images: [meta.meta.meta_image?.asset.url || ""],
    },
  }
}

export default async function Page({ params: { childslug } }: Props) {
  const data = await getPage(childslug)

  return (
    <div className="my-4 flex flex-col">
      <PageBuilder pageBuilder={data.pageBuilder} />
    </div>
  )
}
