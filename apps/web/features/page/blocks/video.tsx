'use client';

import { urlForImage } from '@/sanity/lib/image';
import type { videoSelection } from '@/sanity/selections/blocks/video';
import type { TypeFromSelection } from 'groqd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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

  const isYouTube = video.isYouTubeVideo ?? true;
  const videoUrl = isYouTube
    ? video.url || ''
    : typeof video.videoFile === 'string'
      ? video.videoFile
      : '';
  const aspectClass = isYouTube ? 'aspect-video' : 'aspect-square';
  const placeholderImageUrl = video.placeholderImage?.asset
    ? urlForImage(video.placeholderImage.asset)
    : null;

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
        'max-width overflow-hidden rounded-2xl',
        aspectClass,
        '[&>div>div]:!rounded-2xl [&>div>iframe]:!rounded-2xl [&_div]:!rounded-2xl',
        className,
      )}
      data-testid="video-block"
    >
      <div className="relative size-full">
        {isClient && !isYouTube && showPlaceholder && placeholderImageUrl && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={handlePlayClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Play video"
          >
            <img
              src={placeholderImageUrl}
              alt="Video placeholder"
              className="size-full rounded-2xl object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  'flex size-16 items-center justify-center rounded-2xl',
                  'border border-grey-300 bg-white ',
                  'group transition-colors duration-200 ease-in-out hover:border-pink',
                )}
              >
                <Icon variant="videoPlay" className="group-hover:fill-pink" />
              </div>
            </div>
          </div>
        )}
        {isClient && (
          <ReactPlayer
            url={videoUrl || ''}
            width="100%"
            height="100%"
            controls={!isYouTube}
            playing={isYouTube || !showPlaceholder}
            light={
              isYouTube && placeholderImageUrl ? placeholderImageUrl : false
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
        )}
      </div>
    </div>
  );
}
