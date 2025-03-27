import { PRESS_RELEASE_POSTTYPE } from '@/constants/global';
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
    title: `Polkadot Press Releases | ${formattedTag} | Page ${page}`,
    description: `Explore Polkadot press releases about ${formattedTag}. Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    openGraph: {
      title: `Polkadot Press Releases | ${formattedTag} | Page ${page}`,
      description: `Explore Polkadot press releases about ${formattedTag}. Stay updated with the latest Polkadot news and announcements. Page ${page}.`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const tags = await runQuery(tagsQuery, {}, false);

    if (!tags) {
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
      'Error fetching tags for press-releases static generation:',
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
      type={PRESS_RELEASE_POSTTYPE}
      withHeader={false}
    />
  );
}
