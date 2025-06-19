import { Button } from '@shared/ui';

interface StoreButtonProps {
  store?: 'appstore' | 'playstore' | null;
  href?: string | null;
  className?: string;
}

export function StoreButton({ store, href, className }: StoreButtonProps) {
  if (!store || !href) return null;

  const config = {
    appstore: {
      img: '/button-app-store.svg',
      alt: 'Download on the App Store',
      aria: 'Download on the App Store',
    },
    playstore: {
      img: '/button-play-store.svg',
      alt: 'Get it on Google Play',
      aria: 'Get it on Google Play',
    },
  } as const;

  const { img, alt, aria } = config[store];

  return (
    <Button
      asChild
      variant="primary"
      size="lg"
      className={`p-0 bg-transparent shadow-none border-none ${className ?? ''}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
      >
        <img
          src={img}
          alt={alt}
          style={{ height: 48, width: 'auto', display: 'block' }}
        />
      </a>
    </Button>
  );
}
