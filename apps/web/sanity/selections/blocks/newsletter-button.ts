import { q } from "groqd"
import type { Selection } from "groqd"

export const newsletterButtonSelection = {
  _key: q.string(),
  _type: q.literal("newsletterButton"),
  label: q.string(),
  modalHeading: q.string(),
  formType: q.string(),
  variant: q.string().nullable(),
} satisfies Selection
