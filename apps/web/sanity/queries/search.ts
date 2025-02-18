import { runQuery } from '@/sanity/lib/groqd-query';
import { q } from 'groqd';
import type { Selection } from 'groqd';

import type {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';

export const searchSelection = {
  title: q.string(),
  _id: q.string(),
  slug: q.slug('slug'),
} satisfies Selection;

export async function getSearchData(
  postType:
    | typeof BLOG_POSTTYPE
    | typeof PRESS_RELEASE_POSTTYPE
    | typeof CASE_STUDY_POSTTYPE,
) {
  const postQuery = q('*')
    .filterByType('post')
    .filter(`post_type == "${postType}"`)
    .grab(searchSelection)
    .nullable();

  try {
    const result = await runQuery(postQuery, {}, false);
    return result;
  } catch (error) {
    console.error('Error fetching search data:', error);
    return null;
  }
}
