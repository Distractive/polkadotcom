import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { cardSmallSelection } from "./card-small"

export const cardsSmallSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  items: q("items")
    .filter()
    .grab({ ...cardSmallSelection })
    .nullable(),
  backgroundImage: sanityImage("backgroundImage", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
} satisfies Selection
