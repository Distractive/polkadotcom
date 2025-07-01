import {
  getAllGlossarySlugs,
  getGlossaryEntry,
  getGlossaryEntryMeta,
} from '@/sanity/queries/glossary';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';

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
  const meta = await getGlossaryEntryMeta(params.slug);

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
  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'static') {
    return notFound();
  }

  const data = await getGlossaryEntry(params.slug, isDraftMode);
  if (!data) return notFound();

  const createSlugFromTerm = (term: string) => {
    return term
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const processedRelatedTerms =
    data.relatedTerms?.map((term) => ({
      ...term,
      effectiveSlug:
        term.createFullPageEntry && term.slug
          ? term.slug
          : createSlugFromTerm(term.term),
      isFullPage: !!(term.createFullPageEntry && term.slug),
    })) || [];

  console.log('terms: ', data.relatedTerms);
  console.log('processed terms: ', processedRelatedTerms);

  // All posts should have slugs, but filter just in case
  const validRelatedPosts =
    data.relatedPosts?.filter((post) => post.slug) || [];

  const breadcrumbItems: BreadcrumbItemType[] = [
    { slug: '/glossary', title: 'Glossary' },
    { slug: `/glossary/${params.slug}`, title: data.term },
  ];

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const extractPlainText = (blocks: any[]) => {
    return (
      blocks
        ?.map(
          (block) =>
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            block.children?.map((child: any) => child.text).join('') || '',
        )
        .join(' ') || ''
    );
  };

  const hasRelatedContent =
    (data.relatedTerms && data.relatedTerms.length > 0) ||
    (data.relatedPosts && data.relatedPosts.length > 0);

  return (
    <div className="grid-system max-width col-span-full pt-36">
      <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
        <div className="mb-1">
          <BreadcrumbBlock items={breadcrumbItems} />
        </div>

        {data.term && <Heading className="!mb-4">{data.term}</Heading>}

        <Body body={data.fullEntry} />
      </div>
      <div className="col-span-full pt-section">
        {processedRelatedTerms.length > 0 && (
          <CardsSmallBlock
            cards={{
              _key: 'related-terms',
              heading: 'Related Terms',
              body: null,
              items: processedRelatedTerms.map((term) => ({
                _key: term._id,
                heading: term.term,
                body: extractPlainText(term.shortEntry),
                link: term.isFullPage
                  ? {
                      label: null,
                      variant: null,
                      internal: {
                        _type: 'glossaryEntry',
                        post_type: null,
                        slug: `glossary/${term.slug}`,
                      },
                      nofollow: null,
                    }
                  : null,
                icon: null,
                eyebrow: null,
              })),
              backgroundImage: null,
            }}
          />
        )}

        <div className="mb-24" />

        {/* Related Posts Section */}
        {validRelatedPosts.length > 0 && (
          <CardsBlock
            cards={{
              _key: 'related-posts',
              heading: 'Related Posts',
              body: '',
              isCarousel: false,
              hasTags: false,
              useFourColumns: false,
              tags: null,
              items: validRelatedPosts.map((post) => ({
                _key: post._id,
                heading: post.title,
                body: post.custom_excerpt || undefined,
                link: {
                  label: null,
                  variant: null,
                  internal: {
                    _type: 'post',
                    post_type: post.post_type,
                    slug: post.slug,
                  },
                  external: null,
                  nofollow: null,
                },
                image: post.image,
                icon: null,
                headerImage: post.image,
                useAsBackgroundImage: null,
                useSmallHeading: true,
                selectedTags: null,
                eyebrow: post.post_type || undefined,
              })),
            }}
          />
        )}
        {/* <div className="md:-mb-12 lg:-mb-24" /> */}
      </div>
    </div>
  );
}
