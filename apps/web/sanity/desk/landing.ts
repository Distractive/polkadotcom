import type { SanityDocument } from "@sanity/client"
import { EyeOpenIcon } from "@sanity/icons"
import { map } from "rxjs/operators"
import type { DocumentStore } from "sanity"
import type { StructureBuilder } from "sanity/structure"

const PreviewAction = (S: StructureBuilder) =>
  S.view
    .component(
      (props: {
        documentId: string
        document: { slug: { current: string } }
      }) => {
        const slug = props.document.slug?.current
        window.location.href = `https://polkadot-preview.vercel.app/admin/presentation?preview=/${slug}`
        return null
      }
    )
    .title("Preview")
    .icon(EyeOpenIcon)

export function parentChild(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "${schemaType}" && !defined(parent) && (
    !(_id in path("drafts.**")) ||
    !defined(*[_id == string::split(^._id, "drafts.")[1]][0])
  )`
  const query = `*[${filter}] | order(title asc){ _id, title, tierthree, slug }`
  const options = { apiVersion: `2023-01-01` }

  return S.listItem()
    .title("Sections")
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title("Sections")
            .menuItems([
              S.menuItem()
                .title("Add")
                .intent({ type: "create", params: { type: schemaType } }),
            ])
            .items([
              S.listItem()
                .title("Landing Pages")
                .schemaType(schemaType)
                .child(() => {
                  return S.list()
                    .title("Landing Pages")
                    .items(
                      parents.map((doc: any) =>
                        S.documentListItem()
                          .id(doc._id)
                          .title(
                            doc._id.startsWith("drafts.")
                              ? `${doc.title || "Untitled"} (Unpublished)`
                              : doc.title || "Untitled"
                          )
                          .schemaType(schemaType)
                          .child(
                            S.document()
                              .documentId(doc._id.replace("drafts.", ""))
                              .schemaType(schemaType)
                              .views([S.view.form(), PreviewAction(S)])
                          )
                      )
                    )
                    .canHandleIntent(
                      (intentName: string, params) =>
                        intentName === "create" && params.template === "landing"
                    )
                }),
              S.divider(),
              ...parents
                .filter((parent: SanityDocument) => parent.tierthree != true)
                .map((parent: SanityDocument) =>
                  S.listItem({
                    id: parent._id,
                    title: parent.title || "Untitled",
                    schemaType,
                    child: () =>
                      S.documentTypeList("page")
                        .title("Tier Two")
                        .filter(`_type == "page" && parent._ref == $parentId`)
                        .apiVersion("v2023-01-01")
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
}
