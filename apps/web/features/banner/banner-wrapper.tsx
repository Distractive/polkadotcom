import { getBanner } from '@/sanity/queries/banner';
import { cookies, draftMode } from 'next/headers';

import Banner from './banner';

interface BannerProps {
  type: 'desktop' | 'mobile';
}

export async function BannerWrapper({ type }: BannerProps) {
  const isDraftMode = draftMode().isEnabled;
  const banner = await getBanner(isDraftMode);
  const cookieStore = cookies();
  const bannerClosedCookie = cookieStore.get('polkadot_banner_closed');
  const initialVisibility = !bannerClosedCookie;

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
