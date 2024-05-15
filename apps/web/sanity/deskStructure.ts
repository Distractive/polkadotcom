import { DocumentsIcon, TagsIcon, UsersIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

const postStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Post Managment")
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title("Post Management")
        .items([
          S.listItem()
            .title("Tags")
            .icon(TagsIcon)
            .child(S.documentTypeList("tag").title("Tags")),
          S.listItem()
            .title("Authors")
            .icon(UsersIcon)
            .child(S.documentTypeList("author").title("Authors")),
          S.listItem()
            .title("Posts")
            .icon(DocumentsIcon)
            .child(S.documentTypeList("post").title("Posts")),
        ])
    )
const pageStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Pages")
    .icon(DocumentsIcon)
    .schemaType("page")
    .child(S.documentTypeList("page"))

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([postStructure(S), pageStructure(S)])
