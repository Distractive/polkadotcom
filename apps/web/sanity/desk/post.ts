import { DocumentsIcon, TagsIcon, UsersIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const postStructure = (S: StructureBuilder) =>
  S.listItem()
    .title("Post Management")
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
