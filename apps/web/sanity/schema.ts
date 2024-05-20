import { type SchemaTypeDefinition } from "sanity"

import { author, landing, page, post, tag } from "./schemas/documents"
import {
  accordion,
  accordionContent,
  accordionItem,
  card,
  cards,
  // customUrl,
  faq,
  faqs,
  meta,
  pageBuilder,
  youtube,
} from "./schemas/objects"

// import { gettingStartedLanding, platformLanding } from "./schemas/singletons"

const documentTypes = [tag, author, post, landing, page]
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
]

// const singletons = []

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documentTypes, ...objectTypes],
}
