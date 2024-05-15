import type { cardsSelection } from "@/sanity/selections/blocks/cards"
import type { TypeFromSelection } from "groqd"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui"

import { CardBlock } from "./card"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}
export function CardsBlock({ cards }: Props) {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-4 font-display text-3xl text-red-500">
        {cards.isCarousel ? "CAROUSEL CARD BLOCK" : "LIST CARD BLOCK"}
      </h1>
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
