import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"
import { videoSelection } from "./video"

export const mediaBlockSelection = {
  _key: q.string(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  isFullWidthVideo: q.boolean().optional().nullable(),
  video: q("video")
    .grab$({
      ...videoSelection,
    })
    .nullable(),
  eyebrow: q.string().optional().nullable(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  links: q("links")
    .filter()
    .select({
      '_type == "customUrl"': {
        _type: q.literal("customUrl"),
        ...customUrlSelection,
      },
    })
    .nullable(),
} satisfies Selection
