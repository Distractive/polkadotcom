import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"
import type { Selection } from "groqd"

import { BLOG_POSTTYPE, PRESS_RELEASE_POSTTYPE } from "@/constants/global"

export const searchSelection = {
  title: q.string(),
  _id: q.string(),
  slug: q.slug("slug"),
} satisfies Selection

export async function getSearchData(
  postType: typeof BLOG_POSTTYPE | typeof PRESS_RELEASE_POSTTYPE
) {
  const postQuery = q("*")
    .filterByType("post")
    .filter(`post_type == "${postType}"`)
    .grab(searchSelection)

  return runQuery(postQuery, {})
}
