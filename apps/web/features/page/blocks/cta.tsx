import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type ctaSelection } from "@/sanity/selections/blocks/cta"
import { type TypeFromSelection } from "groqd"

import { Button, ButtonStyles, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  cta: TypeFromSelection<typeof ctaSelection>
}

export function CTA({ cta }: Props) {
  return (
    <div className="grid-system max-width ">
      <div className="background-blur relative col-span-full overflow-hidden rounded-2xl px-gutter lg:col-span-8 lg:col-start-3">
        {cta.image && (
          <div className="absolute inset-0 -z-10 mx-gutter overflow-hidden rounded-2xl">
            <Image
              src={urlForImage(cta.image.asset)}
              alt={cta.altText || ""}
              layout="fill"
              objectFit="cover"
              quality={90}
              className="rounded-2xl"
            />
          </div>
        )}
        <div className="flex flex-col  rounded-2xl border border-grey-300  p-gutter">
          <div
            className={cn(
              "flex flex-col gap-copy",
              cta.useWhiteText ? "text-white" : "text-black"
            )}
          >
            <Heading
              variant="h2"
              className={cta.useWhiteText ? "text-white" : "text-black"}
            >
              {cta.heading}
            </Heading>
            <p>{cta.body}</p>
          </div>
          <div className="group mr-auto">
            <div
              id="main-content"
              className="mt-card flex w-full flex-wrap gap-4"
            >
              {cta.links?.map((link, index) => (
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
                    value={{
                      internal: link?.internal,
                      external: link?.external,
                    }}
                  >
                    {link.label}
                  </CustomUrl>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
