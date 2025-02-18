import { q } from 'groqd';
import type { Selection } from 'groqd';

import { cardLogoSelection } from './card-logo';

export const cardsLogoSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  items: q('items')
    .filter()
    .grab({ ...cardLogoSelection })
    .nullable(),
} satisfies Selection;
