import { DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardStat',
  title: 'Card Statistic',
  type: 'object',
  groups: [
    { title: 'Heading', name: 'heading', icon: SearchIcon },
    { title: 'Content', name: 'content', icon: DocumentIcon },
  ],
  fields: [
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
          },
        },
        { type: 'customUrl' },
      ],
    }),
  ],
});
