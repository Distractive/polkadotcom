import type { accordionSelection } from "@/sanity/selections/blocks/accordion"
import { PortableText } from "@portabletext/react"
import type { TypeFromSelection } from "groqd"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Heading,
} from "@shared/ui"

interface Props {
  accordion: TypeFromSelection<typeof accordionSelection> & {
    _type: "accordion"
  }
}

export function AccordionBlock({ accordion }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-red-500 mb-4 font-display text-3xl">
        ACCORDION BLOCK
      </h1>
      <h3 className="font-display text-2xl">{accordion.title}</h3>
      <Accordion
        type="single"
        collapsible
        className="w-1/2"
        defaultValue={accordion.items[0]?._key} // default to first item open
      >
        {accordion.items.map((item, index) => (
          <AccordionItem key={item._key} value={item._key}>
            <AccordionTrigger>
              {accordion.hasNumbers && (
                <span
                  className="font-display text-4xl text-pink"
                  style={{ fontFeatureSettings: "'ss03' on" }}
                >
                  {index + 1}
                </span>
              )}
              {item.heading}
            </AccordionTrigger>
            <AccordionContent>
              <PortableText
                value={item.content}
                components={{
                  block: {
                    h4: ({ children }) => (
                      <Heading variant="h4">{children}</Heading>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="my-4 list-outside list-disc pl-8">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="my-4 list-outside list-decimal pl-8">
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
                        return <hr />
                      }
                      return null
                    },
                  },
                }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
