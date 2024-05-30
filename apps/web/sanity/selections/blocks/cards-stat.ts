import { q } from "groqd"
import type { Selection } from "groqd"

import { cardStatSelection } from "./card-stat"

export const cardsStatSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
  items: q("items")
    .filter()
    .grab({ ...cardStatSelection }),
} satisfies Selection
