import type { Metadata } from 'next';

import { PRESS_RELEASE_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<Metadata> {
  const { slug, page } = params;

  // Capitalize the first letter of each word in the slug
  const formattedTag = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Polkadot Press Releases | ${formattedTag} | Page ${page}`,
    description: `Explore Polkadot press releases about ${formattedTag}. Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    openGraph: {
      title: `Polkadot Press Releases | ${formattedTag} | Page ${page}`,
      description: `Explore Polkadot press releases about ${formattedTag}. Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    },
  };
}

export default async function Page({
  params: { page, slug },
}: {
  params: { page: string; slug: string };
}) {
  return (
    <Layout
      page={Number(page)}
      tagSlug={slug}
      type={PRESS_RELEASE_POSTTYPE}
      withHeader={false}
    />
  );
}
