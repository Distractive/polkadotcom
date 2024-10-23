import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const ctaSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
  useWhiteText: q.boolean().nullable(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }),
  altText: nullToUndefined(q.string().optional()),
  links: q("links")
    .filter()
    .select({
      '_type == "customUrl"': {
        _type: q.literal("customUrl"),
        ...customUrlSelection,
      },
    })
    .nullable(),
} satisfies Selection
