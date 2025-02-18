import type { Selection } from 'groqd';
import { q } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const faqsSelection = {
  title: q.string().optional().nullable(),
  items: q('items')
    .filter()
    .grab$({
      _key: q.string().optional().nullable(),
      question: q.string().optional().nullable(),
      answer: q('answer')
        .filter()
        .select({
          '_type == "block"': ['{...}', q.contentBlock()],
          '_type == "customUrl"': {
            _type: q.literal('customUrl'),
            ...customUrlSelection,
          },
          default: {
            _key: q.string(),
            _type: ['"unsupported"', q.literal('unsupported')],
            unsupportedType: ['_type', q.string()],
          },
        })
        .nullable(),
    })
    .nullable(),
} satisfies Selection;
