'use client';

import type { videoSelection } from '@/sanity/selections/blocks/video';
import type { TypeFromSelection } from 'groqd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { cn } from '@shared/ui';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => <>{children}</>;

interface Props {
  video: TypeFromSelection<typeof videoSelection>;
  className?: string;
  showOverlay?: boolean;
  overlayOpacity?: number; // 0-100
  muted?: boolean;
}

// Use dynamic import to fix hydration error
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function BackgroundVideo({
  video,
  className,
  showOverlay = true,
  overlayOpacity = 20,
  muted,
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full overflow-hidden',
        className,
      )}
      data-testid="background-video"
    >
      <div className="absolute inset-0 w-full h-full">
        {isClient && (
          <ReactPlayer
            url={video.url || ''}
            width="100%"
            height="100%"
            controls={false}
            playing={true}
            muted={muted}
            loop={true}
            playsinline={true}
            wrapper={Wrapper}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  disablekb: 1,
                  rel: 0,
                  autoplay: 1,
                  playsinline: 1,
                  modestbranding: 1,
                  loop: 1,
                  mute: 1,
                  start: 0,
                },
              },
              vimeo: {
                playerOptions: {
                  muted: true,
                  autoplay: true,
                  loop: true,
                  controls: false,
                  background: true,
                },
              },
              file: {
                attributes: {
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                },
              },
            }}
          />
        )}
      </div>

      {/* Optional Overlay */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
        />
      )}
    </div>
  );
}
