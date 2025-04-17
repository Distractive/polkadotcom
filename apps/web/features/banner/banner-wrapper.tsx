import { getBanner } from '@/sanity/queries/banner';
import { draftMode } from 'next/headers';

import Banner from './banner';

export async function BannerWrapper() {

  const isDraftMode = draftMode().isEnabled;
  const banner = await getBanner(isDraftMode);

  if (banner?.isBannerOn) {
    return (
      <Banner
        banner={banner}
      />
    );
  }
}
