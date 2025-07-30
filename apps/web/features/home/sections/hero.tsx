'use client';

import type { heroSelection } from '@/sanity/selections/home/hero';
import type { TypeFromSelection } from 'groqd';
import { useState } from 'react';

import { CustomUrl } from '@/components/custom-url';
import { Button, Heading, cn } from '@shared/ui';
import { BackgroundVideo } from './background-video';
import type { videoSelection } from '@/sanity/selections/home/video';

interface Props {
  hero: TypeFromSelection<typeof heroSelection>['hero'];
  backgroundVideo: TypeFromSelection<typeof videoSelection>['video'];
}

export function Hero({ hero, backgroundVideo }: Props) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      id="hero-pile"
      data-testid="hero-pile"
      className="md:pt-30 relative -mt-[2rem] mb-8 flex flex-col overflow-visible md:mt-0 md:pt-16 xl:mb-32"
    >
      {/* biome-ignore lint/style/useSelfClosingElements: <Not possible> */}
      {/* <div className="absolute inset-0 -z-10 bg-[image:linear-gradient(to_bottom_right,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom_right,#07FFFF_0%,#7916F3_100%)] bg-[length:101%_100%] bg-no-repeat "></div> */}

      <article
        id="hero.wrapper"
        className={cn(
          'grid-system max-width relative   !overflow-visible lg:px-gutter',
        )}
      >
        <BackgroundVideo
          video={backgroundVideo.video}
          showOverlay={true}
          overlayOpacity={20}
          className=""
          muted={isMuted}
        />

        {/* Watch with Sound Button */}
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-3 text-white transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isMuted ? 'Watch with sound' : 'Mute video'}
        >
          <span className="text-sm font-medium whitespace-nowrap">
            WATCH WITH SOUND
          </span>
          {isMuted ? (
            // Muted icon (speaker with X)
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            // Unmuted icon (speaker with sound waves)
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <div className="max-width col-span-12 flex flex-col !overflow-visible  lg:flex-row">
          {/* HEADING */}
          <div
            id="network.content"
            className={cn(
              'relative  order-2  flex flex-col justify-center px-gutter lg:order-1 lg:col-span-2 lg:px-0',
              '-mt-[8rem] sm:-mt-[5rem] md:mt-0',
            )}
          >
            <div className="sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-6xl  ">
              <Heading
                variant="h1"
                className="pb-card leading-[1] md:!text-[3.813rem] text-white"
              >
                {hero.title}
              </Heading>
              <div className="flex w-full">
                {' '}
                <p className="text-lg xl:text-2xl text-white">{hero.copy}</p>
              </div>

              <div
                id="main-content"
                className="flex flex-col  gap-4  pt-card md:flex-row"
              >
                {hero.links?.map((link, index) => (
                  <Button
                    asChild
                    key={link.label}
                    variant={
                      link?.variant
                        ? link.variant === 'primary'
                          ? 'primary'
                          : 'secondary'
                        : 'primary'
                    }
                    size="lg"
                    className="flex-1 whitespace-nowrap"
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
          {/* ANIMATION */}

          <div
            className="bg-transparent relative  order-1   min-h-[36rem] w-full scale-75 overflow-visible  md:min-w-[36rem] md:scale-100 lg:order-2 lg:mb-0 lg:min-h-[48rem] xl:translate-x-[5%] 2xl:translate-x-[10%]"
            data-testid="dots-animation"
          >
            {/* <div className="bg-transparent absolute inset-0 w-full origin-center  !overflow-visible lg:pl-10 lg:pr-16">
              <Spline scene="/scene3.splinecode" />
            </div> */}
          </div>
        </div>
      </article>
    </div>
  );
}
