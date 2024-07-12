import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

export const singletonMetaSelection = {
  meta: q("meta").grab({
    meta_title: nullToUndefined(q.string().optional()),
    meta_description: nullToUndefined(q.string().optional()),
    meta_image: sanityImage("image", {
      withAsset: ["base"],
    }).nullable(),
  }),
} satisfies Selection
