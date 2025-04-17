'use client';

import type { bannerSelection } from '@/sanity/selections/banner';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CustomUrl } from '@/components/custom-url';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Heading,
  Icon,
  cn,
} from '@shared/ui';

interface BannerProps {
  banner: TypeFromSelection<typeof bannerSelection>;
}

export default function Banner({ banner }: BannerProps) {
  const [isBannerClosed, setIsBannerClosed] = useState(true);

  useEffect(() => {
    function checkBannerCookie() {
      return document.cookie
        .split('; ')
        .some(cookie => cookie.startsWith('polkadot_banner_closed=true'));
    }

    setIsBannerClosed(checkBannerCookie());
  }, []);

  function handleClose () {
    document.cookie = 'polkadot_banner_closed=true';
    setIsBannerClosed(true);
  }

  if (isBannerClosed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-6 z-40 rounded-2xl bg-white sm:right-auto ">
      <div className="relative h-full w-full">
        <button
          type="button"
          className="group absolute right-[-1rem] top-[-1rem] z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-grey-300 bg-white transition-colors duration-200 hover:bg-black"
          onClick={handleClose}
        >
          <Icon
            variant="close"
            className="size-6 text-black transition-colors duration-200 group-hover:text-white"
          />
        </button>
      </div>
      <Card
        className={cn(
          banner.link &&
            'focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card',
        )}
      >
        <CustomUrl value={banner.link} isWrapper>
          <div
            className={cn(
              'flex h-full gap-4 p-4 md:gap-6 md:p-6 lg:gap-card lg:p-card',
              banner.icon ? 'items-center' : 'items-start',
            )}
          >
            {banner.icon && (
              <Image
                src={banner.icon.asset.url}
                alt={banner.altText || ''}
                loading="lazy"
                width={100}
                height={100}
                className={cn('size-14 rounded-2xl object-cover object-center')}
              />
            )}
            <CardContent className="grid gap-copy">
              {banner.eyebrow && (
                <span className="text-caps-small text-xs font-bold uppercase md:text-base">
                  {banner.eyebrow}
                </span>
              )}
              {banner.header && (
                <Heading
                  variant="h3"
                  size="h4"
                  className={cn(
                    'text-sm text-black transition-colors duration-100 ease-in-out',
                    banner.link && [
                      'group-hover:text-pink group-focus-visible:text-pink',
                      'link:!text-current visited:!text-current',
                    ],
                  )}
                >
                  {banner.header}
                </Heading>
              )}
              {banner?.link?.variant && (
                <Button
                  tabIndex={-1}
                  asChild
                  variant={
                    banner.link.variant
                      ? banner.link.variant === 'primary'
                        ? 'primary'
                        : 'secondary'
                      : 'primary'
                  }
                  size="md"
                  className="mt-copy group-focus-within:after:translate-x-0 md:mr-auto md:group-hover:after:translate-x-0"
                />
              )}
            </CardContent>
            {banner.link && !banner.link.variant && (
              <CardFooter className="ml-auto place-self-center">
                <Icon
                  variant={banner.link.internal ? 'arrowRight' : 'arrowRightUp'}
                />
              </CardFooter>
            )}
          </div>
        </CustomUrl>
      </Card>
    </div>
  );
}
