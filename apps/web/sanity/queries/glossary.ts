import { runQuery } from "@/sanity/lib/groqd-query"
import { nullToUndefined, q, sanityImage, type Selection } from "groqd"

import { headerSelection } from "../selections/blocks/header"
import { glossaryEntrySelection } from "../selections/glossary/glossary-entry"
import { metaSelection } from "./post"

export async function getGlossary() {
  const query = q("*")
    .filterByType("glossary")
    .grab$({
      header: q("header")
        .grab({ ...headerSelection })
        .nullable(),
      entries: q("*")
        .filterByType("glossaryEntry")
        .order("term asc")
        .grab({
          _id: q.string(),
          term: q.string(),
          shortEntry: q.array(q.contentBlock()),
          createFullPageEntry: q.boolean().nullable(),
          slug: q("slug").nullable(),
        }),
    })
    .slice(0)

  return await runQuery(query, {}, true)
}

export async function getGlossaryEntry(slug: string) {
  const query = q("*")
    .filterByType("glossaryEntry")
    .filter("slug.current == $slug")
    .grab$({
      ...glossaryEntrySelection,
    })
    .slice(0)
  return await runQuery(query, { slug }, true)
}

export async function getGlossaryEntryMeta(slug: string) {
  const metaQuery = q("*")
    .filterByType("glossaryEntry")
    .filter("slug.current == $slug")
    .grab({
      meta: q("meta")
        .grab({
          meta_title: q.string().nullable(),
          meta_description: q.string().nullable(),
          meta_image: sanityImage("meta_image", {
            withAsset: ["base"],
          }).nullable(),
        })
        .nullable(),
    })
    .slice(0)
    .nullable()
  const result = await runQuery(metaQuery, { slug }, true)
  return result
}
