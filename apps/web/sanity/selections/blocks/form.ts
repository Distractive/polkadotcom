import { q } from "groqd"
import type { Selection } from "groqd"

export const formSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  formType: q.string().optional().nullable(),
} satisfies Selection
