import type { Selection } from 'groqd';
import { nullToUndefined, q } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const notfoundSelection = {
  heading: q.string(),
  body: nullToUndefined(q.string().optional()),
  links: q('links')
    .filter()
    .select({
      '_type == "customUrl"': {
        _type: q.literal('customUrl'),
        ...customUrlSelection,
      },
    })
    .nullable(),
} satisfies Selection;
