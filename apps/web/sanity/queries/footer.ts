import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { footerSelection } from "../selections/footer/footer"

export async function getFooter() {
  const query = q("*")
    .filterByType("footer")
    .grab$({
      ...footerSelection,
    })
    .slice(0)

  return runQuery(query, {})
}
