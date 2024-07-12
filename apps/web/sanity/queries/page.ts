import { runQuery } from "@/sanity/lib/groqd-query"
import { q, sanityImage } from "groqd"

import { headerSelection } from "../selections/blocks/header"
import { pageBuilderSelection } from "../selections/page-builder"

export async function getHomeMeta() {
  const pageQuery = q("*")
    .filter("_type == 'home'")
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

  return runQuery(pageQuery)
}

export async function getPageMeta(slug: string) {
  const pageQuery = q("*")
    .filter("_type == 'landing' || _type == 'page' || _type == 'hygiene'")
    .filter("slug.current == $slug")
    .grab({
      header: q("header")
        .grab({
          title: q.string(),
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

  return runQuery(pageQuery, {
    slug: slug,
  })
}

export async function getPage(slug: string) {
  const pageQuery = q("*")
    .filter("_type == 'landing' || _type == 'page' || _type == 'hygiene'")
    .filter("slug.current == $slug")
    .grab({
      title: q.string(),
      header: q("header")
        .grab({ ...headerSelection })
        .nullable(),
      slug: q.slug("slug"),
      parent: q("parent")
        .deref()
        .grab({
          title: q.string(),
          slug: q.slug("slug"),
        })
        .nullable(),
      ...pageBuilderSelection,
    })
    .slice(0)
    .nullable()

  return await runQuery(pageQuery, { slug })
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
  return runQuery(slugQuery, {}, false)
}
