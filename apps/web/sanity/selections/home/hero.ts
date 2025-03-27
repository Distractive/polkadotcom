import { q } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const heroSelection = {
  hero: q('hero').grab({
    title: q.string(),
    copy: q.string(),
    links: q('links')
      .filter()
      .select({
        '_type == "customUrl"': {
          _type: q.literal('customUrl'),
          ...customUrlSelection,
        },
      })
      .nullable(),
  }),
} satisfies Selection;
