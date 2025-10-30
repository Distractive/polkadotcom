import { DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardSmall',
  title: 'Card small',
  type: 'object',
  groups: [
    { title: 'Heading', name: 'heading', icon: SearchIcon },
    { title: 'Content', name: 'content', icon: DocumentIcon },
  ],
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'darkModeIcon',
      title: 'Dark Mode Icon',
      description: 'Optional icon to display in dark mode. If not provided, the regular icon will be used.',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'customUrl',
      group: 'content',
    }),
  ],
});
