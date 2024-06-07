import { InsertAboveIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const navigationStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Navigation")
    .id("navigation")
    .icon(InsertAboveIcon)
    .child(
      S.document()
        .schemaType("navigation")
        .documentId("navigation")
        .title("Navigation")
    )
