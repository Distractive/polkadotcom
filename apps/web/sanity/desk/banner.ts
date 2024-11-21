import { BellIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const bannerStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Banner")
    .id("banner")
    .icon(BellIcon)
    .child(
      S.document().schemaType("banner").documentId("banner").title("Banner")
    )
