import { getPage } from "@/sanity/queries/page"

import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { slug: string }
}

export default async function Page({ params: { slug } }: Props) {
  const data = await getPage(slug)

  return (
    <section className="col-span-12 grid gap-section">
      <PageBuilder pageBuilder={data.pageBuilder} />
    </section>
  )
}
