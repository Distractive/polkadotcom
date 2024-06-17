import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure"

import { footerStructure } from "./footer"
import { hygieneStructure } from "./hygiene"
import { parentChild } from "./landing"
import { navigationStructure } from "./navigation"
import { notFoundStructure } from "./notfound"
import { postStructure } from "./post"

export const deskStructure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Content")
    .items([
      postStructure(S),
      S.divider(),
      parentChild("landing", S, context.documentStore),
      S.divider(),
      hygieneStructure(S),
      S.divider(),
      navigationStructure(S),
      S.divider(),
      footerStructure(S),
      S.divider(),
      notFoundStructure(S),
    ])
