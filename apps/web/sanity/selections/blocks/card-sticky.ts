import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const cardStickySelection = {
  _key: q.string(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  icon: sanityImage("icon", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  eyebrow: nullToUndefined(q.string().optional()),
  heading: q.string(),
  body: nullToUndefined(q.string().optional()),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
} satisfies Selection
