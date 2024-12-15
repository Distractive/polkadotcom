import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { blogSelection } from "../selections/blog/blog"

export async function getBlog() {
  const query = q("")
    .grab({ ...blogSelection })
    .nullable()

  try {
    const result = await runQuery(query, {}, false)
    return result
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}
