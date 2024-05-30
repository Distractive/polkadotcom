import type { cardsSmallSelection } from "@/sanity/selections/blocks/cards-small"
import type { TypeFromSelection } from "groqd"

import CardSmallBlock from "./card-small"

interface Props {
  cards: TypeFromSelection<typeof cardsSmallSelection>
}

export function CardsSmallBlock({ cards }: Props) {
  return (
    <div
      key={cards._key}
      className="grid-system col-span-12 !mx-0 gap-card !px-0"
    >
      {cards.items.map((card) => (
        <CardSmallBlock
          key={card._key}
          card={card}
          className="col-span-12 md:col-span-3 lg:col-span-4"
        />
      ))}
    </div>
  )
}
