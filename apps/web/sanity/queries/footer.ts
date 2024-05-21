import { runQuery } from "@/sanity/lib/groqd-query"
import { q } from "groqd"

import { footerMenuSelection } from "../selections/footer-menu"
import { socialLinkSelection } from "../selections/social-links"

export async function getFooterMenu() {
  const query = q("*")
    .filterByType("footer")
    .grab$({
      menu: q("menu")
        .filter()
        .grab({
          ...footerMenuSelection,
        }),
      socialLinks: q("socialLinks")
        .filter()
        .grab({
          ...socialLinkSelection,
        }),
    })
    .slice(0)

  return runQuery(query, {})
}
