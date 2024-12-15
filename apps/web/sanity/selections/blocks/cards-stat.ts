import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { cardStatSelection } from "./card-stat"

export const cardsStatSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  items: q("items")
    .filter()
    .grab({ ...cardStatSelection })
    .nullable(),
} satisfies Selection
