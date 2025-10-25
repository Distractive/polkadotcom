'use client';

import { urlForImage } from '@/sanity/lib/image';
import type { videoSelection } from '@/sanity/selections/blocks/video';
import type { TypeFromSelection } from 'groqd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { FullscreenVideoButton } from '@/components/fullscreen-video-button';
import { Icon, cn } from '@shared/ui';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => <>{children}</>;

interface Props {
  video: TypeFromSelection<typeof videoSelection>;
  className?: string;
}

// Use dynamic import to fix hydration error
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function VideoBlock({ video, className }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isSelfHosted = video.useSelfHostedVideo ?? false;
  const videoUrl = isSelfHosted
    ? typeof video.videoFile === 'string'
      ? video.videoFile
      : ''
    : video.url || '';
  // Apply aspect-video to prevent layout shift while placeholder loads
  const aspectClass = 'aspect-square';
  const placeholderImageUrl = video.placeholderImage?.asset
    ? urlForImage(video.placeholderImage.asset)
    : null;
  const usePlaceholderVideo = video.usePlaceholderVideo ?? false;
  const placeholderVideoUrl =
    typeof video.placeholderVideo === 'string' ? video.placeholderVideo : null;
  const isFullScreen = video.isFullScreen ?? false;

  const handlePlayClick = () => {
    setShowPlaceholder(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlayClick();
    }
  };

  return (
    <div
      className={cn(
        'max-width overflow-hidden rounded-2xl bg-grey-100',
        aspectClass,
        '[&>div>div]:!rounded-2xl [&>div>iframe]:!rounded-2xl [&_div]:!rounded-2xl',
        className,
      )}
      data-testid="video-block"
    >
      <div className="relative size-full">
        {/* Self-hosted: Placeholder video with autoplay and play button */}
        {isClient &&
          isSelfHosted &&
          usePlaceholderVideo &&
          placeholderVideoUrl &&
          showPlaceholder && (
            <div
              className={cn(
                'absolute inset-0 z-10',
                !isFullScreen && 'cursor-pointer',
              )}
              onClick={!isFullScreen ? handlePlayClick : undefined}
              onKeyDown={!isFullScreen ? handleKeyDown : undefined}
              role={!isFullScreen ? 'button' : undefined}
              tabIndex={!isFullScreen ? 0 : undefined}
              aria-label={!isFullScreen ? 'Play video' : undefined}
            >
              <video
                src={placeholderVideoUrl}
                className="size-full rounded-2xl object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {!isFullScreen && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      'flex size-16 items-center justify-center rounded-2xl',
                      'border border-grey-300 bg-white ',
                      'group transition-colors duration-200 ease-in-out hover:border-pink',
                    )}
                  >
                    <Icon
                      variant="videoPlay"
                      className="group-hover:fill-pink"
                    />
                  </div>
                </div>
              )}
              {/* Fullscreen button */}
              {isFullScreen && videoUrl && (
                <div
                  className="absolute bottom-4 right-4 z-20"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <FullscreenVideoButton
                    videoUrl={videoUrl}
                    buttonClassName="!static !transform-none"
                  />
                </div>
              )}
            </div>
          )}

        {/* Self-hosted: Clickable placeholder video with play button */}
        {isClient &&
          isSelfHosted &&
          !usePlaceholderVideo &&
          showPlaceholder &&
          placeholderVideoUrl && (
            <div
              className={cn(
                'absolute inset-0 z-10',
                !isFullScreen && 'cursor-pointer',
              )}
              onClick={!isFullScreen ? handlePlayClick : undefined}
              onKeyDown={!isFullScreen ? handleKeyDown : undefined}
              role={!isFullScreen ? 'button' : undefined}
              tabIndex={!isFullScreen ? 0 : undefined}
              aria-label={!isFullScreen ? 'Play video' : undefined}
            >
              <video
                src={placeholderVideoUrl}
                className="size-full rounded-2xl object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {!isFullScreen && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      'flex size-16 items-center justify-center rounded-2xl',
                      'border border-grey-300 bg-white ',
                      'group transition-colors duration-200 ease-in-out hover:border-pink',
                    )}
                  >
                    <Icon
                      variant="videoPlay"
                      className="group-hover:fill-pink"
                    />
                  </div>
                </div>
              )}
              {/* Fullscreen button */}
              {isFullScreen && videoUrl && (
                <div
                  className="absolute bottom-4 right-4 z-20"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <FullscreenVideoButton
                    videoUrl={videoUrl}
                    buttonClassName="!static !transform-none"
                  />
                </div>
              )}
            </div>
          )}

        {/* Self-hosted: Clickable placeholder image with play button */}
        {isClient &&
          isSelfHosted &&
          !usePlaceholderVideo &&
          showPlaceholder &&
          !placeholderVideoUrl &&
          placeholderImageUrl && (
            <div
              className={cn(
                'absolute inset-0 z-10',
                !isFullScreen && 'cursor-pointer',
              )}
              onClick={!isFullScreen ? handlePlayClick : undefined}
              onKeyDown={!isFullScreen ? handleKeyDown : undefined}
              role={!isFullScreen ? 'button' : undefined}
              tabIndex={!isFullScreen ? 0 : undefined}
              aria-label={!isFullScreen ? 'Play video' : undefined}
            >
              <img
                src={placeholderImageUrl}
                alt="Video placeholder"
                className="size-full rounded-2xl object-cover"
              />
              {!isFullScreen && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      'flex size-16 items-center justify-center rounded-2xl',
                      'border border-grey-300 bg-white ',
                      'group transition-colors duration-200 ease-in-out hover:border-pink',
                    )}
                  >
                    <Icon
                      variant="videoPlay"
                      className="group-hover:fill-pink"
                    />
                  </div>
                </div>
              )}
              {/* Fullscreen button */}
              {isFullScreen && videoUrl && (
                <div
                  className="absolute bottom-4 right-4 z-20"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <FullscreenVideoButton
                    videoUrl={videoUrl}
                    buttonClassName="!static !transform-none"
                  />
                </div>
              )}
            </div>
          )}

        {/* Main video player */}
        {isClient && (
          <div
            className={cn(
              usePlaceholderVideo && placeholderVideoUrl && showPlaceholder
                ? 'invisible'
                : 'visible',
            )}
          >
            <ReactPlayer
              url={videoUrl || ''}
              width="100%"
              height="100%"
              controls={isSelfHosted}
              playing={!isSelfHosted || !showPlaceholder}
              light={
                !isSelfHosted && placeholderImageUrl
                  ? placeholderImageUrl
                  : false
              }
              loop
              playIcon={
                <div
                  className={cn(
                    'flex size-16 items-center justify-center rounded-2xl',
                    'border border-grey-300 bg-white ',
                    'group transition-colors duration-200 ease-in-out',
                  )}
                >
                  <Icon variant="videoPlay" className="group-hover:fill-pink" />
                </div>
              }
              wrapper={Wrapper}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    controls: 1,
                    disablekb: 1,
                    rel: 0,
                    autoplay: 1,
                    playsinline: 1,
                    modestbranding: 1,
                    loop: 1,
                  },
                },
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
