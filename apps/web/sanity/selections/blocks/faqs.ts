import { q } from "groqd"
import type { Selection } from "groqd"

export const faqsSelection = {
  title: q.string(),
  items: q("items")
    .filter()
    .grab$({ _key: q.string(), question: q.string(), answer: q.string() }),
} satisfies Selection
