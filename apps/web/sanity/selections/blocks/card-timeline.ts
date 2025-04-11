import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const cardTimelineSelection = {
  _key: q.string(),
  year: q.string().optional().nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  altText: q.string().optional().nullable(),
  content: q('content')
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
} satisfies Selection;
