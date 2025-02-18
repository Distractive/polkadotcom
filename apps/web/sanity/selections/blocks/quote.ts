import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

export const quoteSelection = {
  _key: q.string(),
  image: sanityImage('image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  title: q.contentBlocks().nullable().optional(),
  body: q.string().optional().nullable(),
} satisfies Selection;
