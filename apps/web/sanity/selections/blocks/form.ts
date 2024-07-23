import { q } from "groqd"
import type { Selection } from "groqd"

export const formSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
  formType: q.string(),
} satisfies Selection
