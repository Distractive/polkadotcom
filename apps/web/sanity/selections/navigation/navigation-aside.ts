import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const navigationAsideSelection = {
  heading: q.string(),
  link: q('link')
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
  image: sanityImage('image', {
    withAsset: ['base'],
  }),
} satisfies Selection;
