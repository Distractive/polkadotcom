import { q } from "groqd"
import type { Selection } from "groqd"

// type FormType = "newsletter" | "contact"

// const formType = q
//   .string()
//   .refine(
//     (value): value is FormType => value === "newsletter" || value === "contact",
//     {
//       message: 'formType must be either "newsletter" or "contact"',
//     }
//   )

export const modalSelection = {
  _key: q.string(),
  heading: q.string(),
  body: q.string(),
  cta: q.string(),
  modalHeading: q.string(),
  formType: q.string(),
} satisfies Selection
