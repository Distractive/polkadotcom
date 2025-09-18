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
            {!isOverlayOpen && (
              <button
                onClick={openOverlay}
                className={cn(
                  'absolute bottom-8 flex items-center gap-2 px-4 py-1 border-white/20 text-white transition-all duration-200 z-10 rounded-md',
                  'left-1/2 transform -translate-x-1/2',
                  'md:left-auto md:right-0 md:transform-none md:bg-black/50 md:border ',
                  'hover:ring-2 hover:ring-white/50 hover:cursor-pointer',
                )}
                aria-label="Watch with sound"
                type="button"
              >
                <span className="text-sm font-medium font-display whitespace-nowrap">
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
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
        </article>
        {isOverlayOpen && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeOverlay}
            onKeyDown={closeOverlay}
          >
            <div
              className="z-[55] w-full max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <ReactPlayer
                ref={playerRef}
                url="/videos/defy-whats-possible-video.mp4"
                playing={isOverlayOpen}
                controls
                width="100%"
                height="100%"
                muted={false}
                volume={1}
                playsinline
                style={{
                  backgroundColor: 'black',
                }}
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
                      style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="h-8 rounded-t-xl -mt-3 relative z-30 bg-white w-full" />
    </>
  );
}
