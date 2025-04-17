import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardsTimeline',
  title: 'Cards Timeline',
  type: 'object',
  description: 'Create a timeline ',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Smallprint', value: 'smallprint' },
          ],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
          },
        },
        {
          type: 'break',
          initialValue: { style: 'lineBreak' },
        },
      ],
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'cardTimeline',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Timeline block',
    }),
  },
});
