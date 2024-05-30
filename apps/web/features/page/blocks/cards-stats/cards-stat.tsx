import type { cardsStatSelection } from "@/sanity/selections/blocks/cards-stat"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardStatBlock from "./card-stat"

interface Props {
  cards: TypeFromSelection<typeof cardsStatSelection>
}

export function CardsStatBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system !mx-0 !px-0">
      <div className={cn("col-span-12 pb-gutter")}>
        <div className="flex flex-col gap-copy lg:w-5/6">
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p>{cards.body}</p>}
        </div>
      </div>
      <div className={cn("grid-system col-span-12 !mx-0 gap-gutter !px-0")}>
        {cards.items.map((card) => (
          <CardStatBlock
            key={card._key}
            card={card}
            className="col-span-full md:col-span-3 lg:col-span-4"
          />
        ))}
      </div>
    </div>
  )
}
