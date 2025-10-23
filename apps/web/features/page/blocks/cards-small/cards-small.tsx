import type { cardsSmallSelection } from '@/sanity/selections/blocks/cards-small';
import type { TypeFromSelection } from 'groqd';

import { Heading, cn } from '@shared/ui';
import { PortableText } from '@portabletext/react';

import { urlForImage } from '@/sanity/lib/image';
import CardSmallBlock from './card-small';

interface Props {
  cards: TypeFromSelection<typeof cardsSmallSelection>;
}

export function CardsSmallBlock({ cards }: Props) {
  return (
    <div
      data-testid="cards-small-block"
      key={cards._key}
      className="grid-system max-width relative gap-y-section px-gutter"
    >
      <div
        className={cn(
          'col-span-full flex flex-col gap-copy lg:col-span-8',
          cards.isHeadingCenteredMobile && 'items-center text-center',
          cards.isHeadingCenteredDesktop &&
            'lg:items-center lg:text-center lg:col-start-3',
        )}
      >
        <Heading variant="h2">{cards.heading}</Heading>
        {cards.body && !cards.useRichText && <p>{cards.body}</p>}
        {cards.richBody && cards.useRichText && (
          <div className="prose">
            <PortableText
              value={cards.richBody || []}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                  smallprint: ({ children }) => (
                    <p className="text-sm">{children}</p>
                  ),
                },
                marks: {
                  strong: ({ children }) => <strong>{children}</strong>,
                  link: ({ children, value }) => {
                    if (!value || !value.href) {
                      return children;
                    }

                    const isExternal = value.href.startsWith('http');

                    return (
                      <a
                        className="inline-flex font-default font-bold text-grey-900 underline underline-offset-2 transition-colors hover:text-pink"
                        href={value.href}
                        target={isExternal ? '_blank noopener' : '_self'}
                      >
                        {children}
                      </a>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="flex list-inside list-disc flex-col gap-copy">
                      {children}
                    </ul>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li>{children}</li>,
                },
                types: {
                  break: () => <br />,
                  unsupported: () => null,
                },
              }}
            />
          </div>
        )}
      </div>
      <div
        className={cn(
          'grid-system col-span-full w-full gap-gutter md:auto-rows-1fr pb-2',
        )}
      >
        {cards.items &&
          cards.items.length > 0 &&
          cards.items.map((card, index) => {
            // Span the last two cards if there are 2 cards in a row
            const shouldSpan =
              cards.items!.length % 3 === 2 && index >= cards.items!.length - 2;
            return (
              <CardSmallBlock
                key={card._key}
                card={card}
                className={cn(
                  'col-span-full md:col-span-3 lg:col-span-6 xl:col-span-4',
                  shouldSpan && 'xl:col-span-6',
                )}
              />
            );
          })}
      </div>
      {cards.backgroundImage && (
        <img
          src={urlForImage(cards.backgroundImage.asset)}
          alt=""
          loading="eager"
          className={cn(
            'absolute right-0 top-0 -z-10 hidden h-auto w-2/3 max-w-[90rem] xl:block',
          )}
        />
      )}
    </div>
  );
}
