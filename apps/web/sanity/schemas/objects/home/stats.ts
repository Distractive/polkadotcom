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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'statsCard',
        }),
      ],
    }),
  ],
});
