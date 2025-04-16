import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardsStat',
  title: 'Cards Statistic',
  type: 'object',
  description: 'Create a list of statistic cards',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'break',
          initialValue: { style: 'lineBreak' },
        },
        {
          type: 'customUrl',
        },
      ],
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'cardStat',
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
      subtitle: '- Stats Cards block',
    }),
  },
});
