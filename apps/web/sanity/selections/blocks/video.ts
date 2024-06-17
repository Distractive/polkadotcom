import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const videoSelection = {
  placeholderImage: sanityImage("placeholderImage", {
    withAsset: ["base", "dimensions"],
  }),
  url: q.string(),
} satisfies Selection
