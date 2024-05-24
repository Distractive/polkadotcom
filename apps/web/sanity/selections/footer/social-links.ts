import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const socialLinkSelection = {
  title: q.string(),
  url: q.string(),
  image: sanityImage("image", {
    withAsset: ["base"],
  }),
} satisfies Selection
