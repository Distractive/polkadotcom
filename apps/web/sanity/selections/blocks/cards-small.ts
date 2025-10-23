import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { cardSmallSelection } from './card-small';

export const cardsSmallSelection = {
  _key: q.string(),
  isHeadingCenteredDesktop: q.boolean().optional().nullable(),
  isHeadingCenteredMobile: q.boolean().optional().nullable(),
  heading: q.string().optional().nullable(),
  useRichText: q.boolean().optional().nullable(),
  body: q.string().optional().nullable(),
  richBody: q('richBody')
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
    .grab({ ...cardSmallSelection })
    .nullable(),
  backgroundImage: sanityImage('backgroundImage', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
} satisfies Selection;
