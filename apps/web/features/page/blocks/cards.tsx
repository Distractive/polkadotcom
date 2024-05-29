"use client"

import { useEffect, useState } from "react"
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
  Progress,
  type CarouselApi,
} from "@shared/ui"

import CardBlock from "./card"

interface Props {
  cards: TypeFromSelection<typeof cardsSelection>
}

export function CardsBlock({ cards }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

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
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="col-span-12 flex w-full flex-col gap-gutter"
        >
          <CarouselContent>
            {cards.items.map((card) => (
              <CarouselItem key={card._key} className="basis-5/6 lg:basis-1/3">
                <CardBlock key={card._key} card={card} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between">
            <Progress count={count} current={current} />
            <div className="flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
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
