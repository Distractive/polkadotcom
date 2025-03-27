import { CogIcon, DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';

export default defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentIcon,
  type: 'document',
  groups: [
    { title: 'Config', name: 'config', icon: CogIcon },
    { title: 'Content', name: 'content', icon: DocumentIcon },
    { title: 'Meta', name: 'meta', icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: 'meta',
      type: 'meta',
      group: 'meta',
    }),
    defineField({
      name: 'post_type',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [BLOG_POSTTYPE, PRESS_RELEASE_POSTTYPE, CASE_STUDY_POSTTYPE],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'config',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
      group: 'config',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'config',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'config',
    }),
    defineField({
      name: 'published_date',
      title: 'Published Date',
      description:
        'The date this post was published, does not rely on system fields',
      type: 'datetime',
      group: 'config',
    }),
    defineField({
      name: 'featured_image',
      title: 'Featured Image',
      description: 'Only for blog posts',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'custom_excerpt',
      title: 'Excerpt',
      description: 'A custom excerpt for the post, to show on list page',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title:
                      "URL. (Use relative links for internal linking, eg '/about' instead of 'https://polkadot.com/about' so internal links don't open in a new tab.)",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                  {
                    title: 'Nofollow?',
                    name: 'noFollow',
                    type: 'boolean',
                    initialValue: false,
                  },
                  {
                    title: 'Canonical?',
                    name: 'canonical',
                    type: 'boolean',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        }),

        defineArrayMember({
          type: 'image',
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alt',
              description: 'The alt text of the image',
            },
            {
              type: 'text',
              name: 'caption',
              title: 'Caption',
              description: 'If the image needs a caption like a credit etc',
            },
          ],
        }),
        defineArrayMember({
          type: 'youtube',
        }),
        defineArrayMember({
          type: 'code',
          name: 'code',
          title: 'Code Block',
        }),
        defineArrayMember({
          type: 'custom_quote',
          name: 'custom_quote',
          title: 'Custom Quote',
        }),
        defineArrayMember({
          type: 'summary',
          name: 'summary',
          title: 'Summary',
        }),
      ],
      group: 'content',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{ field: 'published_date', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedDateAsc',
      by: [{ field: 'published_date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      postType: 'post_type',
      media: 'featured_image',
    },
    prepare: ({ title, postType, media }) => {
      let subtitle: string | undefined;

      switch (postType) {
        case BLOG_POSTTYPE:
          subtitle = '- Blog';
          break;
        case PRESS_RELEASE_POSTTYPE:
          subtitle = '- Press Release';
          break;
        case CASE_STUDY_POSTTYPE:
          subtitle = '- Case Study';
          break;
      }
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
