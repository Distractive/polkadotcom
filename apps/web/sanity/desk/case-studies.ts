import { InsertBelowIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const caseStudiesStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Case Studies")
    .id("case-studies")
    .icon(InsertBelowIcon)
    .child(
      S.document()
        .schemaType("case-studies")
        .documentId("case-studies")
        .title("Case Studies")
    )
}
