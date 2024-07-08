import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const innovationSelection = {
  innovation: q("innovation").grab({
    title: q.string(),
    images: sanityImage("images", { isList: true, withAsset: ["base"] }),
  }),
} satisfies Selection
