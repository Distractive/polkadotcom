'use client';

import type { cardsTimelineSelection } from '@/sanity/selections/blocks/cards-timeline';
import type { TypeFromSelection } from 'groqd';

import { Carousel } from '@/components/carousel';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { PortableText } from '@portabletext/react';
import CardTimelineBlock from './card-timeline';

interface Props {
  cards: TypeFromSelection<typeof cardsTimelineSelection>;
}

export function CardsTimelineBlock({ cards }: Props) {
  const isMobile = useBreakpoint('--screen-lg');

  if (!cards || !cards?.items?.length) {
    return null;
  }

  const isCarousel = cards.items.length > 3;

  return (
    <div
      className="grid-system max-width py-gutter pl-gutter"
      data-testid="timeline"
    >
      <Heading variant="h2" className="col-span-12 pb-3 pr-gutter">
        {cards.heading}
      </Heading>
      <div className="flex flex-col gap-copy col-span-8 pb-8 pr-gutter">
        {cards.content && (
          <PortableText
            value={cards.content}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-lg ">{children}</p>
                ),
                smallprint: ({ children }) => (
                  <p className="text-sm ">{children}</p>
                ),
              },
            }}
          />
        )}
      </div>

      <Carousel
        disableCarouselControls={!isMobile && !isCarousel}
        loop={false}
        contentClassName="ml-0"
        navClassName="pr-gutter"
      >
        {cards.items.filter(Boolean).map((item, index) => (
          <CarouselItem
            key={item._key}
            className="basis-5/6 !pl-0  md:basis-[45%] lg:basis-[30%]"
          >
            <CardTimelineBlock
              card={item}
              hasLine={index !== cards.items!.length - 1}
              className="h-full"
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}
