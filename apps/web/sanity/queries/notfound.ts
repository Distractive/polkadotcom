import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { notfoundSelection } from "../selections/notfound/notfound"

export async function getPageNotFound() {
  const query = q("*")
    .filterByType("notfound")
    .grab$({
      ...notfoundSelection,
    })
    .slice(0)
  return await runQuery(query, {}, false)
}
