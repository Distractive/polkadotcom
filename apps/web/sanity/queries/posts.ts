import { runQuery } from "@/sanity/lib/groqd-query"
import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { POSTS_PER_PAGE } from "@/constants/global"

import { blogSelection } from "../selections/blog/blog"

export const postSelection = {
  title: q.string(),
  _id: q.string(),
  slug: q.slug("slug"),
  post_type: q.string(),
  image: sanityImage("featured_image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  tags: q("tags")
    .filter()
    .deref()
    .grab$({ name: q.string(), slug: q.slug("slug") }),
  custom_excerpt: q.string().nullable(),
  published_date: q.date(),
  body: q("body")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
    }),
} satisfies Selection

export async function getPosts(
  page: number,
  postType: string,
  tagSlug: string,
  filteredSlug?: string // slug param to not include in query results
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

    return q("").grab({
      posts: query
        .grab(selection)
        .order("published_date desc")
        .slice(startIndex, endIndex),
      totalCount: [`count(${query.query})`, q.number()],
    })
  }

  const slugFilter = filteredSlug ? `slug.current != $filteredSlug` : ""
  const tagFilter = tagSlug ? "$tagSlug in tags[]-> slug.current" : ""
  const combinedFilter = [tagFilter, slugFilter].filter(Boolean).join(" && ")

  const postQuery = q("*")
    .filterByType("post")
    .filter(combinedFilter)
    .filter("post_type == $postType")

  const params: Record<string, string | number> = {
    postType,
    tagSlug,
  }

  if (filteredSlug) {
    params.filteredSlug = filteredSlug // Add filteredSlug only if it's defined
  }

  return runQuery(
    paginate(postQuery, postSelection, page, POSTS_PER_PAGE),
    params
  )
}

export type PostType = "blog" | "press-releases"

export async function getPostHeading(postType: PostType) {
  const query = q("*")
    .filterByType(postType)
    .grab$({
      ...blogSelection,
    })
    .slice(0)

  return runQuery(query, {})
}

export async function getSlugs(postType: string) {
  const query = q("*")
    .filterByType("post")
    .filter(`post_type == '${postType}'`)
    .grab({
      slug: q.slug("slug"),
    })

  return runQuery(query, {})
}
