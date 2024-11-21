import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { bannerSelection } from "../selections/banner"

export async function getBanner() {
  const query = q('*[_type == "banner"][0]').grab({ ...bannerSelection })
  return await runQuery(query, {}, false)
}
