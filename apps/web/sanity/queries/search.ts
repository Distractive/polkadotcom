import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"
import type { Selection } from "groqd"

export const searchSelection = {
  title: q.string(),
  _id: q.string(),
  slug: q.slug("slug"),
} satisfies Selection

export async function getSearchData() {
  const postQuery = q("*")
    .filterByType("post")
    .filter("post_type == 'Blog'")
    .grab(searchSelection)

  return runQuery(postQuery, {})
}
