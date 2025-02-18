import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardsSmall',
  title: 'Cards Small',
  type: 'object',
  description: 'Create a list of small cards',
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
          type: 'cardSmall',
        }),
      ],
      group: 'contents',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description:
        'An image that sits behind the cards, anchored to the top and right hand side of the list. Appears on desktop only.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Small Cards block',
    }),
  },
});
