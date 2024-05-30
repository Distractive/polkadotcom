import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { cardSelection } from "./card"

export const cardsSelection = {
  _key: q.string(),
  heading: nullToUndefined(q.string().optional()),
  body: nullToUndefined(q.string().optional()),
  isCarousel: nullToUndefined(q.boolean().optional()),
  hasTags: nullToUndefined(q.boolean().optional()),
  showSideBySide: nullToUndefined(q.boolean().optional()),
  tags: q.array(q.string()).nullable(),
  items: q("items")
    .filter()
    .grab({ ...cardSelection }),
} satisfies Selection
