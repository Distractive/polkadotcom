import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { Heading, cn } from '@shared/ui';
import type { newsletterCTASelection } from '@/sanity/selections/blocks/newsletter-cta';
import { HubSpotForm } from '@/components/hubspot-form';

interface Props {
  cta: TypeFromSelection<typeof newsletterCTASelection>;
}

export function NewsletterCTA({ cta }: Props) {
  return (
    <div className={cn('max-width flex px-gutter justify-center')}>
      <div
        className="relative w-full max-w-[60rem] overflow-hidden rounded-2xl border border-grey-300"
        data-testid="newsletter-cta-box"
      >
        <div
          className={cn(
            'flex flex-col md:flex-row rounded-2xl p-8 md:px-gutter gap-gutter',
          )}
        >
          {cta.image && (
            <div className="rounded-2xl pb-4">
              <Image
                src={urlForImage(cta.image.asset)}
                alt={cta.altText || ''}
                width={cta.image.asset.metadata.dimensions?.width}
                height={cta.image.asset.metadata.dimensions?.height}
                quality={90}
                className="rounded-2xl"
              />
            </div>
          )}
          <div className={cn('flex flex-col justify-center')}>
            <Heading variant="h2" className="pb-3">
              {cta.heading}
            </Heading>
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
            {cta.formType && cta._key && (
              <HubSpotForm type={cta.formType} id={cta._key} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
