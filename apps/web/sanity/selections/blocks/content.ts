import { nullToUndefined, q } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const contentSelection = {
  _key: q.string(),
  content: q("content")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
      '_type == "customUrl"': {
        _type: q.literal("customUrl"),
        ...customUrlSelection,
      },
      '_type == "break"': {
        _key: q.string(),
        _type: q.literal("break"),
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    }),
  fullWidth: nullToUndefined(q.boolean().optional()),
} satisfies Selection
