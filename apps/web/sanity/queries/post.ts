import { runQuery } from '@/sanity/lib/groqd-query';
import { nullToUndefined, q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

import { customUrlSelection } from '../selections/custom-url';

export const postSelection = {
  title: q.string().nullable(),
  slug: q.slug('slug'),
  post_type: q.string().nullable(),
  image: sanityImage('featured_image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  tags: q('tags')
    .filter()
    .deref()
    .grab$({ name: q.string(), slug: q.slug('slug') })
    .nullable(),
  custom_excerpt: q.string().nullable().optional(),
  author: q('author')
    .deref()
    .grab({
      name: q.string(),
      image: sanityImage('image', {
        withAsset: ['base', 'dimensions'],
      }),
    })
    .nullable(),
  published_date: q.date().nullable(),
  body: q('body')
    .filter()
    .select({
      '_type == "block"': ['{...}', q.contentBlock()],
      '_type == "image"': {
        _type: q.literal('image'),
        alt: q.string().optional().nullable(),
        caption: q.string().optional().nullable(),
        image: q('asset').grabOne('_ref', q.string()),
      },
      '_type == "code"': {
        _type: q.literal('code'),
        code: q.string(),
      },
      '_type == "youtube"': {
        _type: q.literal('youtube'),
        url: q.string(),
        title: q.string(),
      },
      '_type == "custom_quote"': {
        _key: q.string(),
        _type: q.literal('custom_quote'),
        text: q.string(),
        author: q.string().optional(),
        image: sanityImage('image', {
          additionalFields: {
            alt: q.string().optional(),
          },
        }).nullable(),
      },
      '_type == "summary"': {
        _key: q.string(),
        _type: q.literal('summary'),
        title: q.string(),
        titleLink: q('titleLink')
          .grab({
            _type: q.literal('customUrl'),
            ...customUrlSelection,
          })
          .nullable(),
        links: q('links')
          .filter()
          .select({
            '_type == "customUrl"': {
              _type: q.literal('customUrl'),
              ...customUrlSelection,
            },
          }),
        callouts: q.array(
          q.object({
            text: q.array(q.contentBlock()),
          }),
        ),
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal('unsupported')],
        unsupportedType: ['_type', q.string()],
      },
    })
    .nullable(),
} satisfies Selection;

export const metaSelection = {
  title: q.string().optional().nullable(),
  slug: q.slug('slug'),
  image: sanityImage('featured_image', {
    withAsset: ['base'],
  }).nullable(),
  meta_title: nullToUndefined(q.string().optional()),
  meta_description: nullToUndefined(q.string().optional()),
  custom_excerpt: nullToUndefined(q.string().optional()),
} satisfies Selection;

export async function getPost(slug: string, isDraftMode: boolean) {
  const postQuery = q('*')
    .filterByType('post')
    .filter('slug.current == $slug')
    .grab(postSelection)
    .slice(0)
    .nullable();

  try {
    const result = await runQuery(postQuery, { slug }, isDraftMode);
    return result;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}

export async function getPostMeta(slug: string) {
  const metaQuery = q('*')
    .filterByType('post')
    .filter('slug.current == $slug')
    .grab(metaSelection)
    .slice(0)
    .nullable();

  try {
    const result = await runQuery(metaQuery, { slug }, false);
    return result;
  } catch (error) {
    console.error('Error fetching post meta:', error);
    return null;
  }
}
