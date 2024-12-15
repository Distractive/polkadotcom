import { is } from "@react-three/fiber/dist/declarations/src/core/utils"
import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"
import { newsletterButtonSelection } from "./newsletter-button"

export const ctaSelection = {
  _key: q.string(),
  heading: q.string().nullable().optional(),
  useWhiteText: q.boolean().nullable().optional(),
  isCentered: q.boolean().nullable().optional(),
  twoThirdsText: q.boolean().nullable().optional(),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  altText: q.string().nullable().optional(),
  content: q("content")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
      '_type == "customUrl"': {
        _type: q.literal("customUrl"),
        ...customUrlSelection,
      },
      '_type == "newsletterButton"': {
        ...newsletterButtonSelection,
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    })
    .nullable(),
} satisfies Selection
