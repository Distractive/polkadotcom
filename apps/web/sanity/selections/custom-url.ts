import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

export const customUrlSelection = {
  label: q.string().optional().nullable(),
  variant: q.string().optional().nullable(),
  internal: q("internal")
    .deref()
    .grab$({
      _type: q.string().nullable().optional(),
      post_type: q.string().nullable().optional(),
      slug: q.slug("slug"),
    })
    .nullable(),
  external: q.string().optional().nullable(),
} satisfies Selection
