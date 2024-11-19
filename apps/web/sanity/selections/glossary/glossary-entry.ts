import { metaSelection } from "@/sanity/queries/post"
import type { Selection } from "groqd"
import { q } from "groqd"

import { singletonMetaSelection } from "../singleton-meta"

export const glossaryEntrySelection = {
  _id: q.string(),
  title: q.string(),
  slug: q("slug").nullable(),
  term: q.string(),
  shortEntry: q.array(q.contentBlock()),
  createFullPageEntry: q.boolean().nullable(),
  fullEntry: q.array(q.contentBlock()).optional(),
} satisfies Selection
