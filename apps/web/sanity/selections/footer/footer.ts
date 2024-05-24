import { q } from "groqd"
import type { Selection } from "groqd"

import { footerMenuSelection } from "./footer-menu"
import { socialLinkSelection } from "./social-links"

export const footerSelection = {
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
} satisfies Selection
