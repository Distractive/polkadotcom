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
      <div className="relative w-full max-w-[60rem] overflow-hidden rounded-2xl ">
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

        <div
          className={cn(
            "flex rounded-2xl p-8 md:p-gutter",
            !cta.image && "border border-grey-300"
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-4",
              cta.useWhiteText ? "text-white" : "text-black",
              cta.twoThirdsText ? "md:w-2/3" : ""
            )}
          >
            <Heading
              variant="h2"
              className={cta.useWhiteText ? "text-white" : "text-black"}
            >
              {cta.heading}
            </Heading>
            {cta.content && (
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
                  types: {
                    customUrl: () => null,
                    newsletterButton: () => null,
                  },
                }}
              />
            )}

            {/* Separate rich text for buttons, alows them to be placed on  a new row*/}
            <div className="flex flex-col gap-3 pt-3 md:flex-row">
              {cta.content && (
                <PortableText
                  value={cta.content}
                  components={{
                    block: {
                      h3: () => null,
                      normal: () => null,
                      smallprint: () => null,
                    },
                    list: {
                      bullet: () => null,
                    },
                    listItem: {
                      bullet: () => null,
                    },
                    types: {
                      customUrl: ({ value }) => {
                        console.log("value", value)
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
