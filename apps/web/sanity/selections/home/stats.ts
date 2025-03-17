import { q } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';
import { cardStatSelection } from '../blocks/card-stat';

export const statsSelection = {
  stats: q('stats').grab({
    title: q.string(),
    items: q('items')
      .filter()
      .grab({
        ...cardStatSelection,
        link: q('link')
          .grab$({
            ...customUrlSelection,
          })
          .nullable(),
      }),
  }),
} satisfies Selection;
