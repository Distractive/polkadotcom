"use client"

import type { cardsSelection } from "@/sanity/selections/blocks/cards"
import type { TypeFromSelection } from "groqd"

import { CarouselItem, cn, Heading } from "@shared/ui"

import { Carousel } from "../../../../components/carousel"
import CardBlock from "./card"
import { CardTags } from "./card-tags"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}

export function CardsBlock({ cards }: Props) {
  return (
    <div
      key={cards._key}
      className={cn(
        "grid-system max-width relative",
        !cards.isCarousel && "px-gutter"
      )}
    >
      <div className="col-span-full pb-section lg:col-span-8">
        <div
          className={cn(
            "flex flex-col gap-copy",
            cards.isCarousel && "px-gutter"
          )}
        >
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p>{cards.body}</p>}
        </div>
      </div>
      {cards.isCarousel ? (
        <Carousel className="px-gutter">
          {cards.items &&
            cards.items.map((card) => (
              <CarouselItem
                key={card._key}
                className={cn(
                  "basis-5/6 lg:basis-[40%]",
                  cards.useFourColumns ? "xl:basis-1/4" : "xl:basis-1/3"
                )}
              >
                <CardBlock key={card._key} card={card} className="h-full" />
              </CarouselItem>
            ))}
        </Carousel>
      ) : (
        <>
          <div
            className={cn(
              "grid-system col-span-full gap-section",
              !cards.hasTags && "md:auto-rows-1fr"
            )}
          >
            {cards.hasTags && cards.items ? (
              <CardTags
                tags={cards.tags}
                cards={cards.items}
                useFourColumns={cards.useFourColumns}
              />
            ) : (
              cards.items?.map((card) => {
                return (
                  <div
                    key={card._key}
                    className={cn(
                      "col-span-full md:col-span-3 lg:col-span-4",
                      cards.useFourColumns ? "xl:col-span-3" : "xl:col-span-4"
                    )}
                  >
                    <CardBlock card={card} />
                  </div>
                )
              })
            )}
          </div>
        </>
      )}
    </div>
  )
}
