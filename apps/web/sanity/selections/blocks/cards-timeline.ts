import { q } from 'groqd';
import type { Selection } from 'groqd';

import { cardTimelineSelection } from './card-timeline';

export const cardsTimelineSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  content: q('content')
    .filter()
    .select({
      '_type == "block"': ['{...}', q.contentBlock()],
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal('unsupported')],
        unsupportedType: ['_type', q.string()],
      },
    })
    .nullable(),
  items: q('items')
    .filter()
    .grab({ ...cardTimelineSelection })
    .nullable(),
} satisfies Selection;
