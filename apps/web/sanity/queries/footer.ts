import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { footerSelection } from "../selections/footer/footer"

export async function getFooter() {
  const footerQuery = q("*")
    .filterByType("footer")
    .grab$({
      ...footerSelection,
    })
    .slice(0)
    .nullable()

  try {
    const result = await runQuery(footerQuery, {}, false)
    return result
  } catch (error) {
    console.error("Error fetching footer:", error)
    return null
  }
}
