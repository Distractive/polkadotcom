import { q } from "groqd"
import type { Selection } from "groqd"

export const modalSelection = {
  _key: q.string(),
  heading: q.string(),
  description: q.string(),
  button: q.string(),
  formHeading: q.string(),
} satisfies Selection
