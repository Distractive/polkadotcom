import { getPage, getPageMeta, getSlugs } from '@/sanity/queries/page';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import GlobalGradient from '@/features/gradients/global-gradient';
import { HeaderBlock } from '@/features/page/blocks/header';
import { PageBuilder } from '@/features/page/page-builder';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const meta = await getPageMeta(slug);
  const data = await getPage(slug, false);

  if (!meta) {
    return {
      title: 'Polkadot 404',
      description: 'Page not found',
    };
  }

  return {
    title:
      data?.title || meta.meta?.meta_title || meta?.header?.title || 'Polkadot',
    description:
      meta.meta?.meta_description ||
      meta?.header?.body ||
      'Polkadot empowers blockchain networks to work together under the protection of shared security.',
    openGraph: {
      title: meta.meta?.meta_title || meta?.header?.title || 'Polkadot',
      images: [meta.meta?.meta_image?.asset.url || ''],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getSlugs('landing');

  if (!slugs) {
    return [];
  }

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params: { slug } }: Props) {
  const isDraftMode = draftMode().isEnabled;
  const data = await getPage(slug, isDraftMode);

  if (!data?.slug) {
    return notFound();
  }

  return (
    // Hide overflow on mobile for gradient, remove it on large devices to avoid messing up stacking context and breaking sticky cards component
    <div className="relative overflow-x-hidden lg:overflow-x-visible">
      <GlobalGradient />
      {data.header && <HeaderBlock header={data.header} />}

      <section className="flex flex-col gap-page">
        <PageBuilder pageBuilder={data.pageBuilder} />
      </section>
    </div>
  );
}
