import type { cardsStatSelection } from "@/sanity/selections/blocks/cards-stat"
import type { TypeFromSelection } from "groqd"

import CardStatBlock from "./card-stat"

interface Props {
  cards: TypeFromSelection<typeof cardsStatSelection>
}

export function CardsStatBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system gap-card">
      {cards.items.map((card) => (
        <CardStatBlock
          key={card._key}
          card={card}
          className="col-span-full md:col-span-3 lg:col-span-4"
        />
      ))}
    </div>
  )
}
