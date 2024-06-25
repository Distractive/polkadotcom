import type { cardsStatSelection } from "@/sanity/selections/blocks/cards-stat"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardStatBlock from "./card-stat"

interface Props {
  cards: TypeFromSelection<typeof cardsStatSelection>
}

export function CardsStatBlock({ cards }: Props) {
  return (
    <div
      key={cards._key}
      className="grid-system max-width gap-y-section px-gutter"
    >
      <div className="col-span-full lg:col-span-8">
        <Heading variant="h3" size="h2">
          {cards.heading}
        </Heading>
      </div>
      <div
        className={cn(
          "grid-system col-span-12 !mx-0 gap-gutter !px-0",
          !cards.body && "pb-section"
        )}
      >
        {cards.items.map((card) => (
          <CardStatBlock
            key={card._key}
            card={card}
            className="col-span-full md:col-span-3 lg:col-span-4"
          />
        ))}
      </div>
      {cards.body && (
        <div className="max-w-4/6 col-span-12 lg:pt-0">
          <p className="text-lg">{cards.body}</p>
        </div>
      )}
    </div>
  )
}
