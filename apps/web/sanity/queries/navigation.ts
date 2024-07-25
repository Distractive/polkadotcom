import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { navigationSelection } from "../selections/navigation/navigation"

export async function getNavigation() {
  const query = q("*")
    .filterByType("navigation")
    .grab$({
      ...navigationSelection,
    })
    .slice(0)
  return await runQuery(query, {}, false)
}
