import { runQuery } from "@/sanity/lib/groqd-query"
import { q, sanityImage, type Selection } from "groqd"

import { headerSelection } from "../selections/blocks/header"
import { glossaryEntrySelection } from "../selections/glossary/glossary-entry"

export async function getGlossary() {
  const query = q("*")
    .filterByType("glossary")
    .grab$({
      header: q("header")
        .grab({ ...headerSelection })
        .nullable(),
      entries: q("*")
        .filterByType("glossaryEntry")
        .order("lower(term) asc")
        .grab({
          _id: q.string(),
          term: q.string(),
          shortEntry: q.array(q.contentBlock()),
          createFullPageEntry: q.boolean().nullable(),
          slug: q("slug").nullable(),
        }),
    })
    .slice(0)

  return await runQuery(query, {}, false)
}

export async function getGlossaryEntry(slug: string) {
  const query = q("*")
    .filterByType("glossaryEntry")
    .filter("slug.current == $slug")
    .grab$({
      ...glossaryEntrySelection,
    })
    .slice(0)
  return await runQuery(query, { slug }, false)
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
  const result = await runQuery(metaQuery, { slug }, false)
  return result
}

export async function getAllGlossarySlugs() {
  const slugQuery = q("*")
    .filterByType("glossaryEntry")
    .filter("createFullPageEntry == true")
    .grab({
      slug: q("slug.current"),
    })

  const results = await runQuery(slugQuery, {}, false)
  return results
    .map((result: { slug?: unknown }) => result.slug)
    .filter(Boolean)
}
