import type { cardsSmallSelection } from "@/sanity/selections/blocks/cards-small"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardSmallBlock from "./card-small"

interface Props {
  cards: TypeFromSelection<typeof cardsSmallSelection>
}

export function CardsSmallBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system gap-y-gutter px-gutter">
      <div className="col-span-full flex flex-col gap-copy lg:w-5/6">
        <Heading variant="h2">{cards.heading}</Heading>
        {cards.body && <p>{cards.body}</p>}
      </div>
      <div className={cn("grid-system col-span-12 w-full gap-gutter")}>
        {cards.items.map((card, index) => {
          // span the last two cards if there are 2 cards in a row
          const shouldSpan =
            cards.items.length % 3 === 2 && index >= cards.items.length - 2
          return (
            <CardSmallBlock
              key={card._key}
              card={card}
              className={cn(
                "col-span-12 md:col-span-3 lg:col-span-4",
                shouldSpan && "lg:col-span-6"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
