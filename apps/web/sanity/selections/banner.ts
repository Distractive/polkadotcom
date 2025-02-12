import type { Selection } from "groqd"
import { q, sanityImage } from "groqd"

import { customUrlSelection } from "./custom-url"

export const bannerSelection = {
  isBannerOn: q.boolean().nullable(),
  eyebrow: q.string().optional().nullable(),
  header: q.string().optional().nullable(),
  altText: q.string().optional().nullable(),
  mobileText: q.string().optional().nullable(),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
  icon: sanityImage("icon", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
} satisfies Selection
