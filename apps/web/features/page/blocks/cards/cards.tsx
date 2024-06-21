"use client"

import { useEffect, useState } from "react"
import type { cardsSelection } from "@/sanity/selections/blocks/cards"
import type { TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { CarouselItem, cn, Heading } from "@shared/ui"

import { Carousel } from "../../../../components/carousel"
import CardBlock from "./card"
import { CardTags } from "./card-tags"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}

export function CardsBlock({ cards }: Props) {
  const [isSticky, setIsSticky] = useState(false)
  const isMobile = useBreakpoint("--screen-lg")

  useEffect(() => {
    if (cards.showSideBySide && !isMobile) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [cards, isMobile])

  return (
    <div key={cards._key} className="grid-system max-width relative px-gutter">
      <div
        className={cn(
          "col-span-12 pb-gutter",
          cards.showSideBySide && "lg:col-span-4",
          isSticky && "sticky top-gutter mb-auto"
        )}
      >
        <div className="flex flex-col gap-copy lg:w-5/6">
          <Heading variant="h2">{cards.heading}</Heading>
          {cards.body && <p>{cards.body}</p>}
        </div>
      </div>
      {cards.isCarousel ? (
        <Carousel>
          {cards.items.map((card) => (
            <CarouselItem key={card._key} className="basis-5/6 lg:basis-1/3">
              <CardBlock key={card._key} card={card} className="h-full" />
            </CarouselItem>
          ))}
        </Carousel>
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
                <div
                  key={card._key}
                  className={cn(
                    "col-span-12 md:col-span-3 lg:col-span-4",
                    cards.showSideBySide && "lg:col-span-12",
                    isSticky && "sticky top-gutter"
                  )}
                >
                  <CardBlock
                    card={card}
                    showSideBySide={cards.showSideBySide}
                  />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
