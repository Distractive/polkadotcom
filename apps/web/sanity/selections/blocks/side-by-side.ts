import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';
import { newsletterButtonSelection } from './newsletter-button';
import { videoSelection } from './video';

export const sideBySideSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  subheading: q.string().optional().nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  video: q('video')
    .grab$({
      ...videoSelection,
    })
    .nullable(),
  altText: q.string().nullable().optional(),
  isImageOnLeft: q.boolean().optional().nullable(),
  isTextVerticallyCentered: q.boolean().optional().nullable(),
  content: q('content')
    .filter()
    .select({
      '_type == "block"': ['{...}', q.contentBlock()],
      '_type == "customUrl"': {
        _type: q.literal('customUrl'),
        ...customUrlSelection,
      },
      '_type == "newsletterButton"': {
        ...newsletterButtonSelection,
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal('unsupported')],
        unsupportedType: ['_type', q.string()],
      },
    })
    .nullable(),
} satisfies Selection;
