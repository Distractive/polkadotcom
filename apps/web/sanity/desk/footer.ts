import { InsertBelowIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

export const footerStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Footer')
    .id('footer')
    .icon(InsertBelowIcon)
    .child(
      S.document().schemaType('footer').documentId('footer').title('Footer'),
    );
