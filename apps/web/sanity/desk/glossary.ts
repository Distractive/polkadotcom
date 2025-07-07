import { BookIcon, DocumentIcon, EyeOpenIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

// Add PreviewAction for glossary entries
const PreviewAction = (S: StructureBuilder) =>
  S.view
    .component((props) => {
      const slug = props?.document?.displayed?.slug?.current;

      if (!slug) {
        console.error('No slug found for document:', props.documentId);
      }

      if (typeof window !== 'undefined') {
        const currentDomain = window.location.origin;
        const previewUrl = `${currentDomain}/admin/presentation?preview=/glossary/${slug}`;
        window.location.href = previewUrl;
      }

      return null;
    })
    .title('Preview')
    .icon(EyeOpenIcon);

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
                .defaultOrdering([{ field: 'term', direction: 'asc' }])
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType(entryType)
                    .views([S.view.form(), PreviewAction(S)]),
                ),
            ),
        ]),
    );
};
