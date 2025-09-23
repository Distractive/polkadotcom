import { q } from 'groqd';
import type { Selection } from 'groqd';

import { cardSelection } from './card';

export const cardsSelection = {
  _key: q.string(),
  _type: q.literal('cards'),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  isCarousel: q.boolean().optional().nullable(),
  hasTags: q.boolean().optional().nullable(),
  useFourColumns: q.boolean().optional().nullable(),
  tags: q.array(q.string()).optional().nullable(),
  items: q('items')
    .filter()
    .grab({ ...cardSelection })
    .nullable(),
} satisfies Selection;
