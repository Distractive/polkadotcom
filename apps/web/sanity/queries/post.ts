import { runQuery } from "@/sanity/lib/groqd-query"
import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const postSelection = {
  title: q.string(),
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
        alt: q.string(),
        caption: q.string(),
        image: q("asset").grabOne("_ref", q.string()),
      },
      '_type == "code"': {
        _type: q.literal("code"),
        code: q.string(),
      },
      '_type == "youtube"': {
        _type: q.literal("youtube"),
        url: q.string(),
        title: q.string(),
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    }),
} satisfies Selection

export const metaSelection = {
  title: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("featured_image", {
    withAsset: ["base"],
  }).nullable(),
  meta_title: nullToUndefined(q.string().optional()),
  meta_description: nullToUndefined(q.string().optional()),
  custom_excerpt: nullToUndefined(q.string().optional()),
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

export async function getPostMeta(slug: string) {
  const metaQuery = q("*")
    .filterByType("post")
    .filter("slug.current == $slug")
    .grab(metaSelection)
    .slice(0)
  return runQuery(metaQuery, { slug: slug })
}
