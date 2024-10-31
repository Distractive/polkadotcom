import { getPageNotFound } from "@/sanity/queries/notfound"
import { type notfoundSelection } from "@/sanity/selections/notfound/notfound"
import { type TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"
import GlobalGradient from "@/features/gradients/global-gradient"

export const dynamicParams = true

export default async function NotFound() {
  const data = await getPageNotFound()

  const header: TypeFromSelection<typeof notfoundSelection> = {
    heading: data.heading,
    body: data.body,
    links: data.links,
  }

  return (
    <div className="relative col-span-full mb-24  md:mb-32">
      <GlobalGradient />
      <header className="max-width mb-page flex h-full w-full flex-col items-center  pt-page">
        <div
          className={cn(
            "flex max-w-4xl flex-col items-center justify-center gap-copy lg:pt-24"
          )}
        >
          <div className="-mb-6 ">404</div>

          <Heading className="mb-4 text-center !text-[4rem] font-medium lg:!text-[9.375rem]">
            {header.heading}
          </Heading>

          {header.body && <p className="mb-8 text-lg">{header.body}</p>}

          {header.links?.map((link, index) => (
            <Button
              asChild
              key={index}
              variant={
                link?.variant
                  ? link.variant === "primary"
                    ? "primary"
                    : "secondary"
                  : "primary"
              }
              size="lg"
            >
              <CustomUrl
                className="outline-none"
                value={{ internal: link?.internal, external: link?.external }}
              >
                {link.label}
              </CustomUrl>
            </Button>
          ))}
        </div>
      </header>
    </div>
  )
}
