import type { faqsSelection } from "@/sanity/selections/blocks/faqs"
import { PortableText } from "@portabletext/react"
import { cn } from "@shared/ui/lib/utils"
import type { TypeFromSelection } from "groqd"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Heading,
} from "@shared/ui"

interface Props {
  faqs: TypeFromSelection<typeof faqsSelection> & {
    _type: "faqs"
  }
}

export function FAQBlock({ faqs }: Props) {
  return (
    <div className="grid-system max-width gap-gutter px-gutter">
      <Heading
        variant="h2"
        className="col-span-12 lg:col-span-8 lg:col-start-3"
      >
        {faqs.title}
      </Heading>
      <Accordion
        type="single"
        collapsible
        className="col-span-12 lg:col-span-8 lg:col-start-3"
      >
        {faqs.items.map((faq) => (
          <AccordionItem key={faq._key} value={faq._key}>
            <AccordionTrigger
              className={cn(
                "flex flex-1 items-center justify-between py-4",
                "font-default text-sm font-bold",
                "border-b border-grey-300",
                "hover:border-pink hover:text-pink",
                "data-[state=open]:border-pink data-[state=open]:text-pink"
              )}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="py-card text-grey-500">
              <PortableText
                value={faq.answer}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-grey-500">{children}</p>
                    ),
                  },
                  types: {
                    customUrl: ({ value }) => {
                      return (
                        <Button
                          variant={value.internal ? "primary" : "secondary"}
                          size="sm"
                          asChild
                          className="mt-gutter"
                        >
                          {value.label}
                        </Button>
                      )
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
