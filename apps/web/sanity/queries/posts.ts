import { runQuery } from '@/sanity/lib/groqd-query';
import type { Selection } from 'groqd';
import { q, sanityImage } from 'groqd';

import { POSTS_PER_PAGE } from '@/constants/global';

import { blogSelection } from '../selections/blog/blog';

export const postSelection = {
  title: q.string(),
  _id: q.string(),
  slug: q.slug('slug'),
  post_type: q.string(),
  hide_post: q.boolean().optional().nullable(),
  image: sanityImage('featured_image', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  tags: q('coalesce(tags, [])')
    .filter()
    .deref()
    .grab$({ name: q.string(), slug: q.slug('slug') }),
  custom_excerpt: q.string().nullable(),
  published_date: q.date(),
  body: q('body')
    .filter()
    .select({
      '_type == "block"': ['{...}', q.contentBlock()],
    }),
} satisfies Selection;

export async function getPosts(
  page: number,
  postType: string,
  tagSlug: string,
  isDraftMode: boolean,
  filteredSlug?: string, // slug param to not include in query results
) {
  const unknownArrayQuery = q('').filter('').filter('');
  type UnknownArrayQuery = typeof unknownArrayQuery;

  function paginate<T extends Selection>(
    query: UnknownArrayQuery,
    selection: T,
    pageIndex: number,
    pageSize: number,
  ) {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;

    return q('').grab({
      posts: query
        .grab(selection)
        .filter('hide_post != true')
        .order('published_date desc')
        .slice(startIndex, endIndex),
      totalCount: [`count(${query.query})`, q.number()],
    });
  }

  const slugFilter = filteredSlug ? 'slug.current != $filteredSlug' : '';
  const tagFilter = tagSlug ? '$tagSlug in tags[]-> slug.current' : '';
  const combinedFilter = [tagFilter, slugFilter].filter(Boolean).join(' && ');

  const postQuery = q('*')
    .filterByType('post')
    .filter(combinedFilter)
    .filter('post_type == $postType');

  const params: Record<string, string | number> = {
    postType,
    tagSlug,
  };

  if (filteredSlug) {
    params.filteredSlug = filteredSlug;
  }

  try {
    const result = await runQuery(
      paginate(postQuery, postSelection, page, POSTS_PER_PAGE),
      params,
      isDraftMode,
    );
    return result;
  } catch (error) {
    console.error('Error running query:', error);
    return null;
  }
}

export type PostType = 'blog' | 'press-releases' | 'case-studies';

export async function getPostHeading(postType: PostType) {
  const query = q('*')
    .filterByType(postType)
    .grab$({
      ...blogSelection,
    })
    .nullable();

  try {
    const result = await runQuery(query, {}, false);
    if (!result?.length) return [];
    return result;
  } catch (error) {
    console.error('Error running query:', error);
    throw error;
  }
}

export async function getSlugs(postType: string) {
  const query = q('*')
    .filterByType('post')
    .filter(`post_type == '${postType}'`)
    .grab({
      slug: q.slug('slug'),
    })
    .nullable();

  try {
    const result = await runQuery(query, {}, false);
    return result;
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return null;
  }
}
