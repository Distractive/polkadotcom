"use client"

import { useEffect, useState } from "react"
import { type cardSelection } from "@/sanity/selections/blocks/card"
import type { TypeFromSelection } from "groqd"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Progress,
  type CarouselApi,
} from "@shared/ui"

import CardBlock from "./card"

interface Props {
  cards: TypeFromSelection<typeof cardSelection>[]
}

export function CardCarousel({ cards }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="col-span-12 flex flex-col gap-gutter"
    >
      <CarouselContent>
        {cards.map((card) => (
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
  )
}
