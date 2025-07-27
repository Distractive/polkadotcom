import CardSmallBlock from '@/features/page/blocks/cards-small/card-small';
import type { networkSelection } from '@/sanity/selections/home/network';
import { Heading, cn } from '@shared/ui';
import type { TypeFromSelection } from 'groqd';

interface Props {
  network: TypeFromSelection<typeof networkSelection>['network'];
}

export function SmallCardsHome({ network }: Props) {
  return (
    <div
      id="network-pile"
      data-testid="network-pile"
      className="grid-pile relative py-[6rem] md:py-[10rem] max-width px-gutter"
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
            'lg:col-span-full lg:col-start-1',
            'xl:col-span-10 xl:col-start-2',
            'mt-header-top md:mt-0',
          )}
        >
          <div
            className={cn(
              'col-span-full px-gutter md:text-center',
              'md:col-span-8 md:col-start-3 lg:w-4/6 pb-12',
            )}
          >
            <Heading
              variant="h2"
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
              aria-label={network.title}
              role="heading"
            >
              {network.title}
            </Heading>

            <p id="network-body" className="mb-gutter text-lg text-black">
              {network.body}
            </p>
          </div>
          <div className="grid-system relative col-span-full mt-[-3rem] gap-card pb-2">
            {network.items.map((item, index) => (
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
