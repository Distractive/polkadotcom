import type { Metadata } from 'next';

import { PRESS_RELEASE_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';

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
    title: `Polkadot Press Releases | ${formattedTag}`,
    description: `Explore Polkadot press releases about ${formattedTag}. Stay informed on Polkadot's blockchain interoperability, DOT token updates, and ecosystem growth.`,
    openGraph: {
      title: `Polkadot Press Releases | ${formattedTag}`,
      description: `Explore Polkadot press releases about ${formattedTag}. Stay informed on Polkadot's blockchain interoperability, DOT token updates, and ecosystem growth.`,
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
      type={PRESS_RELEASE_POSTTYPE}
      tagSlug={slug}
      withHeader={false}
    />
  );
}
