import config from '@/sanity.config';
import { NextStudio } from 'next-sanity/studio';

export const dynamic = 'force-static';
export const dynamicParams = false;

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (process.env.NEXT_PUBLIC_BUILD_TYPE === 'static') {
    return '';
  }
  return <NextStudio config={config} />;
}

export async function generateStaticParams() {
  return [{ slug: [] }];
}
