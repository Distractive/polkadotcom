import type { Selection } from 'groqd';
import { nullToUndefined, q, sanityImage } from 'groqd';

import { singletonMetaSelection } from '../singleton-meta';

export const blogSelection = {
  slug: q.slug('slug'),
  parent: q('parent')
    .deref()
    .grab({
      title: q.string(),
      header: q('header').grab({ title: q.string() }),
      slug: q.slug('slug'),
    })
    .nullable(),
  heading: q.string().nullable(),
  headerImage: sanityImage('headerImage', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  body: nullToUndefined(q.string().optional()),
  ...singletonMetaSelection,
} satisfies Selection;
