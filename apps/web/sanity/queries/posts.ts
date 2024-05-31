import { runQuery } from "@/sanity/lib/groqd-query"
import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { POSTS_PER_PAGE } from "@/constants/global"

export const postSelection = {
  title: q.string(),
  _id: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("featured_image", {
    withAsset: ["base", "dimensions"],
  }),
  tags: q("tags")
    .filter()
    .deref()
    .grab$({ name: q.string(), slug: q.slug("slug") }),
  custom_excerpt: q.string().nullable(),
  body: q("body")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
    }),
} satisfies Selection

export async function getPosts(
  page: number,
  postType: string,
  tagSlug: string
) {
  const unknownArrayQuery = q("").filter("").filter("")
  type UnknownArrayQuery = typeof unknownArrayQuery

  function paginate<T extends Selection>(
    query: UnknownArrayQuery,
    selection: T,
    pageIndex: number,
    pageSize: number
  ) {
    const startIndex = (pageIndex - 1) * pageSize
    const endIndex = startIndex + pageSize - 1

    console.log(postType)

    return q("").grab({
      posts: query
        .grab(selection)
        .order("published_date desc")
        .slice(startIndex, endIndex),
      totalCount: [`count(${query.query})`, q.number()],
    })
  }

  const tagFilter = tagSlug ? "$tagSlug in tags[]-> slug.current" : ""

  const postQuery = q("*")
    .filterByType("post")
    .filter(tagFilter)
    .filter("post_type == $postType")

  return runQuery(paginate(postQuery, postSelection, page, POSTS_PER_PAGE), {
    postType: postType,
    tagSlug: tagSlug,
  })
}
