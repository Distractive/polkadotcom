import type { StructureBuilder } from "sanity/structure"

export const hygieneStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Hygiene")
    .child(S.documentTypeList("hygiene").title("Hygiene"))
