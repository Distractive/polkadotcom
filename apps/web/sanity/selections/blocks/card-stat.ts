import { q } from "groqd"
import type { Selection } from "groqd"
import { customUrlSelection } from "../custom-url"

export const cardStatSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
   link: q("link")
    .grab$({
      ...customUrlSelection,
    })
    .nullable(),
} satisfies Selection
