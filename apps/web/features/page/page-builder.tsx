import type { pageBuilderSelection } from "@/sanity/selections/page-builder"
import type { TypeFromSelection } from "groqd"

import { AccordionBlock } from "@/features/page/blocks/accordion"
import { CardsBlock } from "@/features/page/blocks/cards"
import { FAQBlock } from "@/features/page/blocks/faqs"

interface Props {
  pageBuilder: TypeFromSelection<typeof pageBuilderSelection>["pageBuilder"]
}

export function PageBuilder({ pageBuilder }: Props) {
  return (
    <div className="grid gap-8">
      {pageBuilder.map((item) => {
        switch (item._type) {
          case "faqs":
            return <FAQBlock faqs={item} />
          case "accordion":
            return <AccordionBlock accordion={item} />
          case "cards":
            return <CardsBlock cards={item} />
          default:
            return <p>Unknown type: {item._type}</p>
        }
      })}
    </div>
  )
}
