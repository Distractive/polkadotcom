import { q } from 'groqd';
import type { Selection } from 'groqd';
import { customUrlSelection } from '../custom-url';
import { cardStatSelection } from './card-stat';

export const cardsStatSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  content: q('content')
    .filter()
    .select({
      '_type == "block"': ['{...}', q.contentBlock()],
      '_type == "customUrl"': {
        _type: q.literal('customUrl'),
        ...customUrlSelection,
      },
      '_type == "break"': {
        _key: q.string(),
        _type: q.literal('break'),
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal('unsupported')],
        unsupportedType: ['_type', q.string()],
      },
    })
    .nullable(),
  items: q('items')
    .filter()
    .grab({ ...cardStatSelection })
    .nullable(),
} satisfies Selection;
