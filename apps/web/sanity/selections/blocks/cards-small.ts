import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { cardSmallSelection } from "./card-small"

export const cardsSmallSelection = {
  _key: q.string(),
  heading: nullToUndefined(q.string().optional()),
  body: nullToUndefined(q.string().optional()),
  items: q("items")
    .filter()
    .grab({ ...cardSmallSelection }),
  backgroundImage: sanityImage("backgroundImage", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
} satisfies Selection
