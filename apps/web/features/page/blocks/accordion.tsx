import type { accordionSelection } from "@/sanity/selections/blocks/accordion"
import type { TypeFromSelection } from "groqd"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui"

interface Props {
  accordion: TypeFromSelection<typeof accordionSelection> & {
    _type: "accordion"
  }
}

export function AccordionBlock({ accordion }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 font-display text-3xl text-red-500">
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
              <span>{index + 1}</span>
              {item.heading}
            </AccordionTrigger>
            <AccordionContent>
              {item.content.map((block, index) => (
                <div
                  key={index}
                  className="not-last:border-b-2 mb-4 pb-4 last:pb-0"
                >
                  <h4 className="text-sm font-bold">{block.heading}</h4>
                  <p>{block.copy}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
