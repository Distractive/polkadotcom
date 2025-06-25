import { BLOG_POSTTYPE } from '@/constants/global';
import { Newsletter } from '@/features/page/blocks/newsletter';
import Layout from '@/features/posts/layout';
import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';
import type { Metadata } from 'next';

export const dynamicParams = true;

const blogQuery = q('*[post_type in ["Blog"]]').filter().grab({
  _id: q.string(),
});

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const { page } = params;

  return {
    title: `Polkadot Blog | Page ${page}`,
    description: `Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    openGraph: {
      title: `Polkadot Blog | Page ${page}`,
      description: `Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
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
    console.error('Error fetching pages for blog static generation:', error);
  }

  return [{ page: '1' }];
}

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  return (
    <>
      <Layout page={Number(page)} tagSlug="" type={BLOG_POSTTYPE} />
      <Newsletter />
    </>
  );
}
