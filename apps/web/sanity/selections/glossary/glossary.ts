import type { Selection } from "groqd"
import { nullToUndefined, q, sanityImage } from "groqd"

import { headerSelection } from "../blocks/header"
import { singletonMetaSelection } from "../singleton-meta"

export const glossarySelection = {
  ...headerSelection,
  ...singletonMetaSelection,
} satisfies Selection
