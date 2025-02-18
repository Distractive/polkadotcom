import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeBuild',
  title: 'Build',
  type: 'object',
  description: 'Content for the build section',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'smallCard',
        }),
      ],
    }),
  ],
});
