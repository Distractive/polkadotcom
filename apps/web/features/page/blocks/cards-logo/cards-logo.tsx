import type { cardsLogoSelection } from "@/sanity/selections/blocks/cards-logo"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardLogoBlock from "./card-logo"

interface Props {
  cards: TypeFromSelection<typeof cardsLogoSelection>
}

export function CardsLogoBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system !mx-0 !px-0">
      <div className={cn("col-span-12 pb-gutter")}>
        <div className="flex flex-col gap-copy lg:w-5/6">
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p>{cards.body}</p>}
        </div>
      </div>
      <div className={cn("grid-system col-span-12 !mx-0 !px-0")}>
        {cards.items.map((card) => (
          <CardLogoBlock
            key={card._key}
            card={card}
            className="col-span-2 md:col-span-1 lg:col-span-2"
          />
        ))}
      </div>
    </div>
  )
}
