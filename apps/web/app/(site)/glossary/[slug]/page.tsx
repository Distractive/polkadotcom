import {
  getAllGlossarySlugs,
  getGlossaryEntry,
  getGlossaryEntryMeta,
} from '@/sanity/queries/glossary';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BreadcrumbBlock } from '@/features/page/blocks/breadcrumb';
import type { BreadcrumbItemType } from '@/features/page/blocks/breadcrumb';
import { Body } from '@/features/post/body';
import { Heading } from '@shared/ui';

export async function generateStaticParams() {
  const slugs = await getAllGlossarySlugs();

  if (!slugs?.length) return [{slug: 'not-found'}];

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

  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'static') {
    return notFound();
  }
  
  const data = await getGlossaryEntry(params.slug);
  if (!data) return notFound();

  const breadcrumbItems: BreadcrumbItemType[] = [
    { slug: '/glossary', title: 'Glossary' },
    { slug: `/glossary/${params.slug}`, title: data.term },
  ];

  return (
    <div className="max-width grid-system col-span-full  pt-36">
      <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
        <div className="mb-1">
          <BreadcrumbBlock items={breadcrumbItems} />
        </div>

        {data.term && <Heading className="!mb-4">{data.term}</Heading>}

        <Body body={data.fullEntry} />
        <div className="md:-mb-12 lg:-mb-24" />
      </div>
    </div>
  );
}
