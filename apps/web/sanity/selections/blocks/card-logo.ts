import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const cardLogoSelection = {
  _key: q.string(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }),
  name: q.string(),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
} satisfies Selection
