import { type SchemaTypeDefinition } from "sanity"

import { author, post, tag } from "./schemas/documents/posts"
import { meta, youtube } from "./schemas/objects"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tag, author, post, youtube, meta],
}
