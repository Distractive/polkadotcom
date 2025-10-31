import { urlForImage } from '@/sanity/lib/image';
import type { cardSelection } from '@/sanity/selections/blocks/card';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { CustomUrl } from '@/components/custom-url';
import { PortableText } from '@portabletext/react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Heading,
  cn,
} from '@shared/ui';

interface Props {
  card: TypeFromSelection<typeof cardSelection>;
  className?: string;
}

export default function CardBlock({ card, className }: Props) {
  const {
    _key,
    headerImage,
    icon,
    selectedTags,
    eyebrow,
    heading,
    body,
    link,
    useAsBackgroundImage,
    useSmallHeading,
    useRichText,
    richBody,
  } = card;

  return (
    <Card
      key={_key}
      className={cn(
        'relative',
        link &&
          'group focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0',
        className,
      )}
      data-tags={selectedTags?.join(',')}
    >
      {headerImage && useAsBackgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={urlForImage(headerImage.asset)}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            width={headerImage.asset.metadata.dimensions?.width}
            height={headerImage.asset.metadata.dimensions?.height}
          />
        </div>
      )}
      <CustomUrl
        value={link}
        isWrapper
        className="relative flex h-full w-full flex-col"
      >
        {headerImage && (
          <CardHeader className="relative z-10 aspect-[4/3]">
            {!useAsBackgroundImage && (
              <Image
                src={urlForImage(headerImage.asset)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
                width={headerImage.asset.metadata.dimensions?.width}
                height={headerImage.asset.metadata.dimensions?.height}
              />
            )}
          </CardHeader>
        )}
        <div
          className={cn(
            'relative flex flex-grow flex-col',
            useAsBackgroundImage && 'bg-gradient-to-t from-black/60 to-black/0',
          )}
        >
          <CardContent
            className={cn(
              'flex flex-grow flex-col gap-card p-card',
              headerImage && icon && 'pt-0',
            )}
          >
            {icon && (
              <Image
                src={urlForImage(icon.asset)}
                alt=""
                loading="lazy"
                width={icon.asset.metadata.dimensions?.width}
                height={icon.asset.metadata.dimensions?.height}
                className={cn(
                  headerImage && icon && 'relative z-10 -mt-[2.25rem]',
                  'mr-auto h-[4.5rem] w-auto rounded-2xl',
                )}
              />
            )}
            {selectedTags && selectedTags.length > 0 && (
              <ul className="flex gap-3">
                {selectedTags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center justify-center rounded bg-grey-200 px-3 py-1 text-sm leading-relaxed text-black dark:bg-grey-900 dark:text-white"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-grow flex-col gap-card">
              <div
                className={cn(
                  'grid gap-copy',
                  useAsBackgroundImage && 'text-white',
                )}
              >
                {eyebrow && (
                  <span className="text-base text-caps-sm uppercase">
                    {eyebrow}
                  </span>
                )}
                {heading && (
                  <Heading
                    variant="h3"
                    size={useSmallHeading ? 'h6' : 'h3'}
                    weight={useSmallHeading ? 'bold' : 'normal'}
                    className={cn(
                      'transition-colors duration-200 ease-in-out',
                      useAsBackgroundImage && 'text-white',
                    )}
                  >
                    {heading}
                  </Heading>
                )}
                {body && !useRichText && (
                  <CardDescription>{body}</CardDescription>
                )}
                {richBody && useRichText && (
                  <CardDescription>
                    <PortableText
                      value={richBody || []}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="text-normal ">{children}</p>
                          ),
                          smallprint: ({ children }) => (
                            <p className="text-sm ">{children}</p>
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
                                className="inline-flex font-default font-bold text-grey-900 underline  underline-offset-2 transition-colors  hover:text-pink"
                                href={value.href}
                                target={
                                  isExternal ? '_blank noopener' : '_self'
                                }
                              >
                                {children}
                              </a>
                            );
                          },
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="flex list-inside list-disc flex-col gap-copy ">
                              {children}
                            </ul>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => <li>{children}</li>,
                        },
                        types: {
                          customUrl: ({ value }) => null,
                        },
                      }}
                    />
                  </CardDescription>
                )}
              </div>
              {link?.variant && (
                <CardFooter className="mt-auto">
                  <Button
                    tabIndex={-1}
                    asChild
                    size="md"
                    className="group-focus-within:after:translate-x-0 md:group-hover:after:translate-x-0"
                    variant={
                      link.variant
                        ? link.variant === 'primary'
                          ? 'primary'
                          : 'secondary'
                        : 'primary'
                    }
                  >
                    <CustomUrl className="outline-none" value={link} isNested>
                      {link.label}
                    </CustomUrl>
                  </Button>
                </CardFooter>
              )}
            </div>
          </CardContent>
        </div>
      </CustomUrl>
    </Card>
  );
}
