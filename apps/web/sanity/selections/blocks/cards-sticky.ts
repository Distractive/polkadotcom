import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { cardStickySelection } from "./card-sticky"

export const cardsStickySelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  items: q("items")
    .filter()
    .grab({ ...cardStickySelection })
    .nullable(),
} satisfies Selection
