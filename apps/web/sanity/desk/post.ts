import { DocumentsIcon, TagsIcon, UsersIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';

export const postStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Post Management')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Post Management')
        .items([
          S.listItem()
            .title('Tags')
            .icon(TagsIcon)
            .child(S.documentTypeList('tag').title('Tags')),
          S.listItem()
            .title('Authors')
            .icon(UsersIcon)
            .child(S.documentTypeList('author').title('Authors')),
          S.listItem()
            .title('Blog Posts')
            .icon(DocumentsIcon)
            .child(
              S.documentTypeList('post')
                .title('Blog Posts')
                .filter('_type == "post" && post_type == $postType')
                .params({ postType: BLOG_POSTTYPE }),
            ),
          S.listItem()
            .title('Press Releases')
            .icon(DocumentsIcon)
            .child(
              S.documentTypeList('post')
                .title('Press Releases')
                .filter('_type == "post" && post_type == $postType')
                .params({ postType: PRESS_RELEASE_POSTTYPE }),
            ),
          S.listItem()
            .title('Case Studies')
            .icon(DocumentsIcon)
            .child(
              S.documentTypeList('post')
                .title('Case Studies')
                .filter('_type == "post" && post_type == $postType')
                .params({ postType: CASE_STUDY_POSTTYPE }),
            ),
        ]),
    );
