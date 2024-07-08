import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const statsSelection = {
  stats: q("stats").grab({
    title: q.string(),
    items: q("items")
      .filter()
      .grab({
        _key: q.string(),
        heading: q.string(),
        body: nullToUndefined(q.string().optional()),
        link: q("link")
          .grab$({
            ...customUrlSelection,
          })
          .nullable(),
      }),
  }),
} satisfies Selection
