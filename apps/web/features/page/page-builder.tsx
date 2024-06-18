import type { pageBuilderSelection } from "@/sanity/selections/page-builder"
import type { TypeFromSelection } from "groqd"

import { AccordionBlock } from "@/features/page/blocks/accordion"
import { CardsLogoBlock } from "@/features/page/blocks/cards-logo/cards-logo"
import { CardsSmallBlock } from "@/features/page/blocks/cards-small/cards-small"
import { CardsStatBlock } from "@/features/page/blocks/cards-stats/cards-stat"
import { CardsTimelineBlock } from "@/features/page/blocks/cards-timeline/cards-timeline"
import { CardsBlock } from "@/features/page/blocks/cards/cards"
import { FAQBlock } from "@/features/page/blocks/faqs"
import { SideBySideBlock } from "@/features/page/blocks/side-by-side"

import { ContentBlock } from "./blocks/content"
import { QuoteBlock } from "./blocks/quote"

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
      case "cardsTimeline":
        return <CardsTimelineBlock cards={item} />
      case "cardsStat":
        return <CardsStatBlock cards={item} />
      case "cardsLogo":
        return <CardsLogoBlock cards={item} />
      case "blockContent":
        return <ContentBlock content={item} />
      case "sideBySide":
        return <SideBySideBlock content={item} />
      case "quote":
        return <QuoteBlock quote={item} />
      default:
        return <p>Unknown type: {item._type}</p>
    }
  })
}
