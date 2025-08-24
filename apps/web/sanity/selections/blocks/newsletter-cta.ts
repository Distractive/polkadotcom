import type { Selection } from 'groqd';
import { q, sanityImage } from 'groqd';

export const newsletterCTASelection = {
  _key: q.string(),
  _type: q.literal('newsletterCTA'),
  heading: q.string().nullable().optional(),
  image: sanityImage('image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  adjustImageForOverflow: q.boolean().nullable(),
  altText: q.string().nullable().optional(),
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
  formType: q.string().optional().nullable(),
} satisfies Selection;
