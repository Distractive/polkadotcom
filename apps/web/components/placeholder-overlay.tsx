'use client';

import { Icon, cn } from '@shared/ui';

interface PlaceholderOverlayProps {
  imageUrl?: string | null;
  videoUrl?: string | null;
  interactive: boolean;
  onPlay?: () => void;
  children?: React.ReactNode;
}

export function PlaceholderOverlay({
  imageUrl,
  videoUrl,
  interactive,
  onPlay,
  children,
}: PlaceholderOverlayProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlay?.();
    }
  };

  const commonProps = interactive
    ? {
        onClick: onPlay,
        onKeyDown: handleKeyDown,
        role: 'button' as const,
        tabIndex: 0,
        'aria-label': 'Play video',
      }
    : {};

  return (
    <div
      className={cn('absolute inset-0 z-10', interactive && 'cursor-pointer')}
      {...commonProps}
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          className="size-full rounded-2xl object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Video placeholder"
          className="size-full rounded-2xl object-contain"
        />
      ) : null}

      {interactive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-2xl',
              'border border-grey-300 bg-white',
              'group transition-colors duration-200 ease-in-out hover:border-pink',
            )}
          >
            <Icon
              variant="videoPlay"
              className="fill-grey-800 group-hover:fill-pink"
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
