import type { faqsSelection } from "@/sanity/selections/blocks/faqs"
import { PortableText } from "@portabletext/react"
import { stegaClean } from "@sanity/client/stega"
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
    <div className="grid-system max-width gap-gutter px-gutter ">
      <Heading
        variant="h2"
        className="col-span-full lg:col-span-8 lg:col-start-3"
      >
        {faqs.title}
      </Heading>
      <Accordion
        type="single"
        collapsible
        className="col-span-full lg:col-span-8 lg:col-start-3"
      >
        {faqs.items.map((faq) => (
          <AccordionItem key={faq._key} value={faq._key}>
            <AccordionTrigger
              aria-label={`Open answer to '${stegaClean(faq.question)}'`}
              className={cn(
                "flex flex-1 items-center justify-between py-4",
                "text-left font-default text-base font-bold",
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
                      <p className="text-grey-500 not-last:mb-copy md:w-3/4">
                        {children}
                      </p>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="my-4 list-outside list-disc pl-8 text-grey-500 marker:text-grey-500">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="my-4 list-outside list-decimal pl-8 text-grey-500 marker:text-grey-500">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                    number: ({ children }) => <li>{children}</li>,
                  },
                  marks: {
                    link: ({ children, value }) => {
                      const rel = !value.href.startsWith("/")
                        ? "noreferrer noopener"
                        : undefined
                      return (
                        <a href={value.href} rel={rel} className="link-styling">
                          {children}
                        </a>
                      )
                    },
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
