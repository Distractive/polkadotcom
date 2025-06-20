import { stegaClean } from '@sanity/client/stega';

interface StoreButtonProps {
  store?: string | null;
  href?: string | null;
  className?: string;
}

export function StoreButton({ store, href, className }: StoreButtonProps) {
  if (!store || !href) return null;
  const cleanedStore = stegaClean(store).replace(/\s+/g, '').toLowerCase();
  if (cleanedStore !== 'appstore' && cleanedStore !== 'playstore') return null;

  const config = {
    appstore: {
      img: '/button-app-store.png',
      alt: 'Download on the App Store',
      aria: 'Download on the App Store',
    },
    playstore: {
      img: '/button-play-store.png',
      alt: 'Get it on Google Play',
      aria: 'Get it on Google Play',
    },
  };

  const { img, alt, aria } = config[cleanedStore];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={className}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={img}
        alt={alt}
        style={{ height: '64px', width: 'auto', display: 'inline-block' }}
      />
    </a>
  );
}
