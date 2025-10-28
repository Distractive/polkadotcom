'use client';

import { urlForImage } from '@/sanity/lib/image';
import type { videoSelection } from '@/sanity/selections/blocks/video';
import type { TypeFromSelection } from 'groqd';
import dynamic from 'next/dynamic';
import { useEffect, useId, useRef, useState } from 'react';

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
  const playerRef = useRef<{ getInternalPlayer?: () => unknown } | null>(null);
  const videoId = useId();

  const isSelfHosted = video.useSelfHostedVideo ?? false;
  const videoUrl = ((isSelfHosted ? video.videoFile : video.url) ||
    '') as string;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cleanup: stop player when component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          const internal = playerRef.current.getInternalPlayer?.() as
            | { pause?: () => void; pauseVideo?: () => void }
            | undefined;
          internal?.pause?.();
          internal?.pauseVideo?.();
        } catch {}
      }
    };
  }, []);

  const aspectStyle = {
    aspectRatio: useSquareAspectRatio ? '1 / 1' : '16 / 9',
  } as const;
  const placeholderImageUrl = video.placeholderImage?.asset
    ? urlForImage(video.placeholderImage.asset)
    : null;
  const usePlaceholderVideo = video.usePlaceholderVideo ?? false;
  const placeholderVideoUrl = (video.placeholderVideo ?? null) as string | null;
  const isFullScreen = video.isFullScreen ?? false;

  const [phase, setPhase] = useState<'placeholder' | 'playing'>('placeholder');

  // Only show placeholder if there's content to show (video to play OR placeholder content)
  const hasContent = videoUrl || placeholderImageUrl || placeholderVideoUrl;

  return (
    <div className={cn(className)} data-testid="video-block">
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl bg-grey-100',
          '[&>div>div]:!rounded-2xl [&>div>iframe]:!rounded-2xl [&_div]:!rounded-2xl',
        )}
        style={aspectStyle}
      >
        {/* Placeholder overlay */}
        {hasContent && phase === 'placeholder' && (
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

        {/* Inline player: only when not fullscreen and in playing phase */}
        {isClient && !isFullScreen && phase === 'playing' && (
          <div className={cn('absolute inset-0')}>
            <ReactPlayer
              ref={playerRef}
              key={`${videoId}`}
              url={videoUrl || ''}
              width="100%"
              height="100%"
              controls={isSelfHosted}
              playing={phase === 'playing'}
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
