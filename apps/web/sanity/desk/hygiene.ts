import type { StructureBuilder } from 'sanity/structure';

export const hygieneStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Legal')
    .child(S.documentTypeList('hygiene').title('Legal'));
