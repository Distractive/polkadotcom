import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardsLogo',
  title: 'Cards Logo',
  type: 'object',
  description: 'Create a list of cards containing logos',
  groups: [
    { title: 'Heading', name: 'heading' },
    { title: 'Content', name: 'content' },
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
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'heading',
    }),

    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'cardLogo',
        }),
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '-Logo Cards block',
    }),
  },
});
