import type { cardsSelection } from "@/sanity/selections/blocks/cards"
import type { TypeFromSelection } from "groqd"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Heading,
} from "@shared/ui"

import { CardBlock } from "./card"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}
export function CardsBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="flex w-full flex-col items-center">
      {cards.heading && <Heading variant="h1">{cards.heading}</Heading>}
      {cards.body && <p>{cards.body}</p>}
      {cards.isCarousel ? (
        <Carousel className="w-full max-w-sm">
          <CarouselContent>
            {cards.items.map((card) => (
              <CarouselItem key={card._key}>
                <CardBlock key={card._key} card={card} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <>
          <div className="grid auto-rows-fr grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {cards.items.map((card) => (
              <CardBlock key={card._key} card={card} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
