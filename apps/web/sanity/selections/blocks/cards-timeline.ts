import { q } from "groqd"
import type { Selection } from "groqd"

import { cardTimelineSelection } from "./card-timeline"

export const cardsTimelineSelection = {
  _key: q.string(),
  heading: q.string(),
  items: q("items")
    .filter()
    .grab({ ...cardTimelineSelection }),
} satisfies Selection
