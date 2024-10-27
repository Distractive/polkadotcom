import { getPageNotFound } from "@/sanity/queries/notfound"
import type { headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"
import {
  BreadcrumbBlock,
  type BreadcrumbProps,
} from "@/features/page/blocks/breadcrumb"

export const dynamicParams = true

export default async function NotFound() {
  const data = await getPageNotFound()

  const breadcrumb: BreadcrumbProps = {
    items: [{ slug: `/`, title: "404" }],
  }

  const header: TypeFromSelection<typeof headerSelection> = {
    image: data.headerImage,
    title: data.heading,
    body: data.body,
    links: data.links,
    video: null,
    mobileImage: null,
  }

  return (
    <div className="col-span-full mb-24 md:mb-32">
      {/* <HeaderBlock header={header} breadcrumb={breadcrumb} /> */}
      <header className="max-width mb-page mt-page flex flex-col">
        <div
          className={cn(
            "flex max-w-4xl flex-col justify-center gap-copy lg:pt-16",
            header.image
              ? "px-gutter pt-card"
              : "mt-gutter px-gutter pt-header-top"
          )}
        >
          {breadcrumb && <BreadcrumbBlock items={breadcrumb.items} />}

          <Heading variant="h1">{header.title}</Heading>

          {header.body && <p className="text-lg">{header.body}</p>}
        </div>
      </header>
    </div>
  )
}
