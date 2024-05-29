import type { cardsSelection } from "@/sanity/selections/blocks/cards"
import type { TypeFromSelection } from "groqd"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  cn,
  Heading,
} from "@shared/ui"

import CardBlock from "./card"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}
export function CardsBlock({ cards }: Props) {
  return (
    <div key={cards._key} className="grid-system !mx-0 !px-0">
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
          <div
            className={cn(
              "grid-system col-span-12 !mx-0 gap-card !px-0",
              cards.showSideBySide && "lg:col-span-8 lg:col-start-5"
            )}
          >
            {cards.items.map((card) => (
              <CardBlock
                key={card._key}
                card={card}
                showSideBySide={cards.showSideBySide}
                className={cn(
                  "col-span-12 md:col-span-3 lg:col-span-4",
                  cards.showSideBySide && "lg:col-span-12"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
