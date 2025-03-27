'use client';

import type { mediaBlockSelection } from '@/sanity/selections/blocks/media-block';
import type { TypeFromSelection } from 'groqd';
import React from 'react';

import { CustomUrl } from '@/components/custom-url';
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

import { VideoBlock } from './video';

interface Props {
  mediaBlock: TypeFromSelection<typeof mediaBlockSelection>;
  className?: string;
}

export function MediaBlock({ mediaBlock, className }: Props) {
  const { image, video, eyebrow, heading, body, links } = mediaBlock;

  return (
    <div
      className={cn(
        ' w-full px-gutter',
        mediaBlock.isFullWidthVideo
          ? 'mx-auto max-w-[80rem] 2xl:max-w-none 2xl:px-0'
          : 'max-width grid-system gap-card',
        className,
      )}
    >
      <Card
        className={cn(
          'w-full rounded-none border-none',
          !mediaBlock.isFullWidthVideo &&
            'col-span-full md:!h-auto lg:col-span-8 lg:col-start-3',
        )}
      >
        {video && <VideoBlock video={video} className="aspect-video" />}
        {image && (
          <CardHeader className="relative z-10 aspect-video">
            <img
              src={image.asset.url}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center"
            />
          </CardHeader>
        )}

        <div className="relative">
          <CardContent className="grid">
            {(eyebrow || heading || body) && (
              <div className="grid gap-copy py-card">
                {eyebrow && (
                  <span className="text-base text-caps-sm font-bold uppercase">
                    {eyebrow}
                  </span>
                )}
                {heading && (
                  <Heading variant="h2" size="h3">
                    {heading}
                  </Heading>
                )}
                {body && (
                  <CardDescription className="text-base">
                    {body}
                  </CardDescription>
                )}
              </div>
            )}
            {links && (
              <CardFooter className="flex flex-wrap gap-4">
                {links?.map((link, index) => (
                  <React.Fragment key={link.label}>
                    {link.label && (
                      <Button
                        asChild
                        size="md"
                        variant={
                          link.variant
                            ? link.variant === 'primary'
                              ? 'primary'
                              : 'secondary'
                            : 'primary'
                        }
                      >
                        <CustomUrl
                          className="outline-none"
                          value={{
                            internal: link?.internal,
                            external: link?.external,
                          }}
                        >
                          {link.label}
                        </CustomUrl>
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </CardFooter>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
