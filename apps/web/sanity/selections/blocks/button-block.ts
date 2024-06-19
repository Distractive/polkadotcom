import { q } from "groqd"
import type { Selection } from "groqd"
import { customUrlSelection } from "../custom-url"

export const buttonBlockSelection = {
  _key: q.string(),
  link: q("link")
  .grab$({
    ...customUrlSelection,
  })
  .nullable(),
} satisfies Selection
