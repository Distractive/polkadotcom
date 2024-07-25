import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { blogSelection } from "../selections/blog/blog"

export async function getBlog() {
  const query = q("").grab({ ...blogSelection })
  return await runQuery(query, {}, false)
}
