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
  eyebrow: nullToUndefined(q.string().optional()),
  heading: nullToUndefined(q.string().optional()),
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
} satisfies Selection
