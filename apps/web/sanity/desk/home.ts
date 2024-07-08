import { HomeIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const homeStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Home")
    .id("home")
    .icon(HomeIcon)
    .child(S.document().schemaType("home").documentId("home").title("Home"))
