import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const quoteSelection = {
  _key: q.string(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  title: q.string(),
  body: nullToUndefined(q.string().optional()),
} satisfies Selection
