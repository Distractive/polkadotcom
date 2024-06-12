import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const videoSelection = {
  _key: q.string(),
  placeholderImage: sanityImage("placeholderImage", {
    withAsset: ["base", "dimensions"],
  }),
  url: q.string(),
} satisfies Selection
