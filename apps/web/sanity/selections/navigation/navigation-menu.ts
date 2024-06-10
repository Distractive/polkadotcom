import { q } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"
import { navigationAsideSelection } from "./navigation-aside"

export const navigationMenuSelection = {
  heading: q.string(),
  link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
  aside: q("aside")
    .grab({
      ...navigationAsideSelection,
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
