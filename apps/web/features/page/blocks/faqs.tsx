import type { faqsSelection } from "@/sanity/selections/blocks/faqs"
import type { TypeFromSelection } from "groqd"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui"

interface Props {
  faqs: TypeFromSelection<typeof faqsSelection> & {
    _type: "faqs"
  }
}

export function FAQBlock({ faqs }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 font-display text-3xl text-red-500">FAQ BLOCK</h1>
      <h3 className="font-display text-2xl">{faqs.title}</h3>
      <Accordion type="single" collapsible className="w-1/2">
        {faqs.items.map((faq) => (
          <AccordionItem key={faq._key} value={faq._key}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
