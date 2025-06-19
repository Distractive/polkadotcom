interface StoreButtonProps {
  store?: string | null;
  href?: string | null;
  className?: string;
}

export function StoreButton({ store, href, className }: StoreButtonProps) {
  console.log('in the store button: ', store);
  console.log('store value:', JSON.stringify(store));
  console.log('store value:', JSON.stringify(store), 'length:', store?.length);
  if (!store || !href) return null;
  if (store !== 'appstore' && store !== 'playstore') return null;

  const config = {
    appstore: {
      img: '/app-store-button.svg',
      alt: 'Download on the App Store',
      aria: 'Download on the App Store',
    },
    playstore: {
      img: '/play-store-button.svg',
      alt: 'Get it on Google Play',
      aria: 'Get it on Google Play',
    },
  } as const;

  const { img, alt, aria } = config[store];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={className}
    >
      <img
        src={img}
        alt={alt}
        style={{ height: '64px', width: 'auto', display: 'inline-block' }}
      />
    </a>
  );
}
