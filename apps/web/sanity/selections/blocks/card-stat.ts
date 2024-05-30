import { q } from "groqd"
import type { Selection } from "groqd"

export const cardStatSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
} satisfies Selection
