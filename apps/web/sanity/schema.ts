import { type SchemaTypeDefinition } from "sanity"

import { author, hygiene, landing, page, post, tag } from "./schemas/documents"
import {
  accordion,
  accordionItem,
  blockContent,
  card,
  cardLogo,
  cards,
  cardsLogo,
  cardSmall,
  cardsSmall,
  cardsStat,
  cardStat,
  customUrl,
  faq,
  faqs,
  lineBreak,
  menu,
  menuItem,
  meta,
  pageBuilder,
  socialLink,
  youtube,
} from "./schemas/objects"
import { footer } from "./schemas/singletons"

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
  pageBuilder,
  blockContent,
  lineBreak,
  menu,
  menuItem,
  socialLink,
]

const singletons = [footer]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documentTypes, ...objectTypes, ...singletons],
}
