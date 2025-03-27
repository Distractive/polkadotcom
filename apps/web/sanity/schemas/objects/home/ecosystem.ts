import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeEcosystem',
  title: 'Ecosystem',
  type: 'object',
  description: 'Content for the ecosystem section',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'customUrl',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'ecosystemCard',
        }),
      ],
    }),
  ],
});
