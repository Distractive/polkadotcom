import { urlForImage } from '@/sanity/lib/image';
import type { sideBySideSelection } from '@/sanity/selections/blocks/side-by-side';
import { PortableText } from '@portabletext/react';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { CustomUrl } from '@/components/custom-url';
import { Button, Heading, cn } from '@shared/ui';

import { VideoBlock } from './video';
import { NewsletterButton } from './newsletter-button';

interface Props {
  content: TypeFromSelection<typeof sideBySideSelection>;
}

export function SideBySideBlock({ content }: Props) {
  return (
    <div
      className="grid-system max-width gap-y-gutter px-gutter lg:gap-y-0"
      data-testid={`side-by-side-${content._key}`}
    >
      <div
        className={cn(
          'order-2 col-span-full h-full flex flex-col gap-copy lg:col-span-5',
          content.isImageOnLeft ? 'lg:pl-gutter' : 'lg:order-1 lg:pr-gutter',
          content.isTextVerticallyCentered ? 'justify-center' : 'justify-start',
        )}
      >
        <div className="flex flex-col gap-copy">
          <Heading variant="h2">{content.heading}</Heading>
          {content.subheading && (
            <p className="text-lg ">{content.subheading}</p>
          )}
        </div>
        <div className="flex flex-col gap-copy">
          {content.content && (
            <PortableText
              value={content.content}
              components={{
                block: {
                  h3: ({ children }) => (
                    <Heading variant="h3">{children}</Heading>
                  ),
                  normal: ({ children }) => (
                    <p className="text-lg ">{children}</p>
                  ),
                  smallprint: ({ children }) => (
                    <p className="text-sm ">{children}</p>
                  ),
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
                  newsletterButton: ({ value }) => null,
                },
              }}
            />
          )}
        </div>
        <div className="flex gap-2 md:gap-4 items-start my-2 flex-wrap">
          {content.content && (
            <PortableText
              value={content.content}
              components={{
                block: {
                  h3: ({ children }) => null,
                  normal: ({ children }) => null,
                  smallprint: ({ children }) => null,
                },
                list: {
                  bullet: ({ children }) => null,
                },
                listItem: {
                  bullet: ({ children }) => null,
                },
                types: {
                  customUrl: ({ value }) => {
                    return (
                      <Button
                        size="md"
                        asChild
                        className="md:cursor-pointer whitespace-nowrap"
                        variant={
                          value?.variant
                            ? value.variant === 'primary'
                              ? 'primary'
                              : 'secondary'
                            : 'primary'
                        }
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
                  newsletterButton: ({ value }) => {
                    return (
                      <NewsletterButton
                        key={value._key}
                        value={{
                          label: value.label,
                          modalHeading: value.modalHeading,
                          formType: value.formType,
                          variant: value.variant,
                          _key: value._key,
                          size: 'md',
                        }}
                        className="whitespace-nowrap"
                      />
                    );
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      {content.video && (
        <div
          className={cn(
            'order-1 col-span-full h-auto lg:col-span-7 lg:my-auto',
            content.isImageOnLeft ? '' : 'lg:order-2',
          )}
        >
          <VideoBlock video={content.video} />
        </div>
      )}
      {content.image && !content?.video && (
        <Image
          src={urlForImage(content.image.asset)}
          alt={content?.altText || ''}
          className={cn(
            'order-1 col-span-full h-auto rounded-3xl lg:col-span-7 lg:my-auto',
            content.isImageOnLeft ? '' : 'lg:order-2',
          )}
          width={content.image.asset.metadata.dimensions?.width}
          height={content.image.asset.metadata.dimensions?.height}
        />
      )}
    </div>
  );
}
