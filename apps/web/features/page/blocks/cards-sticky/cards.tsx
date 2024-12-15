import type { cardsStickySelection } from "@/sanity/selections/blocks/cards-sticky"
import type { TypeFromSelection } from "groqd"

import { Heading } from "@shared/ui"

import CardStickyBlock from "./card"

interface Props {
  cards: TypeFromSelection<typeof cardsStickySelection>
}

export function CardsStickyBlock({ cards }: Props) {
  if (!cards) return null

  return (
    <div
      key={cards._key}
      className="max-width relative flex flex-col gap-gutter p-gutter lg:flex-row"
    >
      <div className="flex-col gap-copy lg:w-[40%] lg:pr-gutter lg:align-top">
        <div className="lg:sticky lg:top-gutter">
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p className="mt-copy">{cards.body}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-gutter lg:inline-flex lg:w-[60%] lg:align-top">
        {cards?.items?.map(
          (card) =>
            card && (
              <div key={card._key} className="z-10 lg:sticky lg:top-gutter">
                <CardStickyBlock card={card} />
              </div>
            )
        )}
      </div>
    </div>
  )
}
