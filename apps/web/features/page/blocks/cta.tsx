import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type ctaSelection } from "@/sanity/selections/blocks/cta"
import { type TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { NewsletterButton } from "./newsletter-button"

interface Props {
  cta: TypeFromSelection<typeof ctaSelection>
}

export function CTA({ cta }: Props) {
  return (
    <div
      className={cn(
        "max-width flex px-gutter",
        cta.isCentered ? "justify-center" : "items-start"
      )}
    >
      <div className="relative w-full max-w-[42rem] overflow-hidden rounded-2xl border border-grey-300 ">
        {cta.image && (
          <div className="absolute inset-0 -z-10  overflow-hidden rounded-2xl">
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
        <div className="flex rounded-2xl p-6 md:p-gutter">
          <div
            className={cn(
              "flex flex-col gap-4",
              cta.useWhiteText ? "text-white" : "text-black"
            )}
          >
            <Heading
              variant="h2"
              className={cta.useWhiteText ? "text-white" : "text-black"}
            >
              {cta.heading}
            </Heading>
            <PortableText
              value={cta.content}
              components={{
                block: {
                  h3: ({ children }) => (
                    <Heading variant="h3" className="w-full">
                      {children}
                    </Heading>
                  ),
                  normal: ({ children }) => (
                    <p className="text-lg ">{children}</p>
                  ),
                  smallprint: ({ children }) => (
                    <p className="text-sm ">{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="flex list-inside list-disc flex-col gap-copy ">
                      {children}
                    </ul>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li>{children}</li>,
                },
              }}
            />
            {/* BUTTON BLOCK (ENABLES ROW WRAPPING FOR BUTTONS) */}
            <div className="flex flex-col gap-3 pt-3 md:flex-row">
              <PortableText
                value={cta.content}
                components={{
                  block: {
                    h3: ({ children }) => null,
                    normal: ({ children }) => null,
                    smallprint: ({ children }) => null,
                  },
                  list: {
                    bullet: ({ children }) => null,
                  },
                  listItem: {
                    bullet: ({ children }) => null,
                  },
                  types: {
                    customUrl: ({ value }) => {
                      return (
                        <span className="">
                          <Button
                            size="md"
                            asChild
                            className="no-wrap md:cursor-pointer"
                            variant={
                              value?.variant
                                ? value.variant === "primary"
                                  ? "primary"
                                  : "secondary"
                                : "primary"
                            }
                          >
                            <CustomUrl
                              className="outline-none"
                              value={{
                                internal: value?.internal,
                                external: value?.external,
                              }}
                            >
                              {value.label}
                            </CustomUrl>
                          </Button>
                        </span>
                      )
                    },
                    newsletterButton: ({ value }) => {
                      return (
                        <span className="">
                          <NewsletterButton value={value} />
                        </span>
                      )
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
