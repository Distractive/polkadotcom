import { CASE_STUDY_POSTTYPE } from '@/constants/global';
import Layout from '@/features/posts/layout';
import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';
import type { Metadata } from 'next';

export const dynamicParams = true;

const query = q('*')
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
    title: `Polkadot Case Studies | ${formattedTag}`,
    description: `Explore Polkadot case studies for ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security`,
    openGraph: {
      title: `Polkadot Case Studies | ${formattedTag}`,
      description: `Explore Polkadot case studies for ${formattedTag}. Polkadot empowers blockchain networks to work together under the protection of shared security.`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const tags = await runQuery(query, {}, false);

    return tags
      ? tags.map((tag) => ({
          slug: tag.slug,
        }))
      : [];
  } catch (error) {
    console.error(
      'Error fetching tag slugs for case-studies static generation:',
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
      type={CASE_STUDY_POSTTYPE}
      tagSlug={slug}
      withHeader={false}
    />
  );
}
