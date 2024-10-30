import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const customQuoteSelection = {
  _key: q.string(),
  _type: q.literal("custom_quote"),
  text: q.string(),
  author: q.string().optional(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
    additionalFields: {
      alt: q.string().optional(),
    },
  }).nullable(),
} satisfies Selection
