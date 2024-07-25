import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { homeSelection } from "../selections/home/root"

export async function getHome(isDraftMode: boolean) {
  const query = q("").grab({ ...homeSelection })
  return await runQuery(query, {}, isDraftMode)
}
