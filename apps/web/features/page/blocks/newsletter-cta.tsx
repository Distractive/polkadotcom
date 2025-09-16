import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { HubSpotForm } from '@/components/hubspot-form';
import type { newsletterCTASelection } from '@/sanity/selections/blocks/newsletter-cta';
import { Heading, cn } from '@shared/ui';

interface Props {
  cta: TypeFromSelection<typeof newsletterCTASelection>;
  isPostEmbed?: boolean;
}

export function NewsletterCTA({ cta, isPostEmbed }: Props) {
  return (
    <div
      className={cn(
        'max-width flex justify-center pt-6 pb-12',
        !isPostEmbed && 'px-gutter',
      )}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-grey-300"
        data-testid="newsletter-cta-box"
      >
        <div
          className={cn(
            'flex flex-col md:flex-row rounded-2xl p-card gap-gutter ',
          )}
        >
          {cta.image && (
            <div
              className={cn(
                'rounded-2xl md:min-w-[25%] flex flex-col justify-center ',
                cta.adjustImageForOverflow && 'pb-6',
              )}
            >
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
          <div
            className={cn(
              'flex flex-col justify-center',
              cta.adjustImageForOverflow && 'pb-6 md:pb-0',
            )}
          >
            <Heading variant="h2" className="pb-3 mt-0">
              {cta.heading}
            </Heading>
            {cta.content && (
              <div className="pb-3">
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
              </div>
            )}
            {cta.formType && cta._key && (
              <HubSpotForm type={cta.formType} id={cta._key} />
            )}
            <div className="mt-4 text-sm">
              *By subscribing, you consent to Web 3.0 Technologies Foundation
              collecting and using your personal data to send you newsletters
              and other communications relating to Polkadot and the Web3
              ecosystem. Your personal data will be handled in accordance with
              our{' '}
              <a href="/privacy/" className="text-pink">
                Privacy Policy
              </a>
              , and will only be shared with third parties where necessary to
              provide you with the newsletter service or as required by law. You
              may unsubscribe from the newsletter at any time by clicking the
              “unsubscribe” link included in our emails.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
