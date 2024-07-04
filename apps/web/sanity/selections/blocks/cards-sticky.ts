import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { cardStickySelection } from "./card-sticky"

export const cardsStickySelection = {
  _key: q.string(),
  heading: nullToUndefined(q.string().optional()),
  body: nullToUndefined(q.string().optional()),
  items: q("items")
    .filter()
    .grab({ ...cardStickySelection }),
} satisfies Selection
