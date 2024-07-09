import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const ecosystemSelection = {
  ecosystem: q("ecosystem").grab({
    title: q.string(),
    body: q.string().optional().nullable(),
    link: q("link")
      .grab$({
        ...customUrlSelection,
      })
      .nullable(),
    items: q("items")
      .filter()
      .grab({
        _key: q.string(),
        image: sanityImage("image", {
          withAsset: ["base", "dimensions"],
        }),
        heading: q.string(),
        body: nullToUndefined(q.string().optional()),
        link: q("link")
          .grab$({
            ...customUrlSelection,
          })
          .nullable(),
      }),
  }),
} satisfies Selection
