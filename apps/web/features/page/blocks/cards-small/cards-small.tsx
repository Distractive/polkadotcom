import type { cardsSmallSelection } from "@/sanity/selections/blocks/cards-small"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardSmallBlock from "./card-small"

interface Props {
  cards: TypeFromSelection<typeof cardsSmallSelection>
}

export function CardsSmallBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system !mx-0 !px-0">
      <div className={cn("col-span-12 pb-gutter lg:col-span-4")}>
        <div className="flex flex-col gap-copy lg:w-5/6">
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p>{cards.body}</p>}
        </div>
      </div>
      <div
        className={cn(
          "grid-system col-span-12 !mx-0 gap-card !px-0 lg:col-span-12 lg:col-start-5"
        )}
      >
        {cards.items.map((card) => (
          <CardSmallBlock
            key={card._key}
            card={card}
            className={cn("col-span-12")}
          />
        ))}
      </div>
    </div>
  )
}
