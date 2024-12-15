import type { cardsSmallSelection } from "@/sanity/selections/blocks/cards-small"
import type { TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"

import CardSmallBlock from "./card-small"

interface Props {
  cards: TypeFromSelection<typeof cardsSmallSelection>
}

export function CardsSmallBlock({ cards }: Props) {
  return (
    <div
      key={cards._key}
      className="grid-system max-width relative gap-y-section px-gutter"
    >
      <div className="col-span-full flex flex-col gap-copy lg:col-span-8">
        <Heading variant="h2">{cards.heading}</Heading>
        {cards.body && <p>{cards.body}</p>}
      </div>
      <div
        className={cn(
          "grid-system col-span-full w-full gap-gutter md:auto-rows-1fr"
        )}
      >
        {cards.items &&
          cards.items.length > 0 &&
          cards.items.map((card, index) => {
            // span the last two cards if there are 2 cards in a row
            const shouldSpan =
              cards.items!.length % 3 === 2 && index >= cards.items!.length - 2
            return (
              <CardSmallBlock
                key={card._key}
                card={card}
                className={cn(
                  "col-span-full md:col-span-3 lg:col-span-6 xl:col-span-4",
                  shouldSpan && "xl:col-span-6"
                )}
              />
            )
          })}
      </div>
      {cards.backgroundImage && (
        <img
          src={cards.backgroundImage.asset.url}
          alt=""
          loading="eager"
          className={cn(
            "absolute right-0 top-0 -z-10 hidden h-auto w-2/3 max-w-[90rem] xl:block"
          )}
        />
      )}
    </div>
  )
}
