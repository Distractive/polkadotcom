import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { pageBuilderSelection } from "../selections/page-builder"

export async function getPage(slug: string) {
  const pageQuery = q("*")
    .filter("_type == 'landing' || _type == 'page'")
    .filter("slug.current == $slug")
    .grab({
      title: q.string(),
      slug: q.slug("slug"),
      ...pageBuilderSelection,
    })
    .slice(0)

  return runQuery(pageQuery, {
    slug: slug,
  })
}
