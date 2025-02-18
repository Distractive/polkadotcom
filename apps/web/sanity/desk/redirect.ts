import { ArrowRightIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

export const redirectStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Redirects')
    .icon(ArrowRightIcon)
    .child(S.documentTypeList('redirects').title('Redirects'));
