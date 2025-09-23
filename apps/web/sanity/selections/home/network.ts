import { q } from 'groqd';
import type { Selection } from 'groqd';

import { cardSmallSelection } from '../blocks/card-small';

export const networkSelection = {
  network: q('network')
    .grab({
      title: q.string(),
      body: q.string(),
      items: q('items')
        .filter()
        .grab({
          ...cardSmallSelection,
        }),
    })
    .nullable(),
} satisfies Selection;
