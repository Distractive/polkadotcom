import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { cardLogoSelection } from "./card-logo"

export const cardsLogoSelection = {
  _key: q.string(),
  heading: nullToUndefined(q.string().optional()),
  body: nullToUndefined(q.string().optional()),
  items: q("items")
    .filter()
    .grab({ ...cardLogoSelection }),
} satisfies Selection
