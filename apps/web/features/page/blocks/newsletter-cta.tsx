import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { Heading, cn } from '@shared/ui';
import type { newsletterCTASelection } from '@/sanity/selections/blocks/newsletter-cta';

interface Props {
  cta: TypeFromSelection<typeof newsletterCTASelection>;
}

export function NewsletterCTA({ cta }: Props) {
  return (
    <div className={cn('max-width flex px-gutter justify-center')}>
      <div
        className="relative w-full max-w-[60rem] overflow-hidden rounded-2xl "
        data-testid="cta-box"
      >
        {cta.image && (
          <div className="absolute inset-0 -z-10  overflow-hidden rounded-2xl">
            <Image
              src={urlForImage(cta.image.asset)}
              alt={cta.altText || ''}
              layout="fill"
              objectFit="cover"
              quality={90}
              className="rounded-2xl"
            />
          </div>
        )}

        <div
          className={cn(
            'flex rounded-2xl p-8 md:p-gutter',
            !cta.image && 'border border-grey-300',
          )}
        >
          <div className={cn('flex flex-col gap-4')}>
            <Heading variant="h2">{cta.heading}</Heading>
            {cta.content && (
              <PortableText
                value={cta.content}
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
        </div>
      </div>
    </div>
  );
}
