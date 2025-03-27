import type { Metadata } from 'next';

import { PRESS_RELEASE_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';
import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';

export const dynamicParams = true;

const blogQuery = q('*[post_type in ["Press Release"]]').filter().grab({
  _id: q.string(),
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<Metadata> {
  const { page } = params;

  return {
    title: `Polkadot Press Releases |  Page ${page}`,
    description: `Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    openGraph: {
      title: `Polkadot Press Releases | Page ${page}`,
      description: `Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const blogPosts = await runQuery(blogQuery, {}, false);

    if (!blogPosts) {
      return [{ page: '1' }];
    }

    const staticParams = blogPosts.map((_article, i) => ({
      page: String(Math.floor(i / 12) + 1),
    }));

    return staticParams;
  } catch (error) {
    console.error(
      'Error fetching pages for press-releases static generation:',
      error,
    );
    return [{ page: '1' }];
  }
}

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  return (
    <Layout page={Number(page)} tagSlug="" type={PRESS_RELEASE_POSTTYPE} />
  );
}
