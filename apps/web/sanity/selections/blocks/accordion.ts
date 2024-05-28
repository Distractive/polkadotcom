import { q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const accordionSelection = {
  _key: q.string(),
  title: q.string(),
  body: q.string().nullable(),
  image: sanityImage("image", {
    withAsset: ["base"],
  }).nullable(),
  hasTitleOnSide: q.boolean(),
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
