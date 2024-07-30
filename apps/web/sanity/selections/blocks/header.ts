import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"
import { videoSelection } from "./video"

export const headerSelection = {
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  mobileImage: sanityImage("mobileImage", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  title: q.string(),
  isAlternate: q.boolean().optional().nullable(),
  body: nullToUndefined(q.string().optional()),
  links: q("links")
    .filter()
    .select({
      '_type == "customUrl"': {
        _type: q.literal("customUrl"),
        ...customUrlSelection,
      },
    })
    .nullable(),
  video: q("video")
    .grab$({
      ...videoSelection,
    })
    .nullable(),
} satisfies Selection
