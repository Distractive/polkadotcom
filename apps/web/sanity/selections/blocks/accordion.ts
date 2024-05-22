import { q } from "groqd"
import type { Selection } from "groqd"

export const accordionSelection = {
  title: q.string(),
  hasNumbers: q.boolean(),
  items: q("items")
    .filter()
    .grab({
      _key: q.string(),
      heading: q.string(),
      content: q("content")
        .filter()
        .select({
          '_type == "block"': ["{...}", q.contentBlock()],
          '_type == "break"': {
            _type: q.literal("break"),
            style: q.string(),
          },
          default: {
            _key: q.string(),
            _type: ['"unsupported"', q.literal("unsupported")],
            unsupportedType: ["_type", q.string()],
          },
        }),
    }),
} satisfies Selection
