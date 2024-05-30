import type { pageBuilderSelection } from "@/sanity/selections/page-builder"
import type { TypeFromSelection } from "groqd"

import { AccordionBlock } from "@/features/page/blocks/accordion"
import { CardsBlock } from "@/features/page/blocks/cards"
import { CardsSmallBlock } from "@/features/page/blocks/cards-small"
import { FAQBlock } from "@/features/page/blocks/faqs"

import { ContentBlock } from "./blocks/content"

interface Props {
  pageBuilder: TypeFromSelection<typeof pageBuilderSelection>["pageBuilder"]
}

export function PageBuilder({ pageBuilder }: Props) {
  return pageBuilder.map((item) => {
    switch (item._type) {
      case "faqs":
        return <FAQBlock faqs={item} />
      case "accordion":
        return <AccordionBlock accordion={item} />
      case "cards":
        return <CardsBlock cards={item} />
      case "cardsSmall":
        return <CardsSmallBlock cards={item} />
      case "blockContent":
        return <ContentBlock content={item.content} />
      default:
        return <p>Unknown type: {item._type}</p>
    }
  })
}
