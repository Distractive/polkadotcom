import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"
import { videoSelection } from "./video"

export const headerSelection = {
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  title: q.string(),
  body: nullToUndefined(q.string().optional()),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
  video: q("video")
    .grab$({
      ...videoSelection,
    })
    .nullable(),
} satisfies Selection
