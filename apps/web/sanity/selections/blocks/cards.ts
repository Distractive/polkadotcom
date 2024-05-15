import { q } from "groqd"
import type { Selection } from "groqd"

import { cardSelection } from "./card"

export const cardsSelection = {
  heading: q.string(),
  isCarousel: q.boolean(),
  items: q("items")
    .filter()
    .grab({ ...cardSelection }),
} satisfies Selection
