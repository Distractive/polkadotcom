import CardSmallBlock from '@/features/page/blocks/cards-small/card-small';
import type { networkSelection } from '@/sanity/selections/home/network';
import { Heading, cn } from '@shared/ui';
import type { TypeFromSelection } from 'groqd';

interface Props {
  cards: TypeFromSelection<typeof networkSelection>['network'];
}

export function SmallCardsHome({ cards }: Props) {
  return (
    <div
      id="network-pile"
      data-testid="network-pile"
      className="grid-pile relative py-section max-width px-gutter"
    >
      <div
        id="network.wrapper"
        className="grid-system relative col-span-full h-full items-center justify-center overflow-x-hidden md:h-full"
      >
        <div
          id="network.content"
          data-testid="network-pile-content"
          className={cn(
            'col-span-full flex flex-col items-center justify-center',
            'md:col-span-full md:col-start-1 md:w-full',
          )}
        >
          <div
            className={cn(
              'col-span-full px-gutter md:text-center',
              'md:col-span-8 md:col-start-3 lg:w-4/6 pb-4',
            )}
          >
            <Heading
              variant="h2"
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
              aria-label={cards.title}
              role="heading"
            >
              {cards.title}
            </Heading>

            <p id="network-body" className="mb-gutter text-lg text-black">
              {cards.body}
            </p>
          </div>
          <div className="grid-system relative col-span-full gap-card pb-2">
            {cards.items.map((item, index) => (
              <CardSmallBlock
                key={item._key}
                card={item}
                className="network-card col-span-full flex items-start justify-between md:col-span-4 md:col-start-2 lg:col-span-4"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
