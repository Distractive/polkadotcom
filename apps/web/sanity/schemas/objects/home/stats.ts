import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeStats',
  title: 'Stats',
  type: 'object',
  description: 'Content for the stats section',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'columnPadding',
      title: '2nd Column Padding',
      description: 'Padding for the 2nd column in rem on large screens.',
      type: 'number',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'cardStat',
        }),
      ],
    }),
  ],
});
