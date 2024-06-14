import { type SchemaTypeDefinition } from "sanity"

import { author, hygiene, landing, page, post, tag } from "./schemas/documents"
import {
  accordion,
  accordionItem,
  aside,
  blockContent,
  card,
  cardLogo,
  cards,
  cardsLogo,
  cardSmall,
  cardsSmall,
  cardsStat,
  cardStat,
  cardsTimeline,
  cardTimeline,
  customUrl,
  faq,
  faqs,
  header,
  lineBreak,
  menu,
  menuItem,
  meta,
  pageBuilder,
  sideBySide,
  quote,
  socialLink,
  video,
  youtube,
} from "./schemas/objects"
import { footer, navigation } from "./schemas/singletons"

const documentTypes = [tag, author, post, landing, page, hygiene]
const objectTypes = [
  youtube,
  meta,
  faq,
  faqs,
  accordion,
  accordionItem,
  card,
  cards,
  cardSmall,
  cardsSmall,
  cardsLogo,
  cardLogo,
  cardsStat,
  cardStat,
  customUrl,
  header,
  pageBuilder,
  blockContent,
  lineBreak,
  menu,
  menuItem,
  sideBySide,
  socialLink,
  aside,
  video,
  cardTimeline,
  cardsTimeline,
  quote,
]

const singletons = [footer, navigation]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documentTypes, ...objectTypes, ...singletons],
}
