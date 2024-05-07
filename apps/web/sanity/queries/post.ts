import { runQuery } from "@/sanity/lib/groqd-query"
import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const postSelection = {
  title: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("featured_image", {
    withAsset: ["base", "dimensions"],
  }),
  tags: q("tags")
    .filter()
    .deref()
    .grab$({ name: q.string(), slug: q.slug("slug") }),
  author: q("author")
    .deref()
    .grab({
      name: q.string(),
      image: sanityImage("image", {
        withAsset: ["base", "dimensions"],
      }),
    }),
  published_date: q.date(),
  body: q("body")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
      '_type == "image"': {
        _type: q.literal("image"),
        asset: sanityImage("asset"),
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    }),
} satisfies Selection

export async function getPost(slug: string) {
  const postQuery = q("*")
    .filterByType("post")
    .filter("slug.current == $slug")
    .grab(postSelection)
    .slice(0)

  return runQuery(postQuery, {
    slug: slug,
  })
}
