import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'notfound',
  title: 'Page 404',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'customUrl',
        }),
      ],
    }),
  ],
});
