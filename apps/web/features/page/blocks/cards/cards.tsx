import type { cardsSelection } from "@/sanity/selections/blocks/cards"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardBlock from "./card"
import { CardCarousel } from "./card-carousel"
import { CardTags } from "./card-tags"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}

export function CardsBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system px-gutter">
      <div
        className={cn(
          "col-span-12 pb-gutter",
          cards.showSideBySide && "lg:col-span-4"
        )}
      >
        <div className="flex flex-col gap-copy lg:w-5/6">
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p>{cards.body}</p>}
        </div>
      </div>

      {cards.isCarousel ? (
        <CardCarousel cards={cards.items} />
      ) : (
        <>
          <div
            className={cn(
              "grid-system col-span-12 !mx-0 gap-gutter !px-0",
              cards.showSideBySide && "lg:col-span-8 lg:col-start-5"
            )}
          >
            {cards.hasTags ? (
              <CardTags tags={cards.tags} cards={cards.items} />
            ) : (
              cards.items.map((card) => (
                <CardBlock
                  key={card._key}
                  card={card}
                  showSideBySide={cards.showSideBySide}
                  className={cn(
                    "col-span-12 md:col-span-3 lg:col-span-4",
                    cards.showSideBySide && "lg:col-span-12"
                  )}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
