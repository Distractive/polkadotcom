import type { Selection } from 'groqd';
import { q, sanityImage } from 'groqd';

export const glossaryEntrySelection = {
  _id: q.string(),
  title: q.string().nullable(),
  slug: q.slug('slug'),
  term: q.string(),
  shortEntry: q.array(q.contentBlock()),
  createFullPageEntry: q.boolean().nullable(),
  fullEntry: q.array(q.contentBlock()).optional(),
  relatedTerms: q('relatedTerms')
    .filter()
    .deref()
    .grab$({
      _id: q.string(),
      term: q.string(),
      slug: ['slug.current', q.string().optional()],
      createFullPageEntry: q.boolean().nullable(),
      shortEntry: q.array(q.contentBlock()),
    }),
  relatedPosts: q('relatedPosts')
    .filter()
    .deref()
    .grab$({
      _id: q.string(),
      title: q.string().nullable(),
      slug: q.slug('slug'),
      post_type: q.string().nullable(),
      custom_excerpt: q.string().nullable(),
      published_date: q.date().nullable(),
      image: sanityImage('featured_image', {
        withAsset: ['base', 'dimensions'],
      }).nullable(),
    }),
} satisfies Selection;
