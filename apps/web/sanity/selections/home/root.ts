import { nullToUndefined, q, sanityImage } from "groqd"
import type { Selection } from "groqd"

import { buildSelection } from "./build"
import { connectedSelection } from "./connected"
import { ecosystemSelection } from "./ecosystem"
import { heroSelection } from "./hero"
import { innovationSelection } from "./innovation"
import { networkSelection } from "./network"
import { statsSelection } from "./stats"
import { videoSelection } from "./video"

const metaSelection = {
  meta: q("meta").grab({
    meta_title: nullToUndefined(q.string().optional()),
    meta_description: nullToUndefined(q.string().optional()),
    meta_image: sanityImage("image", {
      withAsset: ["base"],
    }).nullable(),
  }),
} satisfies Selection

export const homeSelection = {
  home: q("*")
    .filterByType("home")
    .grab$({
      ...heroSelection,
      ...innovationSelection,
      ...videoSelection,
      ...connectedSelection,
      ...ecosystemSelection,
      ...statsSelection,
      ...networkSelection,
      ...buildSelection,
      ...metaSelection,
    })
    .slice(0),
} satisfies Selection
