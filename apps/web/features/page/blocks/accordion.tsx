import type { accordionSelection } from "@/sanity/selections/blocks/accordion"
import { PortableText } from "@portabletext/react"
import { stegaClean } from "@sanity/client/stega"
import type { TypeFromSelection } from "groqd"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  cn,
  Heading,
} from "@shared/ui"

interface Props {
  accordion: TypeFromSelection<typeof accordionSelection> & {
    _type: "accordion"
  }
}

export function AccordionBlock({ accordion }: Props) {
  // Typeguards to ensure that the accordion object is not null or undefined
  if (!accordion || !accordion.items?.length) {
    return null
  }

  const validItems = accordion.items.filter(
    (item) => item?._key && item?.heading
  )

  if (!validItems.length) {
    return null
  }

  return (
    <div className="grid-system max-width px-gutter">
      {accordion.hasTitleOnSide ? (
        <div className="col-span-full pb-gutter lg:col-span-4">
          <div className="flex flex-col gap-copy">
            {accordion.title && (
              <Heading variant="h2">{accordion.title}</Heading>
            )}
            {accordion.body && <p>{accordion.body}</p>}
          </div>
        </div>
      ) : (
        <div className="grid-system col-span-full items-center justify-center pb-gutter">
          {accordion.image?.asset?.url && (
            <img
              alt={accordion.title || "Accordion image"}
              className="col-span-full aspect-video w-full rounded-2xl lg:col-span-6"
              src={accordion.image.asset.url}
            />
          )}
          <div className="col-span-full flex flex-col items-center justify-center pt-gutter lg:col-span-6 lg:pt-0">
            <div className="flex flex-col gap-copy lg:w-5/6">
              {accordion.title && (
                <Heading variant="h2">{accordion.title}</Heading>
              )}
              {accordion.body && <p>{accordion.body}</p>}
            </div>
          </div>
        </div>
      )}
      <Accordion
        type="single"
        collapsible
        defaultValue={validItems[0]?._key || undefined}
        className={cn(
          "col-span-full lg:col-span-8 lg:col-start-3",
          accordion.hasTitleOnSide &&
            "lg:col-start-0 col-span-full lg:col-span-7 lg:col-start-6"
        )}
      >
        {validItems.map(
          (item, index) =>
            item._key &&
            item.heading && (
              <AccordionItem
                key={item._key}
                value={item._key}
                className={cn(
                  index !== validItems.length - 1 &&
                    "data-[state=open]:border-b data-[state=open]:border-grey-300"
                )}
              >
                <AccordionTrigger
                  aria-label={`Open '${stegaClean(item.heading)}' content`}
                  className={cn(
                    "flex flex-1 items-center justify-between p-gutter py-4",
                    "border border-grey-300 font-display font-medium hover:text-pink data-[state=open]:text-pink",
                    index === validItems.length - 1 &&
                      "rounded-b-2xl data-[state=open]:rounded-b-none",
                    index === 0 && "rounded-t-2xl",
                    index !== 0 && "border-b border-t-0"
                  )}
                >
                  <div className="flex flex-row items-center gap-4">
                    {accordion.hasNumbers && (
                      <span
                        className="font-display text-2xl text-pink"
                        style={{ fontFeatureSettings: "'ss03' on" }}
                      >
                        {index + 1}
                      </span>
                    )}
                    {item.heading}
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    index === validItems.length - 1 && "rounded-b-2xl border-b",
                    "border-x border-grey-300 bg-grey-50 px-gutter py-gutter"
                  )}
                >
                  {item.content && (
                    <PortableText
                      value={item.content}
                      components={{
                        block: {
                          h4: ({ children }) => (
                            <Heading variant="h4" size="h5" weight="bold">
                              {children}
                            </Heading>
                          ),
                          normal: ({ children }) => (
                            <p className="text-black md:w-3/4">{children}</p>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="my-4 list-outside list-disc pl-8 text-black marker:text-black">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="my-4 list-outside list-decimal pl-8 text-black marker:text-black">
                              {children}
                            </ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => <li>{children}</li>,
                          number: ({ children }) => <li>{children}</li>,
                        },
                        types: {
                          break: ({ value }) => {
                            const { style } = value
                            if (style === "lineBreak") {
                              return (
                                <hr className="my-gutter border-grey-300" />
                              )
                            }
                            return null
                          },
                          customUrl: ({ value }) => (
                            <Button
                              variant={value.internal ? "primary" : "secondary"}
                              size="sm"
                              asChild
                              className="mt-gutter"
                            >
                              {value.label}
                            </Button>
                          ),
                        },
                      }}
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            )
        )}
      </Accordion>
    </div>
  )
}
