import { q } from "groqd"
import type { Selection } from "groqd"

export const modalSelection = {
  _key: q.string(),
  heading: q.string().optional().nullable(),
  body: q.string().optional().nullable(),
  cta: q.string().optional().nullable(),
  modalHeading: q.string().optional().nullable(),
  formType: q.string().optional().nullable(),
} satisfies Selection
