import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardsSticky',
  title: 'Cards Sticky',
  type: 'object',
  description:
    'Create a list of cards that stack up on scroll, sticking to the top of the viewport.',
  groups: [
    { title: 'Config', name: 'config' },
    { title: 'Heading', name: 'heading' },
    { title: 'Content', name: 'contents' },
  ],
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      group: 'heading',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      rows: 3,
      group: 'heading',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'cardSticky',
        }),
      ],
      group: 'contents',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Sticky cards block',
    }),
  },
});
