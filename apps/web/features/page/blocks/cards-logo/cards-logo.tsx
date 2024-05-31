import type { cardsLogoSelection } from "@/sanity/selections/blocks/cards-logo"
import type { TypeFromSelection } from "groqd"

import CardLogoBlock from "./card-logo"

interface Props {
  cards: TypeFromSelection<typeof cardsLogoSelection>
}

export function CardsBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system gap-gutter">
      {cards.items.map((card) => (
        <CardLogoBlock key={card._key} card={card} className="col-span-2" />
      ))}
    </div>
  )
}
