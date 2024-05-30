import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { cardSmallSelection } from "./card-small"

export const cardsSmallSelection = {
  _key: q.string(),
  heading: nullToUndefined(q.string().optional()),
  body: nullToUndefined(q.string().optional()),
  isCarousel: nullToUndefined(q.boolean().optional()),
  hasTags: nullToUndefined(q.boolean().optional()),
  showSideBySide: nullToUndefined(q.boolean().optional()),
  useAsBackgroundImage: nullToUndefined(q.boolean().optional()),
  items: q("items")
    .filter()
    .grab({ ...cardSmallSelection }),
} satisfies Selection
