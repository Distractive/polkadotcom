import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { homeSelection } from "../selections/home/root"

export async function getHome() {
  const query = q("").grab({ ...homeSelection })
  return runQuery(query, {})
}
