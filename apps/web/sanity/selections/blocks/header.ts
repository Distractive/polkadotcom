import type { Selection } from 'groqd';
import { nullToUndefined, q, sanityImage } from 'groqd';

import { customUrlSelection } from '../custom-url';
import { newsletterButtonSelection } from './newsletter-button';
import { videoSelection } from './video';

export const headerSelection = {
  image: sanityImage('image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  mobileImage: sanityImage('mobileImage', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  altText: nullToUndefined(q.string().optional()),
  hideBreadcrumbs: q.boolean().optional().nullable(),
  title: q.string().optional().nullable(),
  isAlternate: q.boolean().optional().nullable(),
  body: nullToUndefined(q.string().optional()),
  links: q('links')
    .filter()
    .select({
      '_type == "customUrl"': {
        _type: q.literal('customUrl'),
        ...customUrlSelection,
      },
      '_type == "newsletterButton"': { ...newsletterButtonSelection },
    })
    .nullable(),
  video: q('video')
    .grab$({
      ...videoSelection,
    })
    .nullable(),
} satisfies Selection;
