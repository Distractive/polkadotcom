'use client';

import type { heroSelection } from '@/sanity/selections/home/hero';
import type { TypeFromSelection } from 'groqd';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { CustomUrl } from '@/components/custom-url';
import type { videoSelection } from '@/sanity/selections/home/video';
import { Button, Heading, cn } from '@shared/ui';
import { BackgroundVideo } from './background-video';

interface Props {
  hero: TypeFromSelection<typeof heroSelection>['hero'];
  backgroundVideo: TypeFromSelection<typeof videoSelection>['video'];
}

export function Hero({ hero, backgroundVideo }: Props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  // ReactPlayer ref
  const playerRef = useRef<{ getInternalPlayer?: () => unknown } | null>(null);

  const openOverlay = () => {
    setIsOverlayOpen(true);
    try {
      const internal = playerRef.current?.getInternalPlayer?.() as
        | { play?: () => void | Promise<void>; playVideo?: () => void }
        | undefined;
      internal?.play?.();
      internal?.playVideo?.();
    } catch {}
  };
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    try {
      const internal = playerRef.current?.getInternalPlayer?.() as
        | {
            pause?: () => void;
            pauseVideo?: () => void;
            unload?: () => void;
          }
        | undefined;
      internal?.pause?.();
      internal?.pauseVideo?.();
      internal?.unload?.();
    } catch {}
  };

  // Lock scroll while overlay is open
  useEffect(() => {
    if (isOverlayOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOverlayOpen]);

  // Dynamically import ReactPlayer to avoid SSR issues
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

  return (
    <div
      id="hero-pile"
      data-testid="hero-pile"
      className="relative mb-8 flex flex-col overflow-visible pt-20 xl:mb-32 h-[40rem]"
    >
      {/* <BackgroundVideo
        video={backgroundVideo?.video}
        showOverlay={true}
        overlayOpacity={20}
        className=""
        muted={true}
        localVideoPath={'/videos/defy-whats-possible-video.mp4'}
      /> */}
      <article
        id="hero.wrapper"
        className={cn(
          'grid-system max-width relative   !overflow-visible lg:px-gutter h-full',
        )}
      >
        <div className="relative max-width col-span-12 flex flex-row !overflow-visible   bg-pink ">
          {/* HEADING */}
          <div
            id="hero.content"
            className={cn(
              'relative  order-2  flex flex-col justify-center px-gutter lg:order-1 lg:col-span-2 lg:px-0',
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
                    variant={
                      link?.variant
                        ? link.variant === 'primary'
                          ? 'primary'
                          : 'secondary'
                        : 'primary'
                    }
                    size="lg"
                    className="md:flex-1 whitespace-nowrap"
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
          <button
            onClick={openOverlay}
            className="absolute bottom-4 right-0 flex items-center gap-2  bg-black/50 px-4 py-1 border border-white/20 text-white transition-all duration-200 hover:bg-black/70 hover:outline-none hover:ring-2 hover:ring-white/50 z-[999] hover:cursor-pointer"
            aria-label="Watch with sound"
            type="button"
          >
            <span className="text-sm font-medium whitespace-nowrap">
              WATCH VIDEO
            </span>
            {/* Speaker icon */}
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
          </button>
        </div>
      </article>
      {isOverlayOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeOverlay}
            aria-label="Close video"
            className="absolute right-4 bottom-4 z-[60] rounded-full border border-white/20 bg-black/50 p-2 text-white hover:bg-black/70 hover:ring-2 hover:ring-white/50"
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <div className="z-[55] w-full max-w-6xl">
            <ReactPlayer
              ref={playerRef}
              url="/videos/defy-whats-possible-video.mp4"
              playing={isOverlayOpen}
              controls
              width="100%"
              height="80vh"
              muted={false}
              volume={1}
              playsinline
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    playsinline: 1,
                    rel: 0,
                    showinfo: 0,
                    modestbranding: 1,
                  },
                },
                vimeo: {
                  playerOptions: {
                    autoplay: true,
                    byline: false,
                    portrait: false,
                    title: false,
                  },
                },
                file: {
                  attributes: {
                    playsInline: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
