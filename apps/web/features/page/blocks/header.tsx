import { urlForImage } from '@/sanity/lib/image';
import type { headerSelection } from '@/sanity/selections/blocks/header';
import type { newsletterButtonSelection } from '@/sanity/selections/blocks/newsletter-button';
import type { customUrlSelection } from '@/sanity/selections/custom-url';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';

import { CustomUrl } from '@/components/custom-url';
import { Button, Heading, cn } from '@shared/ui';

import { BreadcrumbBlock, type BreadcrumbProps } from './breadcrumb';
import { NewsletterButton } from './newsletter-button';
import { VideoBlock } from './video';

interface Props {
  header: TypeFromSelection<typeof headerSelection>;
  breadcrumb?: BreadcrumbProps;
  className?: string;
}

export function HeaderBlock({ header, breadcrumb, className }: Props) {
  const renderNewsletterButton = (
    link: TypeFromSelection<typeof newsletterButtonSelection>,
  ) => {
    const variant =
      link.variant === 'primary' || link.variant === 'secondary'
        ? link.variant
        : undefined;

    return (
      <NewsletterButton
        key={link._key}
        value={{
          label: link.label,
          modalHeading: link.modalHeading,
          formType: link.formType,
          variant: variant,
          _key: link._key,
          size: 'lg',
        }}
      />
    );
  };

  const renderCustomUrl = (
    link: TypeFromSelection<typeof customUrlSelection>,
  ) => {
    console.log('--------------------------------');
    console.log(`Received link: ${JSON.stringify(link)}`);
    console.log('--------------------------------');

    const variant =
      link?.variant === 'primary' ||
      link?.variant === 'secondary' ||
      link?.variant === 'tertiary' ||
      link?.variant === 'disabled'
        ? link.variant
        : 'primary';

    return (
      <Button variant={variant} size="lg">
        <CustomUrl
          className="outline-none"
          value={{
            internal: link.internal,
            external: link.external,
          }}
        >
          {link.label}
        </CustomUrl>
      </Button>
    );
  };

  // Alternate Header
  if (header.isAlternate) {
    return (
      <header
        className={cn(
          'max-width relative mb-page flex flex-col overflow-x-hidden',
          className,
        )}
      >
        {/* Desktop and tablet image */}
        {header.image && (
          <div className="relative hidden h-[400px] w-full md:block">
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={urlForImage(header.image.asset)}
                alt={header?.altText || ''}
                className="hidden h-[400px] w-full rounded-b-2xl object-cover md:block"
                width={header.image.asset.metadata.dimensions?.width}
                height={header.image.asset.metadata.dimensions?.height}
                priority
                quality={90}
              />
            </div>
          </div>
        )}
        {/* Mobile image */}
        {header.mobileImage && (
          <div className=" ">
            <Image
              src={urlForImage(header.mobileImage.asset)}
              alt={header?.altText || ''}
              className="w-full object-cover md:hidden"
              width={header.mobileImage.asset.metadata.dimensions?.width}
              height={header.mobileImage.asset.metadata.dimensions?.height}
              priority
              quality={90}
            />
          </div>
        )}
        <div
          data-testid="header"
          className={cn(
            'flex max-w-4xl flex-col justify-center gap-copy lg:pt-16',
            header.image
              ? 'px-gutter pt-card'
              : 'mt-gutter px-gutter pt-header-top',
          )}
        >
          {breadcrumb && !header.hideBreadcrumbs && (
            <BreadcrumbBlock items={breadcrumb.items} />
          )}

          <Heading variant="h1">{header.title}</Heading>

          {header.body && <p className="text-lg">{header.body}</p>}
          {header.links && (
            <div
              id="main-content"
              className="mt-card flex w-full flex-wrap gap-4"
            >
              {header.links?.map((link, index) =>
                link._type === 'newsletterButton'
                  ? renderNewsletterButton(link)
                  : renderCustomUrl(link),
              )}{' '}
            </div>
          )}
          {header.video && (
            <VideoBlock video={header.video} className="mt-gutter w-full" />
          )}
        </div>
      </header>
    );
  }

  // Original side-by-side header
  return (
    <header
      data-testid="side-by-side-header"
      className={cn(
        'grid-system max-width relative col-span-full mb-16 overflow-x-hidden lg:mb-page',
        className,
        header.image ? 'pt-32' : 'pt-0',
        // Hide margin if no image or title
        !header.image && !header.title && '!mb-[-4rem] md:!mb-[-6rem]',
      )}
    >
      {/* biome-ignore lint/style/useSelfClosingElements: <Not possible> */}
      {!header.image && <div className="pt-4"></div>}

      {header.image && (
        <div className="col-span-full w-full px-gutter lg:order-2 lg:col-span-7 lg:col-start-6">
          <Image
            src={urlForImage(header.image.asset)}
            alt={header?.altText || ''}
            width={header.image.asset.metadata.dimensions?.width}
            height={header.image.asset.metadata.dimensions?.height}
            priority
            quality={90}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      )}
      <div
        className={cn(
          'col-span-full flex flex-col items-start justify-center gap-copy',
          header.image
            ? 'px-gutter pt-card lg:order-1 lg:col-span-5 lg:col-start-1 '
            : 'mt-gutter px-gutter pt-header-top lg:col-span-8 lg:col-start-3',
        )}
      >
        {breadcrumb && !header.hideBreadcrumbs && (
          <BreadcrumbBlock items={breadcrumb.items} />
        )}

        <Heading variant="h1">{header.title}</Heading>

        {header.body && <p className="text-lg">{header.body}</p>}
        {header.links && (
          <div
            id="main-content"
            className="mt-card flex w-full flex-wrap gap-4"
          >
            {header.links?.map((link) =>
              link._type === 'newsletterButton'
                ? renderNewsletterButton(link)
                : renderCustomUrl(link),
            )}
          </div>
        )}
        {header.video && (
          <VideoBlock video={header.video} className="mt-gutter w-full" />
        )}
      </div>
    </header>
  );
}
