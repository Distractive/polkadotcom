import { BookIcon, DocumentIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

export const glossaryStructure = (S: StructureBuilder) => {
  const entryType = 'glossaryEntry';

  return S.listItem()
    .title('Glossary')
    .icon(BookIcon)
    .child(
      S.list()
        .title('Glossary')
        .items([
          // Glossary Page
          S.listItem()
            .title('Glossary Page')
            .icon(DocumentIcon)
            .child(S.document().schemaType('glossary').documentId('glossary')),

          // Terms List
          S.listItem()
            .title('Terms')
            .icon(BookIcon)
            .child(
              S.documentTypeList(entryType)
                .title('Terms')
                .filter(`_type == "${entryType}"`)
                .defaultOrdering([{ field: 'term', direction: 'asc' }]),
            ),
        ]),
    );
};
