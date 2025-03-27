import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
    }),
    defineField({
      title: 'Has title on side?',
      name: 'hasTitleOnSide',
      type: 'boolean',
      initialValue: false,
      description:
        'Show the title on the side of the accordion, on desktop only',
    }),

    defineField({
      title: 'Has Numbers',
      name: 'hasNumbers',
      type: 'boolean',
      description: 'Show numbers in front of the accordion heading',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'accordion-item',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Accordion block',
    }),
  },
});
