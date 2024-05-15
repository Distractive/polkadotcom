import { getPage } from "@/sanity/queries/page"

import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { slug: string }
}

export default async function Page({ params: { slug } }: Props) {
  const data = await getPage(slug)

  return (
    <div className="my-4 flex flex-col">
      <PageBuilder pageBuilder={data.pageBuilder} />
    </div>
  )
}
