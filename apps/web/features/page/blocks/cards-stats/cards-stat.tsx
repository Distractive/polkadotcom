import { CustomUrl } from '@/components/custom-url';
import type { cardsStatSelection } from '@/sanity/selections/blocks/cards-stat';
import { PortableText } from '@portabletext/react';
import { Button, Heading, cn } from '@shared/ui';
import type { TypeFromSelection } from 'groqd';
import CardStatBlock from './card-stat';

interface Props {
  cards: TypeFromSelection<typeof cardsStatSelection>;
}

export function CardsStatBlock({ cards }: Props) {
  if (!cards || !cards?.items?.length) {
    return null;
  }

  return (
    <div
      key={cards._key}
      className="grid-system max-width px-gutter"
      data-testid="cards-stat"
    >
      <div className="col-span-full lg:col-span-8 pb-section">
        <Heading variant="h2">{cards.heading}</Heading>
      </div>
      <div
        className={cn(
          'grid-system col-span-full gap-gutter md:auto-rows-1fr pb-12',
        )}
      >
        {cards.items.map((card) => (
          <CardStatBlock
            key={card._key}
            card={card}
            className="col-span-full md:col-span-3 lg:col-span-4"
          />
        ))}
      </div>
      {cards.content && (
        <div className="lg:col-span-8 col-span-full lg:pt-0 flex flex-col gap-copy">
          <PortableText
            value={cards.content}
            components={{
              block: {
                h2: ({ children }) => (
                  <Heading variant="h2">{children}</Heading>
                ),
                h3: ({ children }) => (
                  <Heading variant="h3" size="h2">
                    {children}
                  </Heading>
                ),
                h4: ({ children }) => (
                  <Heading variant="h4">{children}</Heading>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="my-4 list-outside list-disc pl-8 marker:text-black">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="my-4 list-outside list-decimal pl-8 text-grey-900 marker:text-black ">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li>{children}</li>,
                number: ({ children }) => <li>{children}</li>,
              },
              marks: {
                link: ({ children, value }) => {
                  const rel = !value.href.startsWith('/')
                    ? 'noreferrer noopener'
                    : undefined;
                  return (
                    <a href={value.href} rel={rel} className="link-styling">
                      {children}
                    </a>
                  );
                },
              },
              types: {
                customUrl: ({ value }) => {
                  return (
                    <Button
                      variant={value.internal ? 'primary' : 'secondary'}
                      size="md"
                      className="mr-auto mt-copy"
                      asChild
                    >
                      <CustomUrl
                        className="outline-none"
                        value={{
                          internal: value?.internal,
                          external: value?.external,
                        }}
                      >
                        {value.label}
                      </CustomUrl>
                    </Button>
                  );
                },
                break: () => {
                  return <div className="my-1" />;
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
