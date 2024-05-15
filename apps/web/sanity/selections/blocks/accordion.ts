import { q } from "groqd"
import type { Selection } from "groqd"

export const accordionSelection = {
  title: q.string(),
  items: q("items")
    .filter()
    .grab({
      _key: q.string(),
      heading: q.string(),
      content: q("content").filter().grab({
        heading: q.string(),
        copy: q.string(),
      }),
    }),
} satisfies Selection
