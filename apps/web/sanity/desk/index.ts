// import { DocumentsIcon } from "@sanity/icons"
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure"

import { parentChild } from "./landing"
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
    ])
