import { is } from "@react-three/fiber/dist/declarations/src/core/utils"
import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "./custom-url"

export const bannerSelection = {
  isBannerOn: q.boolean().nullable(),
  eyebrow: q.string().nullable(),
  header: q.string().nullable(),
  altText: q.string().nullable(),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
  icon: sanityImage("icon", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
} satisfies Selection
