import { getPage } from "@/sanity/queries/page"

import { PageBuilder } from "@/features/page/page-builder"

interface Props {
  params: { childslug: string }
}

export default async function Page({ params: { childslug } }: Props) {
  const data = await getPage(childslug)

  return (
    <div className="my-4 flex flex-col">
      <PageBuilder pageBuilder={data.pageBuilder} />
    </div>
  )
}
