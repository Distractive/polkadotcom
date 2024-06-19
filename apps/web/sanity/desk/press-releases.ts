import { InsertBelowIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const pressReleasesStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Press Releases")
    .id("press-releases")
    .icon(InsertBelowIcon)
    .child(
      S.document()
        .schemaType("press-releases")
        .documentId("press-releases")
        .title("Press Releases")
    )
