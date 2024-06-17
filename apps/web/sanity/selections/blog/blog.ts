import type { Selection } from "groqd"
import { nullToUndefined, q, sanityImage } from "groqd"

export const blogSelection = {
  slug: q.slug("slug"),
  parent: q("parent")
    .deref()
    .grab({
      header: q("header").grab({ title: q.string() }),
      slug: q.slug("slug"),
    })
    .nullable(),
  heading: q.string(),
  headerImage: sanityImage("headerImage", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  body: nullToUndefined(q.string().optional()),
} satisfies Selection
