import { DocumentsIcon, EyeOpenIcon, TagsIcon, UsersIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';

const PreviewAction = (S: StructureBuilder, postType: string) =>
  S.view
    .component((props) => {
      const slug = props?.document?.displayed?.slug?.current;

      let parentSlug = '';
      if (postType === BLOG_POSTTYPE) {
        parentSlug = 'blog';
      }
      if (postType === CASE_STUDY_POSTTYPE) {
        parentSlug = 'case-studies';
      }
      if (postType === PRESS_RELEASE_POSTTYPE) {
        parentSlug = 'newsroom/press-releases';
      }

      if (!slug) {
        console.error('No slug found for document:', props.documentId);
      }

      if (typeof window !== 'undefined') {
        const currentDomain = window.location.origin;
        const previewUrl = `${currentDomain}/admin/presentation?preview=/${parentSlug}/${slug}`;
        window.location.href = previewUrl;
      }

      return null;
    })
    .title('Preview')
    .icon(EyeOpenIcon);

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
                .params({ postType: BLOG_POSTTYPE })
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('post')
                    .views([S.view.form(), PreviewAction(S, BLOG_POSTTYPE)]),
                ),
            ),
          S.listItem()
            .title('Press Releases')
            .icon(DocumentsIcon)
            .child(
              S.documentTypeList('post')
                .title('Press Releases')
                .filter('_type == "post" && post_type == $postType')
                .params({ postType: PRESS_RELEASE_POSTTYPE })
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('post')
                    .views([
                      S.view.form(),
                      PreviewAction(S, PRESS_RELEASE_POSTTYPE),
                    ]),
                ),
            ),
          S.listItem()
            .title('Case Studies')
            .icon(DocumentsIcon)
            .child(
              S.documentTypeList('post')
                .title('Case Studies')
                .filter('_type == "post" && post_type == $postType')
                .params({ postType: CASE_STUDY_POSTTYPE })
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('post')
                    .views([
                      S.view.form(),
                      PreviewAction(S, CASE_STUDY_POSTTYPE),
                    ]),
                ),
            ),
        ]),
    );
