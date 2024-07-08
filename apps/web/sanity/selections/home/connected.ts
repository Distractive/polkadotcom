import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { customUrlSelection } from "../custom-url"

export const connectedSelection = {
  connected: q("connected").grab({
    title: q.string(),
    body: q.string(),
    items: q("items")
      .filter()
      .grab({
        _key: q.string(),
        headerImage: sanityImage("headerImage", {
          withAsset: ["base"],
        }).nullable(),
        eyebrow: nullToUndefined(q.string().optional()),
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
