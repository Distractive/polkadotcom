import type { SanityDocument } from "@sanity/client"
import { map } from "rxjs/operators"
import type { DocumentStore } from "sanity"
import type { StructureBuilder } from "sanity/structure"

export function parentChild(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`
  const query = `*[${filter}]{ _id, header{title} }`
  const options = { apiVersion: `2023-01-01` }

  return (
    S.listItem()
      .title("Sections")
      // .icon(TagIcon)
      .child(() =>
        documentStore.listenQuery(query, {}, options).pipe(
          map((parents) =>
            S.list()
              .title("Sections")
              .menuItems([
                S.menuItem()
                  .title("Add")
                  // .icon(TagIcon)
                  .intent({ type: "create", params: { type: schemaType } }),
              ])
              .items([
                S.listItem()
                  .title("Landing Pages")
                  .schemaType(schemaType)
                  .child(() =>
                    S.documentList()
                      .schemaType(schemaType)
                      .title("Landing Pages")
                      .filter(filter)
                      .canHandleIntent(
                        (intentName: string, params) =>
                          intentName === "create" &&
                          params.template === "landing"
                      )
                      .child((id: string) =>
                        S.document().documentId(id).schemaType(schemaType)
                      )
                  ),
                S.divider(),
                ...parents.map((parent: SanityDocument) =>
                  S.listItem({
                    id: parent._id,
                    title: parent.header.title || "Untitled",
                    schemaType,
                    child: () =>
                      S.documentTypeList("page")
                        .title("Tier Two")
                        .filter(`_type == "page" && parent._ref == $parentId`)
                        .params({ schemaType, parentId: parent._id })
                        .canHandleIntent(
                          (intentName: string, params) =>
                            intentName === "create" &&
                            params.template === "landing-child"
                        )
                        .initialValueTemplates([
                          S.initialValueTemplateItem("landing-child", {
                            parentId: parent._id,
                          }),
                        ]),
                  })
                ),
              ])
          )
        )
      )
  )
}
