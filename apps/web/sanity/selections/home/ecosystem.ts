import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../custom-url';

export const ecosystemSelection = {
  ecosystem: q('ecosystem')
    .grab({
      title: q.string(),
      body: q.string().nullable(),
      link: q('link')
        .grab$({
          ...customUrlSelection,
        })
        .nullable(),
      items: q('items')
        .filter()
        .grab({
          _key: q.string(),
          image: sanityImage('image', {
            withAsset: ['base', 'dimensions'],
          }),
          heading: q.string().nullable().optional(),
          category: q.string().nullable().optional(),
          categoryColor: q.string().nullable().optional(),
          body: q.string().nullable().optional(),
          link: q('link')
            .grab$({
              ...customUrlSelection,
            })
            .nullable(),
        }),
    })
    .nullable(),
} satisfies Selection;
