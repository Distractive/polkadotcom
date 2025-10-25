'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@shared/ui';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface FullscreenVideoButtonProps {
  videoUrl: string;
  buttonText?: string;
  buttonClassName?: string;
  renderButton?: (props: { onClick: () => void }) => React.ReactNode;
  overlayClassName?: string;
  playerClassName?: string;
  controls?: boolean;
  volume?: number;
  playerConfig?: {
    youtube?: Record<string, unknown>;
    vimeo?: Record<string, unknown>;
    file?: Record<string, unknown>;
  };
}

export function FullscreenVideoButton({
  videoUrl,
  buttonText = 'WATCH VIDEO',
  buttonClassName,
  renderButton,
  overlayClassName,
  playerClassName,
  controls = true,
  volume = 1,
  playerConfig,
}: FullscreenVideoButtonProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const playerRef = useRef<{ getInternalPlayer?: () => unknown } | null>(null);

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = useCallback(() => {
    setIsOverlayOpen(false);
  }, []);

  const handleAutoPlay = () => {
    try {
      const internal = playerRef.current?.getInternalPlayer?.() as
        | { play?: () => void | Promise<void>; playVideo?: () => void }
        | undefined;
      internal?.play?.();
      internal?.playVideo?.();
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

  useEffect(() => {
    if (!isOverlayOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOverlay();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOverlayOpen, closeOverlay]);

  const defaultPlayerConfig = {
    youtube: {
      playerVars: {
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
      },
    },
    vimeo: {
      playerOptions: {
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
    ...playerConfig,
  };

  return (
    <>
      {renderButton ? (
        renderButton({ onClick: openOverlay })
      ) : (
        <button
          onClick={openOverlay}
          className={cn(
            'absolute bottom-8 flex items-center gap-2 px-4 py-1 border-white/20 text-white transition-all duration-200 z-10 rounded-md',
            'left-1/2 transform -translate-x-1/2',
            'md:left-auto md:right-0 md:transform-none md:bg-black/50 md:border',
            'hover:ring-2 hover:ring-white/50 hover:cursor-pointer',
            buttonClassName,
          )}
          aria-label="Watch with sound"
          type="button"
        >
          <span className="text-sm font-medium font-display whitespace-nowrap">
            {buttonText}
          </span>
          {/* Play icon */}
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

      {/* Fullscreen video overlay */}
      {isOverlayOpen && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4',
            overlayClassName,
          )}
          role="dialog"
          aria-modal="true"
          onClick={closeOverlay}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              closeOverlay();
            }
          }}
        >
          {/* Video player container */}
          <div
            className={cn(
              'z-[55] w-full max-w-6xl aspect-video',
              playerClassName,
            )}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls={controls}
              width="100%"
              height="100%"
              muted={false}
              volume={volume}
              playsinline
              onReady={handleAutoPlay}
              style={{
                backgroundColor: 'black',
              }}
              config={defaultPlayerConfig}
            />
          </div>
        </div>
      )}
    </>
  );
}
