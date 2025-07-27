import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const cardStatSelection = {
  _key: q.string(),
  icon: sanityImage('icon', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  makeIconFullWidth: q.boolean().optional().nullable(),
  useLiveMetric: q.boolean().nullable(),
  liveMetric: q.string().optional().nullable(),
  addDollarSign: q.boolean().optional().nullable(),
  displayInMillions: q.boolean().optional().nullable(),
  heading: q.string().optional().nullable(),
  fallbackHeading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
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
