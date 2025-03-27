import { InsertBelowIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

export const notFoundStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Page 404')
    .id('notfound')
    .icon(InsertBelowIcon)
    .child(
      S.document()
        .schemaType('notfound')
        .documentId('notfound')
        .title('Not Found'),
    );
