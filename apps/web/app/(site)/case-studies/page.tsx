import { getSingletonMeta } from '@/sanity/queries/page';
import type { Metadata } from 'next';

import { CASE_STUDY_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';

export const dynamicParams = true;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta('case-studies');
  if (!meta) {
    return {
      title: 'Polkadot 404',
      description: 'Page not found',
    };
  }

  return {
    title: 'Polkadot Case Studies',
    description:
      'Explore the Polkadot ecosystem through in-depth case studies. Polkadot empowers blockchain networks to work together under the protection of shared security.',
    openGraph: {
      images: [meta.meta?.meta_image?.asset.url || ''],
      title: 'Polkadot Case Studies',
      description:
        'Explore the Polkadot ecosystem through in-depth case studies. Polkadot empowers blockchain networks to work together under the protection of shared security.',
    },
  };
}

export default async function CaseStudy() {
  return <Layout page={1} type={CASE_STUDY_POSTTYPE} tagSlug="" />;
}
