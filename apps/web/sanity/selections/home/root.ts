import { q } from "groqd"
import type { Selection } from "groqd"

import { buildSelection } from "./build"
import { connectedSelection } from "./connected"
import { ecosystemSelection } from "./ecosystem"
import { heroSelection } from "./hero"
import { innovationSelection } from "./innovation"
import { networkSelection } from "./network"
import { statsSelection } from "./stats"
import { videoSelection } from "./video"

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
    })
    .slice(0),
} satisfies Selection
