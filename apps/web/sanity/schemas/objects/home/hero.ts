import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeHero',
  title: 'Hero',
  type: 'object',
  description: 'Content for the hero section',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'customUrl',
        }),
      ],
      validation: (rule) => rule.required().max(2),
    }),
  ],
});
