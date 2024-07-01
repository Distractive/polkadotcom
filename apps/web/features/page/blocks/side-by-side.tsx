import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type sideBySideSelection } from "@/sanity/selections/blocks/side-by-side"
import { type TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  content: TypeFromSelection<typeof sideBySideSelection>
}

export function SideBySideBlock({ content }: Props) {
  return (
    <div className="grid-system max-width gap-y-gutter px-gutter lg:gap-y-0">
      <div
        className={cn(
          "col-span-full grid h-fit gap-gutter lg:col-span-5",
          content.isImageOnLeft ? "lg:order-1 lg:pl-card" : "lg:pr-card"
        )}
      >
        <div className="flex flex-col gap-copy">
          <Heading variant="h3" size="h2" className="text-balance">
            {content.heading}
          </Heading>
          {content.subheading && (
            <p className="text-lg text-black">{content.subheading}</p>
          )}
        </div>
        <div className="flex flex-col gap-copy">
          <PortableText
            value={content.content}
            components={{
              block: {
                h3: ({ children }) => (
                  <Heading variant="h3">{children}</Heading>
                ),
                normal: ({ children }) => (
                  <p className="text-lg text-black">{children}</p>
                ),
                smallprint: ({ children }) => (
                  <p className="text-sm text-black">{children}</p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="flex list-inside list-disc flex-col gap-copy text-black marker:text-black">
                    {children}
                  </ul>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li>{children}</li>,
              },
              types: {
                customUrl: ({ value }) => {
                  return (
                    <Button
                      size="sm"
                      asChild
                      className="my-copy mr-auto md:cursor-pointer"
                      variant={value.internal ? "primary" : "secondary"}
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
                  )
                },
              },
            }}
          />
        </div>
      </div>
      {content.image && (
        <Image
          src={urlForImage(content.image.asset)}
          alt=""
          className="col-span-full my-auto h-auto lg:col-span-7"
          width={content.image.asset.metadata.dimensions?.width}
          height={content.image.asset.metadata.dimensions?.height}
        />
      )}
    </div>
  )
}
