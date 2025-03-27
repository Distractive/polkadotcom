import { InsertBelowIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

export const blogStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Blog')
    .id('blog')
    .icon(InsertBelowIcon)
    .child(S.document().schemaType('blog').documentId('blog').title('Blog'));
