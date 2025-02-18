import { HomeIcon, SearchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'glossary',
  title: 'Glossary',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { title: 'Content', name: 'content', icon: HomeIcon },
    { title: 'Meta', name: 'meta', icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
      validation: (rule) => rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
      group: 'meta',
    }),
  ],
});
