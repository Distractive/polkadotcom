import { nullToUndefined, q } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const networkSelection = {
  network: q('network').grab({
    title: q.string(),
    body: q.string(),
    items: q('items')
      .filter()
      .grab({
        _key: q.string(),
        heading: q.string(),
        body: nullToUndefined(q.string().optional()),
        link: q('link')
          .grab$({
            ...customUrlSelection,
          })
          .nullable(),
      }),
  }),
} satisfies Selection;
