import { getBanner } from '@/sanity/queries/banner';
import { draftMode } from 'next/headers';

import Banner from './banner';

interface BannerProps {
  type: 'desktop' | 'mobile';
}

export async function BannerWrapper({ type }: BannerProps) {
  const isDraftMode = draftMode().isEnabled;
  const banner = await getBanner(isDraftMode);
  const initialVisibility = false;

  if (banner?.isBannerOn) {
    return (
      <Banner
        type={type}
        banner={banner}
        initialVisibility={initialVisibility}
      />
    );
  }
}
