import { BLOG_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';
import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';
import type { Metadata } from 'next';

export const dynamicParams = true;

const tagsQuery = q('*')
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

  const formattedTag = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Polkadot Blog | ${formattedTag}`,
    description: `Explore Polkadot blog posts tagged with ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security`,
    openGraph: {
      title: `Polkadot Blog | ${formattedTag}`,
      description: `Explore Polkadot blog posts tagged with ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security.`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const tags = await runQuery(tagsQuery, {}, false);

    return tags
      ? tags.map((tag) => ({
          slug: tag.slug,
        }))
      : [];
  } catch (error) {
    console.error(
      'Error fetching tag slugs for blog static generation:',
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
    <Layout page={1} type={BLOG_POSTTYPE} tagSlug={slug} withHeader={false} />
  );
}
