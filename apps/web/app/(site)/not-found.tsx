import { getPageNotFound } from "@/sanity/queries/notfound"
import type { headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import type { BreadcrumbProps } from "@/features/page/blocks/breadcrumb"
import { HeaderBlock } from "@/features/page/blocks/header"

export default async function NotFound() {
  const data = await getPageNotFound()

  const breadcrumb: BreadcrumbProps = {
    items: [{ slug: `/` ?? "404", title: "404" }],
  }

  const header: TypeFromSelection<typeof headerSelection> = {
    image: data.headerImage,
    title: data.heading,
    body: data.body,
    link: data.link,
    video: null,
  }

  return (
    <div className="col-span-full mb-24 md:mb-32">
      <HeaderBlock header={header} breadcrumb={breadcrumb} />
    </div>
  )
}
