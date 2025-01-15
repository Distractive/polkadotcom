import { runQuery } from "@/sanity/lib/groqd-query"
import { q, sanityImage } from "groqd"

import { headerSelection } from "../selections/blocks/header"
import { pageBuilderSelection } from "../selections/page-builder"

export async function getSingletonMeta(
  type: "home" | "blog" | "press-releases" | "case-studies" | "glossary"
) {
  const metaQuery = q("*")
    .filter(`_type == '${type}'`)
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

  try {
    const result = await runQuery(metaQuery, {}, false)
    return result
  } catch (error) {
    console.error("Error fetching meta:", error)
    return null
  }
}

export async function getPageMeta(slug: string) {
  const metaQuery = q("*")
    .filter("_type == 'landing' || _type == 'page' || _type == 'hygiene'")
    .filter("slug.current == $slug")
    .grab({
      header: q("header")
        .grab({
          title: q.string().nullable(),
          body: q.string().nullable(),
        })
        .nullable(),
      slug: q.slug("slug"),
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

  try {
    const result = await runQuery(metaQuery, { slug }, false)
    return result
  } catch (error) {
    console.error("Error fetching page meta:", error)
    return null
  }
}

export async function getPage(slug: string, isDraftMode: boolean) {
  const pageQuery = q("*")
    .filter("_type == 'landing' || _type == 'page' || _type == 'hygiene'")
    .filter("slug.current == $slug")
    .grab({
      title: q.string().nullable(),
      header: q("header")
        .grab({ ...headerSelection })
        .nullable(),
      breadcrumb: q.string().nullable().optional(),
      slug: q.slug("slug"),
      parent: q("parent")
        .deref()
        .grab({
          title: q.string(),
          slug: q.slug("slug"),
          breadcrumb: q.string().nullable().optional(),
        })
        .nullable(),
      ...pageBuilderSelection,
    })
    .slice(0)
    .nullable()

  try {
    const result = await runQuery(pageQuery, { slug }, isDraftMode)
    return result
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
}

export async function getSlugs(type: "landing" | "page" | "hygiene") {
  const slugQuery = q("*")
    .filter(`_type == '${type}'`)
    .grab({
      slug: q.slug("slug"),
      parent: q("parent")
        .deref()
        .grab({
          slug: q.slug("slug"),
        })
        .nullable(),
    })

  try {
    const result = await runQuery(slugQuery, {}, false)
    return result
  } catch (error) {
    console.error("Error fetching slugs:", error)
    return null
  }
}
