'use client';

import { urlForImage } from '@/sanity/lib/image';
import type { videoSelection } from '@/sanity/selections/blocks/video';
import type { TypeFromSelection } from 'groqd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { FullscreenVideoButton } from '@/components/fullscreen-video-button';
import { PlaceholderOverlay } from '@/components/placeholder-overlay';
import { cn } from '@shared/ui';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => <>{children}</>;

interface Props {
  video: TypeFromSelection<typeof videoSelection>;
  className?: string;
  useSquareAspectRatio?: boolean;
}

// Use dynamic import to fix hydration error
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function VideoBlock({ video, className, useSquareAspectRatio }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isSelfHosted = video.useSelfHostedVideo ?? false;
  const videoUrl = isSelfHosted
    ? typeof video.videoFile === 'string'
      ? video.videoFile
      : ''
    : video.url || '';

  const aspectStyle = {
    aspectRatio: useSquareAspectRatio ? '1 / 1' : '16 / 9',
  } as const;

  const placeholderImageUrl = video.placeholderImage?.asset
    ? urlForImage(video.placeholderImage.asset)
    : null;
  const usePlaceholderVideo = video.usePlaceholderVideo ?? false;
  const placeholderVideoUrl =
    typeof video.placeholderVideo === 'string' ? video.placeholderVideo : null;
  const isFullScreen = video.isFullScreen ?? false;

  const hasPlaceholder = Boolean(
    (usePlaceholderVideo && placeholderVideoUrl) || placeholderImageUrl,
  );
  const [phase, setPhase] = useState<'placeholder' | 'playing'>(
    hasPlaceholder ? 'placeholder' : 'playing',
  );

  return (
    <div className={cn(className)} data-testid="video-block">
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl bg-grey-100',
          '[&>div>div]:!rounded-2xl [&>div>iframe]:!rounded-2xl [&_div]:!rounded-2xl',
        )}
        style={aspectStyle}
      >
        {/* Unified placeholder overlay */}
        {hasPlaceholder && phase === 'placeholder' && (
          <PlaceholderOverlay
            imageUrl={placeholderImageUrl}
            videoUrl={usePlaceholderVideo ? placeholderVideoUrl : null}
            interactive={!isFullScreen}
            onPlay={!isFullScreen ? () => setPhase('playing') : undefined}
          >
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
          </PlaceholderOverlay>
        )}

        {/* Fullscreen only, no placeholder: just show the fullscreen button */}
        {isFullScreen && !hasPlaceholder && videoUrl && (
          <div className="absolute inset-0">
            <div className="absolute bottom-4 right-4 z-20">
              <FullscreenVideoButton
                videoUrl={videoUrl}
                buttonClassName="!static !transform-none"
              />
            </div>
          </div>
        )}

        {/* Inline player: only when not fullscreen and in playing phase */}
        {isClient && !isFullScreen && phase === 'playing' && (
          <div className={cn('absolute inset-0')}>
            <ReactPlayer
              url={videoUrl || ''}
              width="100%"
              height="100%"
              controls={isSelfHosted}
              playing={
                isSelfHosted
                  ? phase === 'playing'
                  : placeholderImageUrl
                    ? phase === 'playing'
                    : false
              }
              loop
              wrapper={Wrapper}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    controls: 1,
                    disablekb: 1,
                    rel: 0,
                    autoplay: 0,
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
