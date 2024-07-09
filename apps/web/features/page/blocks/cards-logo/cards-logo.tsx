import type { cardsLogoSelection } from "@/sanity/selections/blocks/cards-logo"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardLogoBlock from "./card-logo"

interface Props {
  cards: TypeFromSelection<typeof cardsLogoSelection>
}

export function CardsLogoBlock({ cards }: Props) {
  return (
    <div
      key={cards._key}
      className="grid-system max-width gap-y-section px-gutter"
    >
      <div className="col-span-full flex flex-col gap-copy lg:col-span-8">
        <Heading variant="h2">{cards.heading}</Heading>
        {cards.body && <p>{cards.body}</p>}
      </div>
      <div className={cn("grid-system col-span-full gap-gutter")}>
        {cards.items.map((card) => (
          <CardLogoBlock
            key={card._key}
            card={card}
            className="col-span-3 md:col-span-2 lg:col-span-2"
          />
        ))}
      </div>
    </div>
  )
}
