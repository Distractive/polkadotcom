import { q } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const faqsSelection = {
  title: q.string(),
  items: q("items")
    .filter()
    .grab$({
      _key: q.string(),
      question: q.string(),
      answer: q("answer")
        .filter()
        .select({
          '_type == "block"': ["{...}", q.contentBlock()],
          '_type == "customUrl"': {
            _type: q.literal("customUrl"),
            ...customUrlSelection,
          },
          default: {
            _key: q.string(),
            _type: ['"unsupported"', q.literal("unsupported")],
            unsupportedType: ["_type", q.string()],
          },
        }),
    }),
} satisfies Selection
