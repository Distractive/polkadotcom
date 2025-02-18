import type { Metadata } from 'next';

import { CASE_STUDY_POSTTYPE } from '@/constants/global';
import { Newsletter } from '@/features/page/blocks/newsletter';
import Layout from '@/features/posts/layout';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const { page } = params;

  return {
    title: `Polkadot Case Studies | Page ${page}`,
    description: `Learn about the Polkadot ecosystem and it's practical applications through in-depth case studies. Page ${page}.`,
    openGraph: {
      title: `Polkadot Case Studies | Page ${page}`,
      description: `Learn about the Polkadot ecosystem and it's practical applications through in-depth case studies. Page ${page}.`,
    },
  };
}

// Only generate the first page statically
export async function generateStaticParams() {
  return [{ page: '1' }];
}

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  return (
    <>
      <Layout page={Number(page)} tagSlug="" type={CASE_STUDY_POSTTYPE} />
      <Newsletter />
    </>
  );
}
