"use client"

import { type cardsTimelineSelection } from "@/sanity/selections/blocks/cards-timeline"
import type { TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { CarouselItem, Heading } from "@shared/ui"
import { Carousel } from "@/components/carousel"

import CardTimelineBlock from "./card-timeline"

interface Props {
  cards: TypeFromSelection<typeof cardsTimelineSelection>
}

export function CardsTimelineBlock({ cards }: Props) {
  const isCarousel = cards.items.length > 3
  const isMobile = useBreakpoint("--screen-lg")

  return (
    <div className="grid-system max-width py-gutter pl-gutter">
      <Heading
        variant="h3"
        size="h2"
        className="col-span-full text-balance pb-gutter pr-gutter"
      >
        {cards.heading}
      </Heading>

      <Carousel
        disableCarouselControls={!isMobile && !isCarousel}
        loop={false}
        contentClassName="ml-0"
        navClassName="pr-gutter"
      >
        {cards.items.map((item, index) => (
          <CarouselItem
            key={item._key}
            className="basis-5/6 !pl-0 md:basis-[45%] lg:basis-[30%]"
          >
            <CardTimelineBlock
              card={item}
              hasLine={index !== cards.items.length - 1}
              className="h-full"
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
