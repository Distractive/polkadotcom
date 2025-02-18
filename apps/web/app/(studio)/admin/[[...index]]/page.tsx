import config from '@/sanity.config';
import { NextStudio } from 'next-sanity/studio';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
