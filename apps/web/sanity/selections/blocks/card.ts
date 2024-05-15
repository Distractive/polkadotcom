import { q } from "groqd"
import type { Selection } from "groqd"

// import { customUrlSelection } from "../custom-url"

export const cardSelection = {
  _key: q.string(),
  heading: q.string(),
  copy: q.string(),
  // link: q("link").grab$({
  //   ...customUrlSelection,
  // }),
} satisfies Selection
