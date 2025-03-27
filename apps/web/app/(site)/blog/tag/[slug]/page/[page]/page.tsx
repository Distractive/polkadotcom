import { BLOG_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';
import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';
import type { Metadata } from 'next';

export const dynamicParams = true;

const DOCS_PER_PAGE = 12;

const tagsQuery = q('*')
  .filterByType('tag')
  .grab({
    slug: q.slug('slug'),
    _id: q.string(),
  })
  .nullable();

const postsByTagQuery = q('*')
  .filterByType('post')
  .filter('$tagId in tags[]._ref')
  .grab({ _id: q.string() });

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<Metadata> {
  const { slug, page } = params;

  const formattedTag = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Polkadot Blog | ${formattedTag} | Page ${page}`,
    description: `Explore Polkadot blog posts tagged with ${formattedTag}. Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    openGraph: {
      title: `Polkadot Blog | ${formattedTag} | Page ${page}`,
      description: `Explore Polkadot blog posts tagged with ${formattedTag}. Learn about the Polkadot ecosystem through in-depth articles, overviews, and insights. Page ${page}.`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const tags = await runQuery(tagsQuery, {}, false);

    if (!tags || tags?.length === 0) {
      return [];
    }

    const staticParams = [];

    for (const tag of tags) {
      const posts = await runQuery(postsByTagQuery, { tagId: tag._id }, false);
      const totalPosts = posts.length;
      const totalPages = Math.ceil(totalPosts / DOCS_PER_PAGE);

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        staticParams.push({
          slug: tag.slug,
          page: pageNumber.toString(),
        });
      }
    }

    return staticParams;
  } catch (error) {
    console.error(
      'Error fetching tag slugs for blog static generation:',
      error,
    );
    return [];
  }
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
      type={BLOG_POSTTYPE}
      withHeader={false}
    />
  );
}
