import { nullToUndefined, q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const cardSelection = {
  _key: q.string(),
  headerImage: sanityImage('headerImage', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  useAsBackgroundImage: q.boolean().nullable(),
  icon: sanityImage('icon', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  eyebrow: nullToUndefined(q.string().optional()),
  heading: q.string().nullable(),
  useSmallHeading: q.boolean().nullable(),
  useRichText: q.boolean().nullable(),
  body: nullToUndefined(q.string().optional()),
  richBody: q('content')
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
  selectedTags: q.array(q.string()).nullable(),
  link: q('link')
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
} satisfies Selection;
