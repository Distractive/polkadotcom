import { type SchemaTypeDefinition } from "sanity"

import { author, page, post, tag } from "./schemas/documents"
import {
  accordion,
  accordionContent,
  accordionItem,
  card,
  cards,
  customUrl,
  faq,
  faqs,
  meta,
  youtube,
} from "./schemas/objects"

const documentTypes = [page, tag, author, post]
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
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documentTypes, ...objectTypes],
}
