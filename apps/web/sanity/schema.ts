import { type SchemaTypeDefinition } from "sanity"

import { author, hygiene, landing, page, post, tag } from "./schemas/documents"
import {
  accordion,
  accordionContent,
  accordionItem,
  blockContent,
  card,
  cards,
  // customUrl,
  faq,
  faqs,
  meta,
  pageBuilder,
  youtube,
} from "./schemas/objects"

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
  // customUrl,
  pageBuilder,
  blockContent,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documentTypes, ...objectTypes],
}
