import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"
import { videoSelection } from "./video"


import { customUrlSelection } from "../custom-url"

export const sideBySideSelection = {
  _key: q.string(),
  heading: q.string(),
  subheading: nullToUndefined(q.string().optional()),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  video: q("video")
    .grab$({
      ...videoSelection,
    })
    .nullable(),
  altText: q.string().nullable().optional(),
  isImageOnLeft: q.boolean(),
  content: q("content")
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
} satisfies Selection
