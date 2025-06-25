import { PRESS_RELEASE_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';
import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';
import type { Metadata } from 'next';

const tagSlugQuery = q('*')
  .filterByType('tag')
  .grab({
    slug: q.slug('slug'),
  })
  .nullable();

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

export async function generateStaticParams() {
  try {
    const tags = await runQuery(tagSlugQuery, {}, false);

    if (!tags || tags?.length === 0) {
      return [];
    }

    return tags.map((tag) => ({
      slug: tag.slug,
    }));
  } catch (error) {
    console.error(
      'Error fetching tag slugs for newsroom static generation:',
      error,
    );
    return [];
  }
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
