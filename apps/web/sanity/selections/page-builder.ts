import { q } from "groqd"
import type { Selection } from "groqd"

import { faqsSelection } from "../selections/blocks/faqs"
import { accordionSelection } from "./blocks/accordion"
import { cardsSelection } from "./blocks/cards"
import { contentSelection } from "./blocks/content"

export const pageBuilderSelection = {
  pageBuilder: q("pageBuilder.pageBuilder")
    .filter()
    .select({
      '_type == "faqs"': {
        _type: q.literal("faqs"),
        ...faqsSelection,
      },
      '_type == "accordion"': {
        _type: q.literal("accordion"),
        ...accordionSelection,
      },
      '_type == "cards"': {
        _type: q.literal("cards"),
        ...cardsSelection,
      },
      '_type == "blockContent"': {
        _type: q.literal("blockContent"),
        ...contentSelection,
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    }),
} satisfies Selection
