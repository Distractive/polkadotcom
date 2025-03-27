import { slugifier } from '@/sanity/lib/slugifier';
import { BookIcon, CogIcon, DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'glossaryEntry',
  title: 'Glossary Entry',
  type: 'document',
  icon: BookIcon,
  groups: [
    { title: 'Config', name: 'config', icon: CogIcon },
    { title: 'Content', name: 'content', icon: DocumentIcon },
    { title: 'Meta', name: 'meta', icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: 'createFullPageEntry',
      title: 'Create a full page entry for this term?',
      description:
        'Note that toggling this option off will not delete the meta, slug, or full entry fields, it simply hides them in the CMS.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The title of the page',
      group: 'config',
      hidden: ({ document }) => !document?.createFullPageEntry,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        //@ts-ignore
        source: (doc) => ({ doc }),
        //@ts-ignore
        slugify: slugifier,
      },
      group: 'config',
      hidden: ({ document }) => !document?.createFullPageEntry,
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
      group: 'meta',
      hidden: ({ document }) => !document?.createFullPageEntry,
    }),
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'shortEntry',
      title: 'Short Entry',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      description: 'The shortened entry used on /glossary',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullEntry',
      title: 'Full Entry',
      type: 'array',
      description:
        'The full glossary entry to be displayed on the individual entry page',
      hidden: ({ document }) => !document?.createFullPageEntry,
      of: [
        defineArrayMember({
          type: 'block',
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
          name: 'code',
          title: 'Code Block',
          type: 'code',
        }),
      ],
      group: 'content',
    }),
  ],
  orderings: [
    {
      title: 'Term, A-Z',
      name: 'termAsc',
      by: [{ field: 'term', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'term',
      subtitle: 'title',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle,
    }),
  },
});
