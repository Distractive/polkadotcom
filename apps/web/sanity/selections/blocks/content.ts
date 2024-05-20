import { q } from "groqd"
import type { Selection } from "groqd"

export const contentSelection = {
  content: q.contentBlocks(),
} satisfies Selection
