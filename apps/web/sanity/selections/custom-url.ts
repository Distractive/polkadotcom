import type { Selection } from 'groqd';
import { q } from 'groqd';

export const customUrlSelection = {
  label: q.string().optional().nullable(),
  _type: q.literal('customUrl'),
  variant: q
    .union([
      q.literal('primary'),
      q.literal('secondary'),
      q.literal('tertiary'),
      q.literal('disabled'),
    ])
    .optional()
    .nullable(),
  internal: q('internal')
    .deref()
    .grab$({
      _type: q.string().nullable().optional(),
      post_type: q.string().nullable().optional(),
      slug: q.slug('slug'),
    })
    .nullable(),
  external: q.string().optional().nullable(),
  nofollow: q.boolean().optional().nullable(),
} satisfies Selection;
