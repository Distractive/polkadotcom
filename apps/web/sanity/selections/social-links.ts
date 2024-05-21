import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const socialLinkSelection = {
  url: q.string(),
  image: sanityImage("image", {
    withAsset: ["base"],
  }),
} satisfies Selection
