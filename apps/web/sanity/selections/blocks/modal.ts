import { q } from "groqd"
import type { Selection } from "groqd"

export const modalSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
  cta: q.string(),
  modalHeading: q.string(),
  formType: q.union([q.literal("newsletter"), q.literal("contact")]),
} satisfies Selection
