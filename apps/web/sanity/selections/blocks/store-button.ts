import { q } from 'groqd';
import type { Selection } from 'groqd';

export const storeButtonSelection = {
  _key: q.string(),
  _type: q.literal('storeButton'),
  store: q.union([q.literal('appstore'), q.literal('playstore')]),
  href: q.string().nullable(),
} satisfies Selection;
