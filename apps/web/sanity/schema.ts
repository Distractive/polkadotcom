import { type SchemaTypeDefinition } from "sanity"

import { author, hygiene, landing, page, post, tag } from "./schemas/documents"
import {
  accordion,
  accordionContent,
  accordionItem,
  blockContent,
  card,
  cards,
  customUrl,
  faq,
  faqs,
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
  accordionContent,
  card,
  cards,
  customUrl,
  pageBuilder,
  blockContent,
  menu,
  menuItem,
  socialLink,
]

const singletons = [footer]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documentTypes, ...objectTypes, ...singletons],
}
