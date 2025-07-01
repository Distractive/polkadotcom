import {
  getAllGlossarySlugs,
  getGlossaryEntry,
  getGlossaryEntryMeta,
} from '@/sanity/queries/glossary';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { BreadcrumbBlock } from '@/features/page/blocks/breadcrumb';
import type { BreadcrumbItemType } from '@/features/page/blocks/breadcrumb';
import { CardsSmallBlock } from '@/features/page/blocks/cards-small/cards-small';
import { CardsBlock } from '@/features/page/blocks/cards/cards';
import { Body } from '@/features/post/body';
import { Heading } from '@shared/ui';

export async function generateStaticParams() {
  const slugs = await getAllGlossarySlugs();

  if (!slugs?.length) return [{ slug: 'not-found' }];

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const isDraftMode = draftMode().isEnabled;
  const meta = await getGlossaryEntryMeta(params.slug, isDraftMode);

  if (!meta)
    return {
      title: 'Glossary Not Found | Polkadot',
      description: "The glossary page you're looking for could not be found.",
    };

  return {
    title: meta.meta?.meta_title || '',
    description: meta.meta?.meta_description || '',
    openGraph: {
      images: [meta.meta?.meta_image?.asset.path || ''],
      title: meta.meta?.meta_title || '',
      description: meta.meta?.meta_description || '',
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const isDraftMode = draftMode().isEnabled;

  const data = await getGlossaryEntry(params.slug, isDraftMode);
  if (!data) return notFound();

  const breadcrumbItems: BreadcrumbItemType[] = [
    { slug: '/glossary', title: 'Glossary' },
    { slug: `/glossary/${params.slug}`, title: data.term },
  ];

  const richTextBlocksToString = (
    blocks: Array<{ children?: Array<{ text?: string }> }>,
  ) => {
    return (
      (blocks ?? [])
        .flatMap((block) => block.children ?? [])
        .map((child) => child.text ?? '')
        .join('') || ''
    );
  };

  return (
    <div className="grid-system max-width col-span-full pt-36">
      <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
        <div className="mb-1">
          <BreadcrumbBlock items={breadcrumbItems} />
        </div>

        {data.term && <Heading className="!mb-4">{data.term}</Heading>}

        <Body body={data.fullEntry} />
      </div>

      <div className="col-span-full pt-16">
        {data.relatedTerms && data.relatedTerms.length > 0 && (
          <div className="py-section">
            <CardsSmallBlock
              cards={{
                _key: 'related-terms',
                heading: 'Related Terms',
                items: data.relatedTerms.map((term) => ({
                  _key: term._id,
                  heading: term.term,
                  body: richTextBlocksToString(term.shortEntry),
                  link: term.createFullPageEntry
                    ? {
                        internal: {
                          _type: 'glossaryEntry',
                          slug: `glossary/${term.slug}`,
                        },
                      }
                    : null,
                  icon: null,
                })),
                backgroundImage: null,
              }}
            />
          </div>
        )}

        {data.relatedPosts && data.relatedPosts.length > 0 && (
          <div className="py-section">
            <CardsBlock
              cards={{
                _key: 'related-posts',
                heading: 'Related Posts',
                body: '',
                isCarousel: false,
                hasTags: false,
                useFourColumns: false,
                tags: null,
                items: data.relatedPosts.map((post) => ({
                  _key: post._id,
                  heading: post.title,
                  body: post.custom_excerpt || undefined,
                  link: {
                    internal: {
                      _type: 'post',
                      post_type: post.post_type,
                      slug: post.slug,
                    },
                  },
                  image: post.image,
                  icon: null,
                  headerImage: post.image,
                  useAsBackgroundImage: false,
                  useSmallHeading: true,
                  selectedTags: null,
                  eyebrow: post.post_type || undefined,
                })),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
