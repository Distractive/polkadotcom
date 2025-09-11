'use client';

import { urlForImage } from '@/sanity/lib/image';
import type { ecosystemSelection } from '@/sanity/selections/home/ecosystem';
import { stegaClean } from '@sanity/client/stega';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { CustomUrl } from '@/components/custom-url';
import { ButtonBlock } from '@/features/page/blocks/button-block';
import { Card, CardContent, Heading, cn } from '@shared/ui';

interface Props {
  ecosystem: TypeFromSelection<typeof ecosystemSelection>['ecosystem'];
}

export function Ecosystem({ ecosystem }: Props) {
  return (
    <div className="relative w-full">
      {' '}
      <div
        id="ecosystem-pile"
        data-testid="ecosystem-pile"
        className="grid-pile max-width px-gutter relative"
      >
        <article
          id="ecosystem.wrapper"
          className="grid-system relative col-span-full h-auto w-lvw items-center justify-center overflow-hidden"
        >
          <div
            id="ecosystem.content"
            className={cn(
              'col-span-full flex flex-col items-center justify-center',
            )}
          >
            <div
              className={cn(
                'col-span-full px-gutter md:text-center',
                'md:col-span-8 md:col-start-3 lg:w-9/12 pb-12',
              )}
            >
              <Heading
                variant="h2"
                className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
                aria-label={ecosystem?.title}
                role="heading"
              >
                {ecosystem?.title}
              </Heading>
              <p id="ecosystem-body" className="mb-card text-lg  text-black">
                {ecosystem?.body}
              </p>
            </div>

            <div className="grid-system col-span-12 gap-card !gap-x-card md:px-0">
              {ecosystem?.items.map((item, index) => (
                <Card
                  data-testid={`ecosystem-content-${item._key}`}
                  key={item._key}
                  className={cn(
                    'eco-card aspect-video place-content-end overflow-hidden rounded-2xl md:aspect-auto md:!h-[22.5rem] zoom-hover p-8',
                    'col-span-full col-start-1',
                    (index === 2 || index === 5) && 'lg:col-start-7',
                    (index === 1 ||
                      index === 2 ||
                      index === 4 ||
                      index === 5) &&
                      'relative lg:col-span-6',
                  )}
                  data-index={index}
                >
                  <CustomUrl value={item.link} isWrapper>
                    <Image
                      src={urlForImage(item.image.asset)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      width={item.image.asset.metadata.dimensions?.width}
                      height={item.image.asset.metadata.dimensions?.height}
                    />
                    {item.category && (
                      <div
                        className={cn('pointer-events-none absolute inset-0')}
                      >
                        <div className="pt-10 pl-8">
                          <span
                            className={cn('rounded-lg bg-black/40 px-4 py-2')}
                            style={{
                              color: stegaClean(
                                item.categoryColor ?? '#FFFFFF',
                              ),
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <CardContent className="relative flex flex-col justify-end">
                      <Heading variant="h4" className={cn('text-white pb-2')}>
                        {item.heading}
                      </Heading>
                      <p className="text-white">{item.body}</p>
                    </CardContent>
                  </CustomUrl>
                </Card>
              ))}
            </div>
            <div className="py-12" />
            <ButtonBlock
              buttonBlock={{
                _key: 'ecosystem-cta',
                link: ecosystem?.link ?? null,
              }}
            />
          </div>
        </article>
      </div>{' '}
    </div>
  );
}
