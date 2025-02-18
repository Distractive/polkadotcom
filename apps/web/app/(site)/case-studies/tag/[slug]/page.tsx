import type { Metadata } from 'next';

import { CASE_STUDY_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // Capitalize the first letter of each word in the slug
  const formattedTag = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Polkadot Case Studies | ${formattedTag}`,
    description: `Explore Polkadot case studies for ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security`,
    openGraph: {
      title: `Polkadot Case Studies | ${formattedTag}`,
      description: `Explore Polkadot case studies for ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security.`,
    },
  };
}

export default async function Tag({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <Layout
      page={1}
      type={CASE_STUDY_POSTTYPE}
      tagSlug={slug}
      withHeader={false}
    />
  );
}
