import { q } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const footerMenuSelection = {
  heading: q.string(),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
  items: q("items")
    .filter()
    .grab({
      link: q("link").grab$({
        ...customUrlSelection,
      }),
    }),
} satisfies Selection
