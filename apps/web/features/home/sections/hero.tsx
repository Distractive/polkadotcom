'use client';

import type { heroSelection } from '@/sanity/selections/home/hero';
import type { TypeFromSelection } from 'groqd';

import { CustomUrl } from '@/components/custom-url';
import { FullscreenVideoButton } from '@/components/fullscreen-video-button';
import type { videoSelection } from '@/sanity/selections/home/video';
import { Button, Heading, cn } from '@shared/ui';
import { BackgroundVideo } from './background-video';

interface Props {
  hero: TypeFromSelection<typeof heroSelection>['hero'];
  backgroundVideo: TypeFromSelection<typeof videoSelection>['video'];
}

export function Hero({ hero, backgroundVideo }: Props) {
  return (
    <>
      <div
        id="hero-pile"
        data-testid="hero-pile"
        className="relative flex flex-col overflow-visible pt-20 h-screen md:h-[60rem] bg-black"
      >
        <BackgroundVideo
          video={backgroundVideo?.video}
          showOverlay={true}
          overlayOpacity={20}
          className=""
          muted={true}
          localVideoPath={'/videos/polkadot-home-video-2.mp4'}
        />
        <article
          id="hero.wrapper"
          className={cn(
            'grid-system max-width relative   !overflow-visible px-gutter h-full',
          )}
        >
          <div className="relative max-width col-span-12 flex flex-row !overflow-visible ">
            {/* HEADING */}
            <div
              id="hero.content"
              className={cn(
                'relative  order-2  flex flex-col justify-end pb-24 md:pb-0 md:justify-center lg:order-1 lg:col-span-2',
                ' md:mt-0',
              )}
            >
              <div className="sm:max-w-xl md:max-w-2xl ">
                <Heading
                  variant="h1"
                  className="pb-card leading-[1] md:!text-[3.813rem] text-white"
                >
                  {hero?.title}
                </Heading>
                <div className="flex w-full">
                  {' '}
                  <p className="text-lg xl:text-2xl text-white">{hero?.copy}</p>
                </div>

                <div
                  id="main-content"
                  className="flex flex-col  gap-4  pt-card md:flex-row"
                >
                  {hero?.links?.map((link, index) => (
                    <Button
                      asChild
                      key={link.label}
                      variant={link?.variant || 'primary'}
                      size="lg"
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
                  ))}
                </div>
              </div>
            </div>
            {/* Launch Video Button */}
            <FullscreenVideoButton videoUrl="/videos/defy-whats-possible-video.mp4" />
          </div>
        </article>
      </div>
      <div className="h-8 rounded-t-xl -mt-3 relative z-30 bg-white dark:bg-black w-full" />
    </>
  );
}
