import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

export const customUrlSelection = {
  label: q.string().optional().nullable(),
  variant: q.string().optional().nullable(),
  internal: q("internal")
    .deref()
    .grab$({ slug: q.slug("slug") })
    .nullable(),
  external: nullToUndefined(q.string().optional().nullable()),
} satisfies Selection
